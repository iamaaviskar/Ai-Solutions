import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";
import pool from "../db/index.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

// Rate-limit login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many login attempts. Please try again later." },
});

// POST /api/admin/login
router.post(
  "/login",
  loginLimiter,
  [
    body("username").trim().notEmpty().withMessage("Username is required."),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const result = await pool.query(
        "SELECT * FROM admins WHERE username = $1 LIMIT 1",
        [username],
      );

      const admin = result.rows[0];
      if (!admin) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      const valid = await bcrypt.compare(password, admin.password_hash);
      if (!valid) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      const token = jwt.sign(
        { id: admin.id, username: admin.username },
        process.env.JWT_SECRET,
        { expiresIn: "2h" },
      );

      // Token stays in the httpOnly cookie only — never sent to client JS
      res.cookie("admin_token", token, COOKIE_OPTS);

      // Only return what the UI actually needs
      return res.json({ username: admin.username });
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ error: "Login failed. Please try again." });
    }
  },
);

// GET /api/admin/me — lets the client rehydrate auth state on page load
router.get("/me", requireAuth, (req, res) => {
  res.json({ username: req.admin.username });
});

// POST /api/admin/logout
router.post("/logout", (req, res) => {
  res.clearCookie("admin_token", COOKIE_OPTS);
  return res.json({ message: "Logged out successfully." });
});

// GET /api/admin/enquiries
router.get("/enquiries", requireAuth, async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || "1"));
  const limit = Math.min(100, parseInt(req.query.limit || "20"));
  const offset = (page - 1) * limit;
  const search = req.query.search || "";
  const status = req.query.status || "";

  try {
    const whereClauses = [];
    const params = [];
    let paramIdx = 1;

    if (search) {
      whereClauses.push(`(
        name ILIKE $${paramIdx} OR
        email ILIKE $${paramIdx} OR
        company_name ILIKE $${paramIdx}
      )`);
      params.push(`%${search}%`);
      paramIdx++;
    }

    if (status) {
      whereClauses.push(`status = $${paramIdx}`);
      params.push(status);
      paramIdx++;
    }

    const where = whereClauses.length
      ? `WHERE ${whereClauses.join(" AND ")}`
      : "";

    // Single query using window function. Avoids a separate COUNT round-trip
    const dataResult = await pool.query(
      `SELECT
         id, name, email, phone, company_name, country,
         job_title, job_details, status, created_at,
         COUNT(*) OVER() AS total_count
       FROM contacts
       ${where}
       ORDER BY created_at DESC
       LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`,
      [...params, limit, offset],
    );

    const total =
      dataResult.rows.length > 0 ? parseInt(dataResult.rows[0].total_count) : 0;

    // Strip total_count from the row objects before sending
    const enquiries = dataResult.rows.map(({ total_count, ...rest }) => rest);

    return res.json({
      enquiries,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("Enquiries fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch enquiries." });
  }
});

// GET /api/admin/stats
router.get("/stats", requireAuth, async (req, res) => {
  try {
    const [total, byStatus, byMonth] = await Promise.all([
      pool.query("SELECT COUNT(*) AS total FROM contacts"),
      pool.query(`
        SELECT status, COUNT(*) AS count
        FROM contacts
        GROUP BY status
      `),
      pool.query(`
        SELECT
          TO_CHAR(created_at, 'Mon YYYY') AS month,
          COUNT(*) AS count
        FROM contacts
        WHERE created_at >= NOW() - INTERVAL '6 months'
        GROUP BY TO_CHAR(created_at, 'Mon YYYY'), DATE_TRUNC('month', created_at)
        ORDER BY DATE_TRUNC('month', created_at)
      `),
    ]);

    return res.json({
      total: parseInt(total.rows[0].total),
      byStatus: byStatus.rows,
      byMonth: byMonth.rows,
    });
  } catch (err) {
    console.error("Stats error:", err);
    return res.status(500).json({ error: "Failed to fetch stats." });
  }
});

// PATCH /api/admin/enquiries/:id/status
router.patch("/enquiries/:id/status", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowed = ["new", "reviewed", "responded"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: "Invalid status value." });
  }

  try {
    const result = await pool.query(
      "UPDATE contacts SET status = $1 WHERE id = $2 RETURNING *",
      [status, id],
    );
    if (!result.rows.length) {
      return res.status(404).json({ error: "Enquiry not found." });
    }
    return res.json({ enquiry: result.rows[0] });
  } catch (err) {
    console.error("Status update error:", err);
    return res.status(500).json({ error: "Failed to update status." });
  }
});

// ─────────────────────────────────────────────────────────────
// Articles CRUD
// ─────────────────────────────────────────────────────────────

const articleValidators = [
  body("title").trim().notEmpty().withMessage("Title is required."),
  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required.")
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage("Slug must be lowercase letters, numbers and hyphens only."),
  body("category").trim().notEmpty().withMessage("Category is required."),
  body("status")
    .isIn(["draft", "published"])
    .withMessage("Status must be draft or published."),
  body("featured").optional().isBoolean(),
];

// GET /api/admin/articles
router.get("/articles", requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, slug, category, excerpt, author, author_role,
              read_time, featured, status, created_at, updated_at
       FROM articles
       ORDER BY created_at DESC`,
    );
    return res.json({ articles: result.rows });
  } catch (err) {
    console.error("Articles fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch articles." });
  }
});

// GET /api/admin/articles/:id
router.get("/articles/:id", requireAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT *
       FROM articles
       WHERE id = $1
       LIMIT 1`,
      [id],
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Article not found." });
    }

    return res.json({ article: result.rows[0] });
  } catch (err) {
    console.error("Article fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch article." });
  }
});

// POST /api/admin/articles
router.post("/articles", requireAuth, articleValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {
    title,
    slug,
    category,
    excerpt,
    author,
    author_role,
    read_time,
    featured,
    status,
    body: bodyHtml,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO articles
         (title, slug, category, excerpt, author, author_role, read_time, featured, status, body)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        title,
        slug,
        category,
        excerpt ?? "",
        author ?? "",
        author_role ?? "",
        read_time ?? "",
        featured ?? false,
        status,
        bodyHtml ?? "",
      ],
    );
    return res.status(201).json({ article: result.rows[0] });
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ error: "An article with that slug already exists." });
    }
    console.error("Article create error:", err);
    return res.status(500).json({ error: "Failed to create article." });
  }
});

// PUT /api/admin/articles/:id
router.put(
  "/articles/:id",
  requireAuth,
  articleValidators,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const {
      title,
      slug,
      category,
      excerpt,
      author,
      author_role,
      read_time,
      featured,
      status,
      body: bodyHtml,
    } = req.body;

    try {
      const result = await pool.query(
        `UPDATE articles SET
         title       = $1,
         slug        = $2,
         category    = $3,
         excerpt     = $4,
         author      = $5,
         author_role = $6,
         read_time   = $7,
         featured    = $8,
         status      = $9,
         body        = $10,
         updated_at  = NOW()
       WHERE id = $11
       RETURNING *`,
        [
          title,
          slug,
          category,
          excerpt ?? "",
          author ?? "",
          author_role ?? "",
          read_time ?? "",
          featured ?? false,
          status,
          bodyHtml ?? "",
          id,
        ],
      );
      if (!result.rows.length) {
        return res.status(404).json({ error: "Article not found." });
      }
      return res.json({ article: result.rows[0] });
    } catch (err) {
      if (err.code === "23505") {
        return res
          .status(409)
          .json({ error: "An article with that slug already exists." });
      }
      console.error("Article update error:", err);
      return res.status(500).json({ error: "Failed to update article." });
    }
  },
);

// DELETE /api/admin/articles/:id
router.delete("/articles/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM articles WHERE id = $1 RETURNING id",
      [id],
    );
    if (!result.rows.length) {
      return res.status(404).json({ error: "Article not found." });
    }
    return res.status(204).send();
  } catch (err) {
    console.error("Article delete error:", err);
    return res.status(500).json({ error: "Failed to delete article." });
  }
});

export default router;

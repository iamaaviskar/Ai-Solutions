import { Router } from "express";
import { body, validationResult } from "express-validator";
import pool from "../../db/index.js";
import { requireAuth } from "../../middleware/auth.js";

const router = Router();

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

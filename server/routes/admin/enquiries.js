import { Router } from "express";
import pool from "../../db/index.js";
import { requireAuth } from "../../middleware/auth.js";

const router = Router();

router.get("/enquiries", requireAuth, async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || "1"));
  const limit = Math.min(100, parseInt(req.query.limit || "20"));
  const offset = (page - 1) * limit;
  const search = req.query.search || "";
  const status = req.query.status || "";
  const archived = req.query.archived === "1" || req.query.archived === "true";

  try {
    const whereClauses = [
      archived ? "archived_at IS NOT NULL" : "archived_at IS NULL",
    ];
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

    const dataResult = await pool.query(
      `SELECT
         id, name, email, phone, company_name, country,
         job_title, job_details, status, admin_notes, archived_at,
         created_at, updated_at,
         COUNT(*) OVER() AS total_count
       FROM contacts
       ${where}
       ORDER BY created_at DESC
       LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`,
      [...params, limit, offset],
    );

    const total =
      dataResult.rows.length > 0 ? parseInt(dataResult.rows[0].total_count) : 0;
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

router.patch("/enquiries/:id/status", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowed = ["new", "reviewed", "responded"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: "Invalid status value." });
  }

  try {
    const result = await pool.query(
      "UPDATE contacts SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
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

router.patch("/enquiries/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const updates = [];
  const params = [];
  let paramIdx = 1;

  if (Object.prototype.hasOwnProperty.call(req.body, "admin_notes")) {
    if (typeof req.body.admin_notes !== "string") {
      return res.status(400).json({ error: "Admin notes must be text." });
    }

    if (req.body.admin_notes.length > 5000) {
      return res
        .status(400)
        .json({ error: "Admin notes must be 5000 characters or fewer." });
    }

    updates.push(`admin_notes = $${paramIdx}`);
    params.push(req.body.admin_notes.trim());
    paramIdx++;
  }

  if (Object.prototype.hasOwnProperty.call(req.body, "archived")) {
    if (typeof req.body.archived !== "boolean") {
      return res.status(400).json({ error: "Archived must be true or false." });
    }

    updates.push(
      `archived_at = ${req.body.archived ? "COALESCE(archived_at, NOW())" : "NULL"}`,
    );
  }

  if (!updates.length) {
    return res.status(400).json({ error: "No enquiry updates provided." });
  }

  try {
    const result = await pool.query(
      `UPDATE contacts
       SET ${updates.join(", ")}, updated_at = NOW()
       WHERE id = $${paramIdx}
       RETURNING *`,
      [...params, id],
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Enquiry not found." });
    }

    return res.json({ enquiry: result.rows[0] });
  } catch (err) {
    console.error("Enquiry update error:", err);
    return res.status(500).json({ error: "Failed to update enquiry." });
  }
});

router.delete("/enquiries/:id", requireAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM contacts WHERE id = $1 RETURNING id",
      [id],
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Enquiry not found." });
    }

    return res.status(204).send();
  } catch (err) {
    console.error("Enquiry delete error:", err);
    return res.status(500).json({ error: "Failed to delete enquiry." });
  }
});

export default router;

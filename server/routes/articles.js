import { Router } from "express";
import pool from "../db/index.js";

const router = Router();

// GET /api/articles - public, published only
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, slug, category, excerpt, author, author_role,
              read_time, featured, created_at
       FROM articles
       WHERE status = 'published'
       ORDER BY created_at DESC`,
    );
    return res.json({ articles: result.rows });
  } catch (err) {
    console.error("Public articles fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch articles." });
  }
});

// GET /api/articles/:slug - public, single published article
router.get("/:slug", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM articles WHERE slug = $1 AND status = 'published' LIMIT 1`,
      [req.params.slug],
    );
    if (!result.rows.length) {
      return res.status(404).json({ error: "Article not found." });
    }
    return res.json({ article: result.rows[0] });
  } catch (err) {
    console.error("Public article fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch article." });
  }
});

export default router;

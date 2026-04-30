import { Router } from "express";
import pool from "../../db/index.js";
import { requireAuth } from "../../middleware/auth.js";

const router = Router();

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

export default router;

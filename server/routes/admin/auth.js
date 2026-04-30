import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";
import pool from "../../db/index.js";
import { requireAuth } from "../../middleware/auth.js";

const router = Router();

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many login attempts. Please try again later." },
});

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

      res.cookie("admin_token", token, COOKIE_OPTS);
      return res.json({ username: admin.username });
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ error: "Login failed. Please try again." });
    }
  },
);

router.get("/me", requireAuth, (req, res) => {
  res.json({ username: req.admin.username });
});

router.post("/logout", (req, res) => {
  res.clearCookie("admin_token", COOKIE_OPTS);
  return res.json({ message: "Logged out successfully." });
});

export default router;

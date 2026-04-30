import { Router } from "express";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import pool from "../db/index.js";

const router = Router();

// Rate-limit: max 5 submissions per IP per 15 minutes
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many enquiries submitted. Please try again later." },
});

// Validation rules
const validateContact = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .isLength({ max: 255 }),
  body("email")
    .trim()
    .isEmail()
    .withMessage("A valid email address is required.")
    .normalizeEmail(),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required.")
    .isLength({ max: 50 }),
  body("company_name")
    .trim()
    .notEmpty()
    .withMessage("Company name is required.")
    .isLength({ max: 255 }),
  body("country")
    .trim()
    .notEmpty()
    .withMessage("Country is required.")
    .isLength({ max: 100 }),
  body("job_title")
    .trim()
    .notEmpty()
    .withMessage("Job title is required.")
    .isLength({ max: 255 }),
  body("job_details")
    .trim()
    .notEmpty()
    .withMessage("Job details are required.")
    .isLength({ min: 20, max: 5000 })
    .withMessage("Please provide at least 20 characters of detail."),
];

// POST /api/contact
router.post("/", contactLimiter, validateContact, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, email, phone, company_name, country, job_title, job_details } =
    req.body;

  try {
    const result = await pool.query(
      `INSERT INTO contacts (name, email, phone, company_name, country, job_title, job_details)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, created_at`,
      [name, email, phone, company_name, country, job_title, job_details],
    );

    const inquiry = result.rows[0];
    return res.status(201).json({
      message: "Thank you for reaching out! We will be in touch shortly.",
      id: inquiry.id,
    });
  } catch (err) {
    console.error("Contact insert error:", err);

    if (err.code === "23505" && err.constraint === "contacts_email_unique") {
      return res.status(409).json({
        error:
          "We already have an enquiry from this email address. If you need to add more details, please contact us directly or use a different email.",
        field: "email",
      });
    }

    return res
      .status(500)
      .json({
        error:
          "We couldn't send your enquiry right now. Please try again in a moment.",
      });
  }
});

export default router;

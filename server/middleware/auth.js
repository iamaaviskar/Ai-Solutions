import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  // Cookie-only — the token is never exposed to client JS
  const token = req.cookies?.admin_token;

  if (!token) {
    return res.status(401).json({ error: "Authentication required." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired session." });
  }
};

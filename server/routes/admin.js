import { Router } from "express";
import articleRoutes from "./admin/articles.js";
import authRoutes from "./admin/auth.js";
import enquiryRoutes from "./admin/enquiries.js";
import statsRoutes from "./admin/stats.js";

const router = Router();

router.use(authRoutes);
router.use(enquiryRoutes);
router.use(statsRoutes);
router.use(articleRoutes);

export default router;

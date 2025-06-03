import express from "express";
import { auth, adminAuth } from "../middleware/auth.js";
import { getAbout, updateAbout } from "../controllers/about.js";

const router = express.Router();

router.get("/", getAbout);
router.patch("/", adminAuth, updateAbout);

export default router;

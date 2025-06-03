import express from "express";
import { auth, adminAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import {
  getNews,
  getNewsItem,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/news.js";

const router = express.Router();

router.get("/", getNews);
router.get("/:id", getNewsItem);
router.post("/", adminAuth, upload.single("image"), createNews);
router.patch("/:id", adminAuth, upload.single("image"), updateNews);
router.delete("/:id", adminAuth, deleteNews);

export default router;

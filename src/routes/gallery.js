import express from "express";
import { auth, adminAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import {
  getGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from "../controllers/gallery.js";

const router = express.Router();

router.get("/", getGalleryImages);
router.post("/", adminAuth, upload.single("image"), createGalleryImage);
router.patch("/:id", adminAuth, upload.single("image"), updateGalleryImage);
router.delete("/:id", adminAuth, deleteGalleryImage);

export default router;

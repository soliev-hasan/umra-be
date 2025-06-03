import express from "express";
import { auth, adminAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import {
  getCarouselSlides,
  createCarouselSlide,
  updateCarouselSlide,
  deleteCarouselSlide,
} from "../controllers/carousel.js";

const router = express.Router();

router.get("/", getCarouselSlides);
router.post("/", adminAuth, upload.single("image"), createCarouselSlide);
router.patch("/:id", adminAuth, upload.single("image"), updateCarouselSlide);
router.delete("/:id", adminAuth, deleteCarouselSlide);

export default router;

import express from "express";
import { auth, adminAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} from "../controllers/tours.js";

const router = express.Router();

router.get("/", getTours);
router.get("/:id", getTour);
router.post("/", adminAuth, upload.single("image"), createTour);
router.patch("/:id", adminAuth, upload.single("image"), updateTour);
router.delete("/:id", adminAuth, deleteTour);

export default router;

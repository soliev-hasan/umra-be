import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import tourRoutes from "./routes/tours.js";
import newsRoutes from "./routes/news.js";
import aboutRoutes from "./routes/about.js";
import carouselRoutes from "./routes/carousel.js";
import galleryRoutes from "./routes/gallery.js";
import reviewsRoutes from "./routes/reviews.js";

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/carousel", carouselRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/reviews", reviewsRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

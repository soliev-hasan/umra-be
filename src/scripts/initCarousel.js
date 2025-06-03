import mongoose from "mongoose";
import dotenv from "dotenv";
import Carousel from "../models/Carousel.js";

dotenv.config();

const initialSlides = [
  {
    title: "Умра из Таджикистана",
    subtitle:
      "Организуем паломнические туры из Душанбе и других городов Таджикистана",
    imageUrl: "/uploads/tajikistan-umra.jpg",
    order: 1,
    isActive: true,
  },
  {
    title: "Умра из Узбекистана",
    subtitle:
      "Комфортные туры в Мекку и Медину из Ташкента и других городов Узбекистана",
    imageUrl: "/uploads/uzbekistan-umra.jpg",
    order: 2,
    isActive: true,
  },
  {
    title: "Умра из России",
    subtitle:
      "Паломнические туры из Москвы, Санкт-Петербурга и других городов России",
    imageUrl: "/uploads/russia-umra.jpg",
    order: 3,
    isActive: true,
  },
];

const initializeCarousel = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing slides
    await Carousel.deleteMany({});
    console.log("Cleared existing slides");

    // Insert new slides
    await Carousel.insertMany(initialSlides);
    console.log("Initialized carousel with default slides");

    process.exit(0);
  } catch (error) {
    console.error("Error initializing carousel:", error);
    process.exit(1);
  }
};

initializeCarousel();

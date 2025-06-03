import Carousel from "../models/Carousel.js";

export const getCarouselSlides = async (req, res) => {
  try {
    const slides = await Carousel.find({ isActive: true }).sort({ order: 1 });
    res.json(slides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCarouselSlide = async (req, res) => {
  try {
    const { title, subtitle, order } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    const slide = new Carousel({
      title,
      subtitle,
      imageUrl,
      order,
    });

    await slide.save();
    res.status(201).json(slide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCarouselSlide = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      updates.imageUrl = `/uploads/${req.file.filename}`;
    }

    const slide = await Carousel.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!slide) {
      return res.status(404).json({ error: "Slide not found" });
    }

    res.json(slide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCarouselSlide = async (req, res) => {
  try {
    const slide = await Carousel.findByIdAndDelete(req.params.id);
    if (!slide) {
      return res.status(404).json({ error: "Slide not found" });
    }
    res.json({ message: "Slide deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

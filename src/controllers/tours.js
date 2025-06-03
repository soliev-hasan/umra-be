import Tour from "../models/Tour.js";

export const getTours = async (req, res) => {
  try {
    const tours = await Tour.find().sort({ date: 1 });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }
    res.json(tour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTour = async (req, res) => {
  try {
    const { title, type, duration, price, date, description } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    const tour = new Tour({
      title,
      type,
      duration,
      price,
      date,
      description,
      imageUrl,
    });

    await tour.save();
    res.status(201).json(tour);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTour = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      updates.imageUrl = `/uploads/${req.file.filename}`;
    }

    const tour = await Tour.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }

    res.json(tour);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }
    res.json({ message: "Tour deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

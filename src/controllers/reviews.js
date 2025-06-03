import Review from "../models/Review.js";

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { author, comment, rating } = req.body;
    const ipAddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    // Check if a review from this IP exists in the last 24 hours
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingReview = await Review.findOne({
      ipAddress,
      createdAt: { $gte: twentyFourHoursAgo },
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ error: "Вы уже оставили отзыв за последние 24 часа." });
    }

    const review = new Review({
      author,
      comment,
      rating,
      ipAddress,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

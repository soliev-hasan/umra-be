import News from "../models/News.js";

export const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNewsItem = async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ error: "News item not found" });
    }
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNews = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    const newsItem = new News({
      title,
      content,
      author,
      imageUrl,
    });

    await newsItem.save();
    res.status(201).json(newsItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateNews = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      updates.imageUrl = `/uploads/${req.file.filename}`;
    }

    const newsItem = await News.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!newsItem) {
      return res.status(404).json({ error: "News item not found" });
    }

    res.json(newsItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const newsItem = await News.findByIdAndDelete(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ error: "News item not found" });
    }
    res.json({ message: "News item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

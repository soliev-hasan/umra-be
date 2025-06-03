import About from "../models/About.js";

export const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({
        mission: "Default mission statement",
        experience: "Default experience description",
      });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const { mission, experience } = req.body;
    let about = await About.findOne();

    if (!about) {
      about = new About({ mission, experience });
    } else {
      about.mission = mission;
      about.experience = experience;
    }

    await about.save();
    res.json(about);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

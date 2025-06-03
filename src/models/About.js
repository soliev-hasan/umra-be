import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    mission: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);

import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date },
  location: { type: String },
  image: { type: String }, 
  childrenAge: { type: String },
  childrenSponsored: { type: Number, default: 0 },
});

export default mongoose.models.Activity || mongoose.model("Activity", ActivitySchema);

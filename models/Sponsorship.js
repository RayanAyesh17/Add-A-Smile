import mongoose from "mongoose";

const SponsorshipSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // or "Donor" — must match your real model name
    required: true,
  },
  family: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PoorFamily", // must match your actual family schema name
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Sponsorship ||
  mongoose.model("Sponsorship", SponsorshipSchema);

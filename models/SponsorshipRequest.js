import mongoose from "mongoose";

const SponsorshipRequestSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  family: { type: mongoose.Schema.Types.ObjectId, ref: "PoorFamily", required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
}, { timestamps: true });

export default mongoose.models.SponsorshipRequest ||
  mongoose.model("SponsorshipRequest", SponsorshipRequestSchema);

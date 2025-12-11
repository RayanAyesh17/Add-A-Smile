import mongoose from "mongoose";

const PoorFamilySchema = new mongoose.Schema(
  {
    age: Number,
    gender: { type: String, enum: ["male", "female"] },
    needs: { type: [String], required: true },
    urgency: { type: String, enum: ["low", "medium", "high"], default: "medium" },

    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },

    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reportedSource: { type: String, enum: ["admin", "user"], default: "user" },

    sponsoredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

    reporterInfo: {
      name: String,
      contact: String,
    },

    location: String,
    description: String,
    phone: String,
  },
  { timestamps: true }
);

export default mongoose.models.PoorFamily || mongoose.model("PoorFamily", PoorFamilySchema);

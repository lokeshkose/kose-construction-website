import mongoose from "mongoose";

const SubscriptionsSchema = new mongoose.Schema(
  {
    status: { type: String, required: true, default: "ACTIVE" },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Subscriptions ||
  mongoose.model("Subscriptions", SubscriptionsSchema);

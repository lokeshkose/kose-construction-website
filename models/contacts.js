import mongoose from "mongoose";

const ContactsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Contacts ||
  mongoose.model("Contacts", ContactsSchema);

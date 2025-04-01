import mongoose from "mongoose";

const Quotationschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    service: { type: String, required: true },
    projectInfo: { type: String,},
    company: { type: String,},

  },
  { timestamps: true }
);

export default mongoose.models.Quotations ||
  mongoose.model("Quotations", Quotationschema);

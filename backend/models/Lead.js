import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  status: {
    type: String,
    enum: ["new", "contacted", "converted"],
    default: "new"
  },
  notes: [String]
}, { timestamps: true });

export default mongoose.model("Lead", leadSchema);

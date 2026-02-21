import express from "express";
import Lead from "../models/Lead.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
});

router.post("/", protect, async (req, res) => {
  const lead = await Lead.create(req.body);
  res.json(lead);
});

router.put("/:id/status", protect, async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(lead);
});

router.put("/:id/note", protect, async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  lead.notes.push(req.body.note);
  await lead.save();
  res.json(lead);
});

router.delete("/:id", protect, async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

export default router;

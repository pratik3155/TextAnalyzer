const express = require("express");
const router = express.Router();
const TextModel = require("../db");

router.post("/save", async (req, res) => {
  const { text } = req.body;
  try {
    const newTextEntry = new TextModel({ text });
    await newTextEntry.save();
    res.status(200).json({ message: "Text saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save text" });
  }
});

router.get("/recent", async (req, res) => {
  try {
    const recentEntries = await TextModel.find().sort({ _id: -1 }).limit(5);
    res.status(200).json(recentEntries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recent entries" });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Log = require("../models/Log");

router.get("/", async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const newLog = new Log(req.body);
    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

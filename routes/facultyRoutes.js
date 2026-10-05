const express = require("express");
const router = express.Router();
const Faculty = require("../models/faculty");

// GET all faculty
router.get("/", async (req, res) => {
  try {
    const faculty = await Faculty.find().populate("department");
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET faculty by ID
router.get("/:id", async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id)
      .populate("department");

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new faculty
router.post("/", async (req, res) => {
  try {
    const faculty = await Faculty.create(req.body);

    res.status(201).json({
      message: "Faculty added successfully",
      faculty
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update faculty
router.put("/:id", async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.json({
      message: "Faculty updated successfully",
      faculty
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE faculty
router.delete("/:id", async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.json({ message: "Faculty deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
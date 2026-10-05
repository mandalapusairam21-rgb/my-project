const express = require("express");
const router = express.Router();
const Course = require("../models/course");

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("department");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET course by ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("department");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new course
router.post("/", async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      message: "Course added successfully",
      course
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update course
router.put("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({
      message: "Course updated successfully",
      course
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE course
router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
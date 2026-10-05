const express = require("express");
const router = express.Router();
const Department = require("../models/department");

// GET all departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET department by ID
router.get("/:id", async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        message: "Department not found"
      });
    }

    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new department
router.post("/", async (req, res) => {
  try {
    const department = await Department.create(req.body);

    res.status(201).json({
      message: "Department added successfully",
      department
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update department
router.put("/:id", async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!department) {
      return res.status(404).json({
        message: "Department not found"
      });
    }

    res.json({
      message: "Department updated successfully",
      department
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE department
router.delete("/:id", async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);

    if (!department) {
      return res.status(404).json({
        message: "Department not found"
      });
    }

    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
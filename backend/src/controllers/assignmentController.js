const Assignment = require("../models/Assignment");
// const Assignment = require("../models/Assignment");

const createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);

    res.status(201).json({
      success: true,
      message: "Assignment Created Successfully",
      assignment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();

    res.status(200).json({
      success: true,
      assignments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      assignment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateAssignment = async (req, res) => {
  try {
    const assignment =
      await Assignment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json({
      success: true,
      message:
        "Assignment Updated Successfully",
      assignment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Assignment Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
};
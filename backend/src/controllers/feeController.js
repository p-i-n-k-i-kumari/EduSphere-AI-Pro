const Fee = require("../models/Fee");

const createFee = async (req, res) => {
  try {
    const fee = await Fee.create(req.body);

    res.status(201).json({
      success: true,
      message: "Fee Record Created Successfully",
      fee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllFees = async (req, res) => {
  try {
    const fees = await Fee.find().populate(
      "studentId",
      "name studentId"
    );

    res.status(200).json({
      success: true,
      fees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFeeById = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id).populate(
      "studentId",
      "name studentId"
    );

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee record not found",
      });
    }

    res.status(200).json({
      success: true,
      fee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fee Updated Successfully",
      fee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndDelete(req.params.id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fee Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFeesByStudent = async (req, res) => {
  try {
    const fees = await Fee.find({
      studentId: req.params.studentId,
    }).populate("studentId", "name studentId");

    res.status(200).json({
      success: true,
      fees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createFee,
  getAllFees,
  getFeeById,
  updateFee,
  deleteFee,
  getFeesByStudent,
};
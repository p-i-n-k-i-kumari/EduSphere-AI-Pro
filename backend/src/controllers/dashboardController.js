const Student = require("../models/Student");
const Faculty = require("../models/Faculty");
const Course = require("../models/Course");
const Assignment = require("../models/Assignment");
const Result = require("../models/Result");
const Fee = require("../models/Fee");
const Attendance = require("../models/Attendance");

const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalFaculty = await Faculty.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalAssignments = await Assignment.countDocuments();
    const totalResults = await Result.countDocuments();
    const totalFees = await Fee.countDocuments();
    const totalAttendance = await Attendance.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalStudents,
        totalFaculty,
        totalCourses,
        totalAssignments,
        totalResults,
        totalFees,
        totalAttendance,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
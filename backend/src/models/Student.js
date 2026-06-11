const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
    },

    course: {
      type: String,
      required: true,
    },

    semester: {
      type: Number,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    attendance: {
      type: Number,
      default: 0,
    },

    cgpa: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);
const dashboardRoutes = require("./routes/dashboardRoutes");
const feeRoutes = require("./routes/feeRoutes");
const resultRoutes = require("./routes/resultRoutes");
const courseRoutes = require("./routes/courseRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/fee", feeRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/api/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "EduSphere AI Backend Running Successfully"
  });
});

module.exports = app;
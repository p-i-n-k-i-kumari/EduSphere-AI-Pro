const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  markAttendance,
  getAllAttendance,
} = require("../controllers/attendanceController");

router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  markAttendance
);

router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  getAllAttendance
);

module.exports = router;
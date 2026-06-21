const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    markAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
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
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  getAttendanceById
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  updateAttendance
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteAttendance
);

module.exports = router;
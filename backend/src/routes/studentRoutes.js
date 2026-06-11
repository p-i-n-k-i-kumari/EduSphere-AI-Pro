const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createStudent,
  getAllStudents,
} = require("../controllers/studentController");

router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createStudent
);
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  getAllStudents
);

module.exports = router;
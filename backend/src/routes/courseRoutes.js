const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createCourse,
  getAllCourses,
} = require("../controllers/courseController");

router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createCourse
);

router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  getAllCourses
);

module.exports = router;
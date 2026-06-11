const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
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
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  getStudentById
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  updateStudent
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteStudent
);
module.exports = router;
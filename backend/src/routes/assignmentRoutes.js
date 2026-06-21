const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController");

router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createAssignment
);

router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  getAllAssignments
);
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  getAssignmentById
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  updateAssignment
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteAssignment
);

module.exports = router;
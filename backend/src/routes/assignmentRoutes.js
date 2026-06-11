const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createAssignment,
  getAllAssignments,
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

module.exports = router;
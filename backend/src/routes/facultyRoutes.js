const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createFaculty,
  getAllFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
} = require("../controllers/facultyController");

router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createFaculty
);

router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  getAllFaculty
);

router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  getFacultyById
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  updateFaculty
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteFaculty
);

module.exports = router;
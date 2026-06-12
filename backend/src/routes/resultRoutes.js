const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    createResult,
  getAllResults,
  getResultById,
  updateResult,
  deleteResult,
  getResultsByStudent,

} = require("../controllers/resultController");

router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createResult
);

router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  getAllResults
);
router.get(
  "/student/:studentId",
  authMiddleware,
  authorizeRoles("admin"),
  getResultsByStudent
);

router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  getResultById
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  updateResult
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteResult
);
module.exports = router;
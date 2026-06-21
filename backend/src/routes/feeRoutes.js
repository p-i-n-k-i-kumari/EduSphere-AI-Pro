const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createFee,
  getAllFees,
  getFeeById,
  updateFee,
  deleteFee,
  getFeesByStudent,
} = require("../controllers/feeController");

router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createFee
);

router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  getAllFees
);

router.get(
  "/student/:studentId",
  authMiddleware,
  authorizeRoles("admin"),
  getFeesByStudent
);

router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  getFeeById
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  updateFee
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteFee
);

module.exports = router;
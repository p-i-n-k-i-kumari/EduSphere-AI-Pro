const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

router.get(
  "/stats",
  authMiddleware,
  authorizeRoles("admin"),
  getDashboardStats
);

module.exports = router;
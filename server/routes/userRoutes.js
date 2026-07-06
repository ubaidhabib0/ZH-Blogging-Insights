const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

const userController = require("../controllers/userController");

router.get("/profile", protect, userController.getProfile);

router.get(
    "/admin",
    protect,
    authorize("admin", "superadmin"),
    userController.adminDashboard
);

router.get(
    "/superadmin",
    protect,
    authorize("superadmin"),
    userController.superAdminDashboard
);

module.exports = router;
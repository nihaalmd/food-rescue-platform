import express from "express";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

import {
  getStats,
  getUsers,
  getDonations,
  deleteUser,
  deleteDonation,
  clearDonations,
  clearCompletedDonations,
  resetSystem,
} from "../controllers/adminController.js";

const router = express.Router();

/* DASHBOARD */

router.get(
  "/stats",
  protect,
  authorize("admin"),
  getStats
);

/* USERS */

router.get(
  "/users",
  protect,
  authorize("admin"),
  getUsers
);

router.delete(
  "/user/:id",
  protect,
  authorize("admin"),
  deleteUser
);

/* DONATIONS */

router.get(
  "/donations",
  protect,
  authorize("admin"),
  getDonations
);

router.delete(
  "/donation/:id",
  protect,
  authorize("admin"),
  deleteDonation
);

/* SYSTEM CONTROLS */

router.delete(
  "/clear-donations",
  protect,
  authorize("admin"),
  clearDonations
);

router.delete(
  "/clear-completed",
  protect,
  authorize("admin"),
  clearCompletedDonations
);

router.delete(
  "/reset-system",
  protect,
  authorize("admin"),
  resetSystem
);

export default router;
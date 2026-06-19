import express from "express";
import {
  protect,
  authorize
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/profile",
  protect,
  (req, res) => {
    res.json({
      success: true,
      message: "Protected Route Accessed",
      user: req.user
    });
  }
);

router.get(
  "/restaurant",
  protect,
  authorize("restaurant"),
  (req, res) => {
    res.json({
      success: true,
      message: "Restaurant Dashboard Access Granted"
    });
  }
);

router.get(
  "/ngo",
  protect,
  authorize("ngo"),
  (req, res) => {
    res.json({
      success: true,
      message: "NGO Dashboard Access Granted"
    });
  }
);

export default router;
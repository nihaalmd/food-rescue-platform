import express from "express";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

import upload from "../config/upload.js";

import {
  createDonation,
  getAllDonations,
  getDonationById,
  getMyDonations,
  getMyClaims,
  acceptDonation,
  startPickup,
  completeDonation,
  updateDonation,
  deleteDonation,
} from "../controllers/donationController.js";

const router = express.Router();

/* CREATE DONATION */

router.post(
  "/create",
  protect,
  authorize("restaurant"),
  (req, res, next) => {

    upload.single("image")(req, res, (err) => {

      if (err) {

        console.log("MULTER ERROR:");
        console.dir(err, { depth: null });

        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      next();
    });

  },
  createDonation
);

/* GET ALL AVAILABLE DONATIONS */

router.get(
  "/all",
  protect,
  authorize("ngo"),
  getAllDonations
);

/* RESTAURANT DONATIONS */

router.get(
  "/my-donations",
  protect,
  authorize("restaurant"),
  getMyDonations
);

/* NGO CLAIMED DONATIONS */

router.get(
  "/my-claims",
  protect,
  authorize("ngo"),
  getMyClaims
);

/* ACCEPT DONATION */

router.put(
  "/accept/:id",
  protect,
  authorize("ngo"),
  acceptDonation
);

/* START PICKUP */

router.put(
  "/pickup/:id",
  protect,
  authorize("ngo"),
  startPickup
);

/* COMPLETE DONATION */

router.put(
  "/complete/:id",
  protect,
  authorize("ngo"),
  completeDonation
);

/* UPDATE DONATION */

router.put(
  "/update/:id",
  protect,
  authorize("restaurant"),
  updateDonation
);

/* DELETE DONATION */

router.delete(
  "/delete/:id",
  protect,
  authorize("restaurant"),
  deleteDonation
);

/* GET SINGLE DONATION - KEEP LAST */

router.get(
  "/:id",
  protect,
  getDonationById
);

export default router;
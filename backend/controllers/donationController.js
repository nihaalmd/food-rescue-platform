import Donation from "../models/Donation.js";

/* CREATE DONATION */

export const createDonation = async (req, res) => {
  try {

    const {
      foodName,
      quantity,
      foodType,
      expiryTime,
      placeName,
      pickupAddress,
      latitude,
      longitude,
      description,

    } = req.body;

    const donation = await Donation.create({
      restaurant: req.user.id,

      foodName,
      quantity,
      foodType,
      expiryTime,
      placeName,
      pickupAddress,
      description,
      latitude,
      longitude,

      image: `/uploads/${req.file.filename}`,
    });

    res.status(201).json({
      success: true,
      message: "Donation created successfully",
      donation,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* GET ALL AVAILABLE DONATIONS */

export const getAllDonations = async (req, res) => {
  try {

    const donations = await Donation.find({
      status: "available",
    })
      .populate("restaurant", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      donations,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* GET SINGLE DONATION */

export const getDonationById = async (req, res) => {
  try {

    const donation = await Donation.findById(
      req.params.id
    )
      .populate("restaurant", "name email")
      .populate("claimedBy", "name email");

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    res.status(200).json({
      success: true,
      donation,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* RESTAURANT DONATIONS */

export const getMyDonations = async (req, res) => {
  try {

    const donations = await Donation.find({
      restaurant: req.user.id,
    })
      .populate("claimedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      donations,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* NGO CLAIMED DONATIONS */

export const getMyClaims = async (req, res) => {
  try {

    const donations = await Donation.find({
      claimedBy: req.user.id,
    })
      .populate("restaurant", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      donations,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* NGO ACCEPT DONATION */

export const acceptDonation = async (req, res) => {
  try {

    const donation = await Donation.findById(
      req.params.id
    );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    donation.status = "claimed";
    donation.claimedBy = req.user.id;

    await donation.save();

    res.status(200).json({
      success: true,
      message: "Donation accepted successfully",
      donation,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* START PICKUP */

export const startPickup = async (req, res) => {
  try {

    const donation = await Donation.findById(
      req.params.id
    );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    donation.status = "pickedup";

    await donation.save();

    res.status(200).json({
      success: true,
      message: "Pickup started",
      donation,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* COMPLETE DONATION */

export const completeDonation = async (req, res) => {
  try {

    const donation = await Donation.findById(
      req.params.id
    );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    donation.status = "completed";

    await donation.save();

    res.status(200).json({
      success: true,
      message: "Donation completed",
      donation,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* UPDATE DONATION */

export const updateDonation = async (req, res) => {
  try {

    const donation = await Donation.findById(
      req.params.id
    );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    if (
      donation.restaurant.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedDonation =
      await Donation.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json({
      success: true,
      donation: updatedDonation,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* DELETE DONATION */

export const deleteDonation = async (req, res) => {
  try {

    const donation = await Donation.findById(
      req.params.id
    );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    if (
      donation.restaurant.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Donation.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Donation deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
import User from "../models/User.js";
import Donation from "../models/Donation.js";

/* DASHBOARD STATS */

export const getStats = async (req, res) => {
  try {

    const totalUsers =
      await User.countDocuments();

    const totalRestaurants =
      await User.countDocuments({
        role: "restaurant",
      });

    const totalNGOs =
      await User.countDocuments({
        role: "ngo",
      });

    const totalDonations =
      await Donation.countDocuments();

    const available =
      await Donation.countDocuments({
        status: "available",
      });

    const claimed =
      await Donation.countDocuments({
        status: "claimed",
      });

    const pickedup =
      await Donation.countDocuments({
        status: "pickedup",
      });

    const completed =
      await Donation.countDocuments({
        status: "completed",
      });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalRestaurants,
        totalNGOs,
        totalDonations,
        available,
        claimed,
        pickedup,
        completed,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* GET ALL USERS */

export const getUsers = async (req, res) => {
  try {

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* GET ALL DONATIONS */

export const getDonations = async (req, res) => {
  try {

    const donations =
      await Donation.find()
        .populate(
          "restaurant",
          "name email"
        )
        .populate(
          "claimedBy",
          "name email"
        )
        .sort({
          createdAt: -1,
        });

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

/* DELETE USER */

export const deleteUser = async (req, res) => {
  try {

    const user =
      await User.findById(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "User deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* DELETE DONATION */

export const deleteDonation = async (
  req,
  res
) => {
  try {

    const donation =
      await Donation.findById(
        req.params.id
      );

    if (!donation) {
      return res.status(404).json({
        success: false,
        message:
          "Donation not found",
      });
    }

    await donation.deleteOne();

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

/* CLEAR ALL DONATIONS */

export const clearDonations = async (
  req,
  res
) => {
  try {

    await Donation.deleteMany();

    res.status(200).json({
      success: true,
      message:
        "All donations deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/* CLEAR COMPLETED DONATIONS */

export const clearCompletedDonations =
  async (req, res) => {

    try {

      await Donation.deleteMany({
        status: "completed",
      });

      res.status(200).json({
        success: true,
        message:
          "Completed donations removed",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };

/* RESET SYSTEM */

export const resetSystem =
  async (req, res) => {

    try {

      await Donation.deleteMany();

      res.status(200).json({
        success: true,
        message:
          "System reset successfully",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };
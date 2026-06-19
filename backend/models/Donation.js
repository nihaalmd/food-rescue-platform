import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    foodName: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    foodType: {
      type: String,
      required: true,
    },

    expiryTime: {
      type: Date,
      required: true,
    },

    placeName: {
      type: String,
      default: "",
    },

    pickupAddress: {
      type: String,
      required: true,
    },

    latitude: {
      type: Number,
      default: null,
    },
    
    longitude: {
      type: Number,
      default: null,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "available",
        "claimed",
        "pickedup",
        "completed",
      ],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Donation",
  donationSchema
);
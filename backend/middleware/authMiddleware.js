import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* PROTECT ROUTES */

export const protect = async (
  req,
  res,
  next
) => {
  try {

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {
      token =
        req.headers.authorization.split(
          " "
        )[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "No token provided",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user =
      await User.findById(
        decoded.id
      ).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "User not found",
      });
    }

    req.user = user;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message:
        "Invalid token",
    });

  }
};

/* ROLE AUTHORIZATION */

export const authorize = (
  ...roles
) => {
  return (
    req,
    res,
    next
  ) => {

    if (
      !roles.includes(
        req.user.role
      )
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied",
      });
    }

    next();

  };
};

export const getProfile = async (
  req,
  res
) => {
  try {

    res.status(200).json({
      success: true,
      user: req.user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch profile"
    });

  }
};
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

connectDB();

const app = express();

/* MIDDLEWARE */

app.use(cors());
app.use(express.json());

/* STATIC FILES */

app.use("/uploads", express.static("uploads"));

/* ROUTES */

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/admin", adminRoutes);
/* TEST ROUTE */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FeedForward API Running",
  });
});

/* PORT */

const PORT = process.env.PORT || 5000;

/* SERVER */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
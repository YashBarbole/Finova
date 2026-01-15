import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

// config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors({origin: "*"}));
app.use(express.json());

// basic route
app.get("/", (req, res) => {
  res.send("🚀 PaySmart backend is running");
});



// db connect + start server
// START SERVER FIRST
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// CONNECT MONGO SEPARATELY
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));




app.use("/api", authRoutes);


app.use("/api", transactionRoutes);
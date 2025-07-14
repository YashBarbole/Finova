const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

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
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Mongo Error:", err);
  });




const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);


const transactionRoutes = require("./routes/transactionRoutes");
app.use("/api", transactionRoutes);
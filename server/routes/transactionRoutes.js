const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth");
const { sendMoney } = require("../controllers/transactionController");

router.post("/send", protect, sendMoney);

module.exports = router;

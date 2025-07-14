import express from "express";
import protect from "../middlewares/auth.js";
import { sendMoney, getBalance, getTransactions } from "../controllers/transactionController.js";
const router = express.Router();

router.post("/send", protect, sendMoney);
router.get("/balance", protect, getBalance);
router.get("/transactions", protect, getTransactions);

export default router;

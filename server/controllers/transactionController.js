import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Transaction from "../models/Transaction.js";

// @route   POST /api/send
// @desc    Send money to another user
export const sendMoney = async (req, res) => {
  try {
    const senderId = req.user.userId; // From JWT
    const { receiverEmail, amount, pin } = req.body;
    const sender = await User.findById(senderId);
    const receiver = await User.findOne({ email: receiverEmail });
    if (!receiver) {
      await Transaction.create({ sender: senderId, receiver: null, amount, status: "failed" });
      return res.status(404).json({ msg: "Receiver not found" });
    }
    // Check if account is locked
    if (sender.isLocked && sender.lockedUntil > Date.now()) {
      await Transaction.create({ sender: senderId, receiver: receiver._id, amount, status: "failed" });
      return res.status(403).json({ msg: "Account is locked due to suspicious activity" });
    }
    // Check PIN
    const isPinCorrect = await bcrypt.compare(pin, sender.pin);
    if (!isPinCorrect) {
      sender.failedAttempts += 1;
      // Lock account after 3 wrong tries
      if (sender.failedAttempts >= 3) {
        sender.isLocked = true;
        sender.lockedUntil = new Date(Date.now() + 5 * 60 * 1000); // 5 min lock
        await sender.save();
        await Transaction.create({ sender: senderId, receiver: receiver._id, amount, status: "failed" });
        return res.status(403).json({ msg: "Account locked due to 3 wrong PINs" });
      }
      await sender.save();
      await Transaction.create({ sender: senderId, receiver: receiver._id, amount, status: "failed" });
      return res.status(401).json({ msg: "Incorrect PIN" });
    }
    // Reset failed attempts
    sender.failedAttempts = 0;
    sender.isLocked = false;
    sender.lockedUntil = null;
    const amountNum = Number(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      await Transaction.create({ sender: senderId, receiver: receiver._id, amount, status: "failed" });
      return res.status(400).json({ msg: "Invalid amount" });
    }
    if (sender.balance < amountNum) {
      await Transaction.create({ sender: senderId, receiver: receiver._id, amount, status: "failed" });
      return res.status(400).json({ msg: "Insufficient balance" });
    }
    // Transfer money
    sender.balance -= amountNum;
    receiver.balance += amountNum;
    await sender.save();
    await receiver.save();
    await Transaction.create({ sender: senderId, receiver: receiver._id, amount: amountNum, status: "success" });
    res.status(200).json({ msg: "Money sent successfully", senderBalance: sender.balance });
  } catch (err) {
    console.error("Send Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
// get transcation 
export const getTransactions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const txns = await Transaction.find({
      $or: [
        { sender: userId },
        { receiver: userId }
      ]
    })
      .sort({ createdAt: -1 })
      .populate("sender", "name email")
      .populate("receiver", "name email");
    res.json({ transactions: txns });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
  
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @route   POST /api/send
// @desc    Send money to another user
exports.sendMoney = async (req, res) => {
    try {
      const senderId = req.user.userId; // From JWT
      const { receiverEmail, amount, pin } = req.body;
  
      const sender = await User.findById(senderId);
      const receiver = await User.findOne({ email: receiverEmail });
  
      if (!receiver) {
        return res.status(404).json({ msg: "Receiver not found" });
      }
  
      // Check if account is locked
      if (sender.isLocked && sender.lockedUntil > Date.now()) {
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
          return res.status(403).json({ msg: "Account locked due to 3 wrong PINs" });
        }
  
        await sender.save();
        return res.status(401).json({ msg: "Incorrect PIN" });
      }
  
      // Reset failed attempts
      sender.failedAttempts = 0;
      sender.isLocked = false;
      sender.lockedUntil = null;
  
      if (sender.balance < amount) {
        return res.status(400).json({ msg: "Insufficient balance" });
      }
  
      // Transfer money
      sender.balance -= amount;
      receiver.balance += amount;
  
      await sender.save();
      await receiver.save();
  
      res.status(200).json({ msg: "Money sent successfully", senderBalance: sender.balance });
    } catch (err) {
      console.error("Send Error:", err.message);
      res.status(500).json({ msg: "Server error" });
    }
  };
  
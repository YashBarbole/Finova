const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // user must enter name
  },
  email: {
    type: String,
    required: true, // user must enter email
    unique: true,   // two users can't have same email
  },
  password: {
    type: String,
    required: true, // used for login
  },
  pin: {
    type: String,
    required: true, // like UPI PIN (used for transactions)
  },
  balance: {
    type: Number,
    default: 1000, // new user gets ₹1000 wallet balance
  },
  failedAttempts: {
    type: Number,
    default: 0, // how many wrong PINs entered
  },
  isLocked: {
    type: Boolean,
    default: false, // if user is blocked due to fraud
  },
  lockedUntil: {
    type: Date,
  },
});

// 🔐 Auto-hash password and pin before saving
userSchema.pre("save", async function (next) {
  // only hash if modified (during register, not update)
  if (!this.isModified("password")) return next();

  // hash password and pin
  this.password = await bcrypt.hash(this.password, 10);
  this.pin = await bcrypt.hash(this.pin, 10);
  next();
});

// export model
module.exports = mongoose.model("User", userSchema);

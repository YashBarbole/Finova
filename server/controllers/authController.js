import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// create token
const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

// @route   POST /api/register
// @desc    Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, pin } = req.body;
    // check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "User already exists" });
    }
    // create user
    const newUser = new User({ name, email, password, pin });
    await newUser.save();
    // create JWT token
    const token = createToken(newUser._id);
    res.status(201).json({
      msg: "User registered successfully",
      token,
      user: {
        name: newUser.name,
        email: newUser.email,
        balance: newUser.balance,
      },
    });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
//login user 
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1️⃣ Check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }
    // 2️⃣ Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }
    // 3️⃣ If email+password correct, create login token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2 days",
    });
    // 4️⃣ Send token and user info back to frontend
    res.json({
      msg: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        balance: user.balance,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
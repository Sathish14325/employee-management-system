import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

// generate token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// register user
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({
      message: "User created successfully",
      _id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error in ctrl" });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
      message: "Login successful",
      _id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// logout
export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expire: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// dashboard
export const dashboard = (req, res) => {
  res.status(200).json({ message: "Welcome to the admin dashboard" });
};

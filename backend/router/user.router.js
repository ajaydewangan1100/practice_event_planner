import express from "express";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userRouter = express.Router();

// Signup
userRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, email, password, age } = req.body;

    // Validate input
    if (!firstName || !email || !password || !age) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.create({ firstName, email, password, age });

    res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

// Login
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY
    );

    user.password = null;

    res.cookie("token", token);
    res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

export default userRouter;

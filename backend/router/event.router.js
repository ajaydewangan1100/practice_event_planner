import express from "express";
import mongoose from "mongoose";
import Event from "../models/event.model.js";
import cloudinary from "../config/cloudinaryConfig.js";
import cloudinaryUpload from "../helper/cloudinaryUpload.js";

const eventRouter = express.Router();

eventRouter.post("/createevent", async function (req, res) {
  try {
    const { title, description, location, date } = req.body;

    if (!title || !description || !location || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const uploadedResult = await cloudinaryUpload(req.file);

    const createdBy = req.user._id;

    const newEvent = await Event.create({
      title,
      description,
      location,
      date,
      image: uploadedResult.secure_url,
      createdBy,
    });

    res.status(201).json({ message: "newEvent Done", newEvent });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

export default eventRouter;

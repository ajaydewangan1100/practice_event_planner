import express from "express";
import mongoose from "mongoose";
import Event from "../models/event.model.js";

const eventRouter = express.Router();

eventRouter.post("/createevent", async function (req, res) {
  try {
    const { title, description, location, date } = req.body;

    if (!title || !description || !location || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const createdBy = req.user._id;

    const newEvent = Event.create({
      title,
      description,
      location,
      date,
      image,
      createdBy,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

export default eventRouter;

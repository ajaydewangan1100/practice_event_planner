import express from "express";
import mongoose from "mongoose";
import Event from "../models/event.model.js";
import cloudinary from "../config/cloudinaryConfig.js";
import cloudinaryUpload from "../helper/cloudinaryUpload.js";
import upload from "../config/multerConfig.js";

const eventRouter = express.Router();

// Create event
eventRouter.post(
  "/createevent",
  upload.single("image"),
  async function (req, res) {
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
  }
);

// Delete event
eventRouter.delete("/deleteevent/:eventId", async function (req, res) {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      return res
        .status(400)
        .json({ message: "Please provise eventId to delete." });
    }

    const event = await Event.findById(eventId);

    const loggedInUserId = req.user._id;
    if (loggedInUserId.toString() !== event.createdBy.toString()) {
      return res
        .status(401)
        .json({ message: "Unauthorized to update this event." });
    }

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res
        .status(404)
        .json({ message: "Something wrong! Event not found." });
    }

    res.status(201).json({ message: "Event successfully deleted." });
  } catch (error) {
    return res.status(500).json({ message: "Server error on delete event!!" });
  }
});

// Get all events
eventRouter.get("/allevents", async function (req, res) {
  try {
    const allEvents = await Event.find();

    if (!allEvents) {
      return res.status(404).json({ message: "Some Error! Events not found." });
    }

    res
      .status(201)
      .json({ message: "Events fetched successfully.", events: allEvents });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error on getting events!!" });
  }
});

// Update a event
eventRouter.patch(
  "/updateevent/:eventId",
  upload.single("image"),
  async function (req, res) {
    try {
      const { title, description, location, date } = req.body;

      const uploadedResult = req.file
        ? await cloudinaryUpload(req.file)
        : undefined;

      const loggedInUserId = req.user._id;

      const { eventId } = req.params;

      const event = await Event.findById(eventId);

      if (loggedInUserId.toString() !== event.createdBy.toString()) {
        return res
          .status(401)
          .json({ message: "Unauthorized to update this event." });
      }

      const upatedEvent = await Event.findByIdAndUpdate(
        eventId,
        {
          title,
          description,
          location,
          date,
          image: uploadedResult ? uploadedResult.secure_url : undefined,
        },
        {
          new: true,
        }
      );

      res
        .status(201)
        .json({ message: "Event Updated successfully", upatedEvent });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error, Event update failed" });
    }
  }
);
// Get a event by id
eventRouter.get("/getevent/:eventId", async function (req, res) {
  try {
    const { eventId } = req.params;
    if (!eventId) {
      return res
        .status(400)
        .json({ message: "Please provise eventId to find." });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ message: "Something wrong! Event not found." });
    }
    res.status(200).json({ message: "Event found", event });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error, Event fetch failed" });
  }
});

export default eventRouter;

import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 20,
    },
    description: {
      type: String,
      required: true,
      maxlength: 100,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      default: "https://www.quark.com/assets/fashion.png",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const event = mongoose.model("Event", eventSchema);
export default event;

import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    start: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
  }
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;

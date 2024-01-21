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
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;

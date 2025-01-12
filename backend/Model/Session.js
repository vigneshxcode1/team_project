
import mongoose  from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "studyGroup",
      required: true,
    },

    title: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, default: 60 },
    location: { type: String, default: "Virtual" },
  },
  { timestamps: true }
);

const sessionmodel =  mongoose.model("Session", sessionSchema);

export default sessionmodel

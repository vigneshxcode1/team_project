import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    profilePicture: { type: String, default: "" },

    bio: { type: String, default: "" },

    subjects: [String],

    studyStyles: [String],

    location: { type: String, default: "online" },

    joinedGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: "studyGroup" }],

  },
  { timestamps: true }
);
const usermodel= mongoose.model("Usermembers", userSchema);

export default usermodel

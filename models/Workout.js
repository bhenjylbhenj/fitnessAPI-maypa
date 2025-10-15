const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Workout name is required."],
  },
  userId: {
    type: String,
    required: [true, "User ID is required"],
  },
  duration: {
    type: String,
    required: [true, "Workout duration is required"],
  },
  status: {
    type: String,
    default: "pending",
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Workout", workoutSchema);

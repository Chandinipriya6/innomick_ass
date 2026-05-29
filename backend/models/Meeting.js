const mongoose = require("mongoose");

const attendeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  hourlyRate: {
    type: Number,
    required: true,
  },
});

const meetingSchema = new mongoose.Schema(
  {
    meetingName: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    agenda: {
      type: String,
      required: true,
    },

    attendees: [attendeeSchema],

    totalCost: {
      type: Number,
      required: true,
    },

    recommendation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meeting", meetingSchema);
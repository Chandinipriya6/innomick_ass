const express = require("express");

const {
  calculateMeetingCost,
  saveMeeting,
  getMeetings,
} = require("../controllers/meetingController");

const router = express.Router();

router.post("/calculate", calculateMeetingCost);

router.post("/save", saveMeeting);

router.get("/history", getMeetings);

module.exports = router;
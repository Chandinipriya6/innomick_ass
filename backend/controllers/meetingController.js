const Meeting = require("../models/Meeting");

const calculateMeetingCost = async (req, res) => {
  try {
    const { meetingName, duration, agenda, attendees } = req.body;

    const totalHourlyRate = attendees.reduce(
      (sum, attendee) => sum + Number(attendee.hourlyRate),
      0
    );

    const totalCost = totalHourlyRate * (duration / 60);

    let recommendation = "";

    if (totalCost > 5000) {
      recommendation =
        "This meeting is expensive. Ensure all attendees are necessary.";
    } else if (agenda.length < 20) {
      recommendation =
        "Agenda lacks detail. Consider clarifying meeting objectives.";
    } else {
      recommendation = "Meeting appears worthwhile.";
    }

    res.status(200).json({
      success: true,
      totalCost,
      recommendation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const saveMeeting = async (req, res) => {
  try {
    const {
      meetingName,
      duration,
      agenda,
      attendees,
      totalCost,
      recommendation,
    } = req.body;

    const meeting = await Meeting.create({
      meetingName,
      duration,
      agenda,
      attendees,
      totalCost,
      recommendation,
    });

    res.status(201).json({
      success: true,
      meeting,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      meetings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  calculateMeetingCost,
  saveMeeting,
  getMeetings,
};
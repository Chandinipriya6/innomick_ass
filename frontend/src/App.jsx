import axios from "axios";
import { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [meetingName, setMeetingName] = useState("");
  const [duration, setDuration] = useState("");
  const [agenda, setAgenda] = useState("");
  const [result, setResult] = useState(null);
const [saveMessage, setSaveMessage] = useState("");
const [history, setHistory] = useState([]);
const [showHistory, setShowHistory] = useState(false);

useEffect(() => {
  fetchHistory();
}, []);

  const [attendees, setAttendees] = useState([
    {
      name: "",
      hourlyRate: "",
    },
  ]);

  const addAttendee = () => {
    setAttendees([
      ...attendees,
      {
        name: "",
        hourlyRate: "",
      },
    ]);
  };

  const removeAttendee = (index) => {
    if (attendees.length === 1) return;

    const updated = attendees.filter((_, i) => i !== index);
    setAttendees(updated);
  };

  const handleAttendeeChange = (index, field, value) => {
    const updated = [...attendees];
    updated[index][field] = value;
    setAttendees(updated);
  };

  const handleCalculate = async () => {
    try {
      const response = await axios.post("/api/meetings/calculate", {
        meetingName,
        duration,
        agenda,
        attendees,
      });

      setResult(response.data);
    } catch (error) {
      console.log(error);
      alert("Calculation failed");
    }
  };

  const attendeeCount = attendees.length;

  const handleSave = async () => {
  try {
    if (!result) {
      alert("Calculate first");
      return;
    }

    await axios.post("/api/meetings/save", {
      meetingName,
      duration,
      agenda,
      attendees,
      totalCost: result.totalCost,
      recommendation: result.recommendation,
    });

    setSaveMessage("Meeting saved successfully");
  } catch (error) {
    console.log(error);
  }
  fetchHistory();
};

const fetchHistory = async () => {
  try {
    const response = await axios.get(
      "/api/meetings/history"
    );

    setHistory(response.data.meetings);
  } catch (error) {
    console.log(error);
  }
};

const handleDelete = async (id) => {
  try {
    await axios.delete(
      `/api/meetings/${id}`
    );

    fetchHistory();
  } catch (error) {
    console.log(error);
  }
};


  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1>Meeting Cost Intelligence</h1>
          <p>
            Analyze meeting expenses before scheduling and make
            smarter decisions.
          </p>
        </div>

        <div className="stats">
          <div className="stat-box">
            <h3>{attendeeCount}</h3>
            <span>Attendees</span>
          </div>

          <div className="stat-box">
            <h3>{duration || 0}</h3>
            <span>Minutes</span>
          </div>

          <div className="stat-box">
            <h3>
              ₹
              {result
                ? result.totalCost
                : 0}
            </h3>
            <span>Estimated Cost</span>
          </div>
        </div>

        <label>Meeting Name</label>
        <input
          type="text"
          placeholder="Enter meeting name"
          value={meetingName}
          onChange={(e) => setMeetingName(e.target.value)}
        />

        <label>Duration (Minutes)</label>
        <input
          type="number"
          placeholder="Enter duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <h2 className="section-title">
          👥 Attendees
        </h2>

        {attendees.map((attendee, index) => (
          <div className="attendee-row" key={index}>
            <input
              type="text"
              placeholder="Name"
              value={attendee.name}
              onChange={(e) =>
                handleAttendeeChange(
                  index,
                  "name",
                  e.target.value
                )
              }
            />

            <input
              type="number"
              placeholder="Hourly Rate"
              value={attendee.hourlyRate}
              onChange={(e) =>
                handleAttendeeChange(
                  index,
                  "hourlyRate",
                  e.target.value
                )
              }
            />

            <button
              className="remove-btn"
              onClick={() => removeAttendee(index)}
            >
              ✕
            </button>
          </div>
        ))}

        <button
          className="add-btn"
          onClick={addAttendee}
        >
          + Add Attendee
        </button>

        <label>Meeting Agenda</label>
        <textarea
          rows="5"
          placeholder="Describe the meeting agenda..."
          value={agenda}
          onChange={(e) => setAgenda(e.target.value)}
        />

        <button
          className="calculate-btn"
          onClick={handleCalculate}
        >
          Calculate Meeting Cost
        </button>
<button
  className="save-btn"
  onClick={handleSave}
>
  Save Meeting
</button>

<button
  className="history-btn"
  onClick={() => setShowHistory(!showHistory)}
>
  {showHistory
    ? "Hide History"
    : "📚 View History"}
</button>

{result && (
  <div className="result-card">
    <h2>📊 Meeting Analysis</h2>

    <div className="cost">
      ₹{result.totalCost}
    </div>

    <div className="status">
      {result.totalCost < 2000 && (
        <span className="low">
          🟢 Cost Effective
        </span>
      )}

      {result.totalCost >= 2000 &&
        result.totalCost < 5000 && (
          <span className="medium">
            🟡 Moderate Cost
          </span>
        )}

      {result.totalCost >= 5000 && (
        <span className="high">
          🔴 Expensive
        </span>
      )}
    </div>

    <p>{result.recommendation}</p>
  </div>
)}

{showHistory && (
  <div className="history-section">

    <h2>📚 Meeting History</h2>

    {history.length === 0 ? (
      <p>No meetings saved yet.</p>
    ) : (
      history.map((meeting) => (
        <div
          key={meeting._id}
          className="history-card"
        >
          <div className="history-header">

            <div>
              <h3>
                {meeting.meetingName}
              </h3>

              <p>
                Cost: ₹{meeting.totalCost}
              </p>

              <p>
                {meeting.recommendation}
              </p>
            </div>

            <button
              className="delete-history-btn"
              onClick={() =>
                handleDelete(meeting._id)
              }
            >
              Delete
            </button>

          </div>
        </div>
      ))
    )}

  </div>
)}
 
      </div>
    </div>
  );
}

export default App;
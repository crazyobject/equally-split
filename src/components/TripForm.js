import React, { useRef, useState, useEffect } from "react";
import "./TripForm.css"; // Import custom CSS file
import AlertMessage from "./shared/AlertMessage";

function TripForm({ onTripDataSubmit }) {
  const [tripName, setTripName] = useState("");
  const [participants, setParticipants] = useState([]);
  const [participantInput, setParticipantInput] = useState("");
  const [error, setError] = useState("");
  const tripNameRef = useRef(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (tripNameRef.current) {
      tripNameRef.current.focus();
    }

    // Optional: Clean-up function if needed when the component unmounts
    return () => {
      console.log("Component will unmount.");
    };
  }, []); // Empty dependency array ensures this runs only once

  const handleAddParticipant = () => {
    if (participantInput.trim() === "") {
      setError("Participant's name cannot be empty.");
      return;
    }
    if (participants.includes(participantInput.trim())) {
      setError("Participant already exists.");
      return;
    }
    setParticipants([...participants, participantInput.trim()]);
    setParticipantInput("");
    setError(""); // Clear error if valid participant is added

    // Optional: Move the focus to the participant input field
    if (nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRemoveParticipant = (index) => {
    const newParticipants = participants.filter((_, i) => i !== index);
    setParticipants(newParticipants);
    // Clear error if we have enough participants after removal
    if (newParticipants.length >= 2 && error) {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (participants.length < 2) {
      setError("At least two participants are required.");
      return;
    }
    setError(""); // Clear error if validation passes
    onTripDataSubmit({ tripName, participants });
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="p-4 commonBlueBg shadow-sm">
        <h2 className="text-center mb-4">Step 1: Enter Trip Details</h2>{" "}
        {/* Moved here */}
        <div className="mb-3">
          <label className="form-label">Trip Name</label>
          <input
            type="text"
            id="tripname"
            ref={tripNameRef} // Attach ref here
            placeholder="e.g. Lonavala, Mahabaleshwar road trip"
            className="form-control form-control-lg"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Add Participants</label>
          <div className="d-flex align-items-center">
            <input
              type="text"
              ref={nameInputRef} // Attach ref here
              className="form-control me-2"
              value={participantInput}
              onChange={(e) => setParticipantInput(e.target.value)}
              placeholder="Enter participant's name"
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddParticipant}
            >
              Add
            </button>
          </div>
          {error && <AlertMessage message={error} type="danger mt-3" />}
          <ul className="list-group mt-3">
            {participants.map((participant, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {participant}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveParticipant(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          id="next"
          type="submit"
          className="btn btn-success btn-lg w-100"
        >
          Next
        </button>
      </form>
    </div>
  );
}

export default TripForm;

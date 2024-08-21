import React, { useState } from "react";

function Participants({ participants, addParticipant, removeParticipant }) {
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (name.trim() !== "") {
      addParticipant(name);
      setName("");
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label">Participants</label>
      <div className="d-flex mb-2">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter participant's name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          Add
        </button>
      </div>
      <ul className="list-group">
        {participants.map((participant, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {participant}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeParticipant(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Participants;

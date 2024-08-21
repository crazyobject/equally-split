// src/components/SplitResult.js
import React, { useState } from "react";

const newTripButtonStyle = {
  backgroundColor: "#FFA500", // Light Orange
  border: "2px solid #FF8C00", // Darker Orange
  color: "white",
  fontWeight: "bold",
  width: "150px",
  fontSize: "16px",
  borderRadius: "5px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
};

/* const newTripButtonHoverStyle = {
  backgroundColor: "#FF8C00", // Darker Orange
  boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
  transform: "translateY(-2px)",
}; */

function SplitResult({ participants, expenses }) {
  const [splitDetails, setSplitDetails] = useState([]);

  const newTrip = () => {
    localStorage.removeItem("expenses");
    localStorage.removeItem("tripData");
    window.location.href = window.location.href;
  };
  const calculateSplit = () => {
    const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);
    const amountPerPerson = totalExpenses / participants.length;

    const balances = participants.map((participant) => {
      const totalSpent = expenses
        .filter((exp) => exp.participant === participant)
        .reduce((acc, exp) => acc + exp.amount, 0);

      return {
        participant,
        balance: totalSpent - amountPerPerson,
      };
    });

    const sortedBalances = balances.sort((a, b) => a.balance - b.balance);

    const finalSettlements = [];
    let i = 0;
    let j = sortedBalances.length - 1;

    while (i < j) {
      const amountToSettle = Math.min(
        -sortedBalances[i].balance,
        sortedBalances[j].balance
      );
      finalSettlements.push(
        `${sortedBalances[i].participant} pays ${
          sortedBalances[j].participant
        } :- ${amountToSettle.toFixed(2)}`
      );
      sortedBalances[i].balance += amountToSettle;
      sortedBalances[j].balance -= amountToSettle;

      if (sortedBalances[i].balance === 0) i++;
      if (sortedBalances[j].balance === 0) j--;
    }

    setSplitDetails(finalSettlements);
  };

  return (
    <div className="container mt-4">
      <h2>Step 3: Split Result</h2>
      <button className="btn btn-success mb-2" onClick={calculateSplit}>
        Calculate Split
      </button>
      <button
        className="btn btn-primary ms-2 special-new-trip-btn mb-2"
        onClick={newTrip}
        style={newTripButtonStyle}
      >
        New trip
      </button>
      {splitDetails.length > 0 && (
        <div>
          <h4>Final Settlements</h4>
          <ul className="list-group">
            {splitDetails.map((settlement, index) => (
              <li key={index} className="list-group-item">
                {settlement}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SplitResult;

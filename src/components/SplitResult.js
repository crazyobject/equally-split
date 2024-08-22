import React, { useState, useRef } from "react";

function SplitResult({ participants, expenses }) {
  const [splitDetails, setSplitDetails] = useState([]);

  const newTrip = () => {
    localStorage.removeItem("expenses");
    localStorage.removeItem("tripData");
    window.location.href = window.location.href;
  };

  const calculateSplit = () => {
    setTimeout(() => {
      const element = document.getElementById("bottom");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 6000);
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
    <div className="container mt-4 commonBlueBg">
      <h2 className="mb-4">Step 3: Split Result</h2>
      <button className="btn btn-success me-2 mb-2" onClick={calculateSplit}>
        Calculate Split
      </button>
      <button className="btn btn-warning mb-2" onClick={newTrip}>
        New trip
      </button>
      {splitDetails.length > 0 && (
        <div className="mt-4">
          <h4>Final Settlements</h4>
          <ul className="list-group mt-2 text-capitalize">
            {splitDetails.map((settlement, index) => (
              <li key={index} className="list-group-item">
                {settlement}
              </li>
            ))}
          </ul>
          <div id="bottom"></div>
        </div>
      )}
    </div>
  );
}

export default SplitResult;

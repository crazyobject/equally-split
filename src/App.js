// src/App.js
import React, { useState, useEffect } from "react";
import TripForm from "./components/TripForm";
import ExpenseForm from "./components/ExpenseForm";
import SplitResult from "./components/SplitResult";

function App() {
  const [tripData, setTripData] = useState(null);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("tripData"));
    if (savedData) {
      setTripData(savedData);
      setExpenses(savedData.expenses || []);
    }
  }, []);

  useEffect(() => {
    if (tripData) {
      localStorage.setItem("tripData", JSON.stringify(tripData));
    }
  }, [tripData]);

  const handleTripDataSubmit = (data) => {
    setTripData(data);
  };

  const handleExpensesSubmit = (newExpenses) => {
    setExpenses(newExpenses);
    setTripData((prevData) => ({ ...prevData, expenses: newExpenses }));
  };

  return (
    <div className="App">
      {!tripData ? (
        <TripForm onTripDataSubmit={handleTripDataSubmit} />
      ) : (
        <>
          <ExpenseForm
            participants={tripData.participants}
            onExpensesSubmit={handleExpensesSubmit}
          />
          <SplitResult
            participants={tripData.participants}
            expenses={expenses}
          />
        </>
      )}
    </div>
  );
}

export default App;

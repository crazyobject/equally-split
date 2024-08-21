// src/components/ExpenseForm.js
import React, { useState, useEffect } from "react";

function ExpenseForm({ participants, onExpensesSubmit }) {
  const [expenses, setExpenses] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseComment, setExpenseComment] = useState("");
  const [showExpenses, setShowExpenses] = useState(true);

  // Load expenses from local storage on component mount
  useEffect(() => {
    debugger;
    const savedExpenses = JSON.parse(localStorage.getItem("expenses"));
    if (savedExpenses) {
      setExpenses(savedExpenses);
    }
  }, []);

  // Save expenses to local storage whenever they change
  useEffect(() => {
    if (expenses.length > 0)
      localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = () => {
    if (selectedParticipant && expenseAmount) {
      const newExpenses = [
        ...expenses,
        {
          participant: selectedParticipant,
          amount: parseFloat(expenseAmount),
          comment: expenseComment,
        },
      ];
      setExpenses(newExpenses);
      setSelectedParticipant("");
      setExpenseAmount("");
      setExpenseComment("");
      onExpensesSubmit(newExpenses); // Update the parent component with new expenses
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onExpensesSubmit(expenses);
  };

  return (
    <div className="container mt-4">
      <h2>Step 2: Enter Expenses</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select Participant</label>
          <select
            className="form-select"
            value={selectedParticipant}
            onChange={(e) => setSelectedParticipant(e.target.value)}
            required
          >
            <option value="">Choose...</option>
            {participants.map((participant, index) => (
              <option key={index} value={participant}>
                {participant}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Expense Amount</label>
          <input
            type="number"
            className="form-control"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Comment</label>
          <input
            type="text"
            className="form-control"
            value={expenseComment}
            onChange={(e) => setExpenseComment(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddExpense}
        >
          Add Expense
        </button>
        <button
          type="button"
          className="btn btn-info ms-2"
          onClick={() => setShowExpenses(!showExpenses)}
        >
          {showExpenses ? "Hide Expenses" : "Show Expenses"}
        </button>
      </form>
      {showExpenses && (
        <div>
          <h3 className="mt-4">Expenses</h3>
          <ul className="list-group">
            {expenses.map((expense, index) => (
              <li key={index} className="list-group-item">
                {expense.participant} spent ${expense.amount.toFixed(2)} -{" "}
                {expense.comment}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ExpenseForm;

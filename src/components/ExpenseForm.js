import React, { useState, useEffect } from "react";
import AlertMessage from "./shared/AlertMessage";

function ExpenseForm({ participants, onExpensesSubmit }) {
  const [expenses, setExpenses] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseComment, setExpenseComment] = useState("");
  const [showExpenses, setShowExpenses] = useState(true);

  // Error state variables
  const [participantError, setParticipantError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [commentError, setCommentError] = useState("");

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses"));
    if (savedExpenses) {
      setExpenses(savedExpenses);
    }
  }, []);

  useEffect(() => {
    if (expenses.length > 0)
      localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const validateFields = () => {
    let isValid = true;

    // Validate Participant
    if (!selectedParticipant) {
      setParticipantError("Please select a participant.");
      isValid = false;
    } else {
      setParticipantError("");
    }

    // Validate Amount
    if (!expenseAmount) {
      setAmountError("Please enter an amount.");
      isValid = false;
    } else if (parseFloat(expenseAmount) <= 0) {
      setAmountError("Amount must be greater than zero.");
      isValid = false;
    } else {
      setAmountError("");
    }

    // Validate Comment
    if (!expenseComment.trim()) {
      setCommentError("Please enter a comment.");
      isValid = false;
    } else {
      setCommentError("");
    }

    return isValid;
  };

  const handleAddExpense = () => {
    if (validateFields()) {
      const newExpenses = [
        ...expenses,
        {
          participant: selectedParticipant,
          amount: parseFloat(expenseAmount),
          comment: expenseComment.trim(),
          date: new Date().toLocaleString(),
        },
      ];
      setExpenses(newExpenses);
      setSelectedParticipant("");
      setExpenseAmount("");
      setExpenseComment("");
      onExpensesSubmit(newExpenses);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onExpensesSubmit(expenses);
  };

  // Calculate the total expenses
  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <div className="container mt-4 commonBlueBg">
      <h2 className="mb-4">Step 2: Enter Expenses</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <select
            className={`form-select ${participantError ? "is-invalid" : ""}`}
            value={selectedParticipant}
            onChange={(e) => setSelectedParticipant(e.target.value)}
          >
            <option value="">Choose participant...</option>
            {participants.map((participant, index) => (
              <option key={index} value={participant}>
                {participant}
              </option>
            ))}
          </select>
          {participantError && (
            <div className="invalid-feedback">{participantError}</div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="number"
            className={`form-control ${amountError ? "is-invalid" : ""}`}
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            min="0"
            step="0.01"
            placeholder="Enter amount"
          />
          {amountError && <div className="invalid-feedback">{amountError}</div>}
        </div>
        <div className="mb-3">
          <input
            type="text"
            className={`form-control ${commentError ? "is-invalid" : ""}`}
            value={expenseComment}
            onChange={(e) => setExpenseComment(e.target.value)}
            placeholder="Enter description. e.g. petrol, snacks"
          />
          {commentError && (
            <div className="invalid-feedback">{commentError}</div>
          )}
        </div>
        <button
          type="button"
          className="btn btn-primary me-2"
          onClick={handleAddExpense}
        >
          Add Expense
        </button>
        {totalExpense > 0 ? (
          <button
            type="button"
            className="btn btn-info"
            onClick={() => setShowExpenses(!showExpenses)}
          >
            {showExpenses ? "Hide Expenses" : "Show Expenses"}
          </button>
        ) : (
          <></>
        )}
      </form>
      {showExpenses && totalExpense > 0 && (
        <div className="mt-4">
          <h3>Expenses - Total: {totalExpense.toFixed(2)}</h3>
          {expenses.length === 0 ? (
            <AlertMessage
              message='No expenses added yet. Start adding by clicking "Add Expense".'
              type="info"
            />
          ) : (
            <ul className="list-group mt-2">
              {expenses.map((expense, index) => (
                <li
                  key={index}
                  className={`list-group-item text-capitalize ${
                    index % 2 === 0
                      ? "list-group-item-light"
                      : "list-group-item-secondary"
                  }`}
                >
                  {expense.participant} spent :- {expense.amount.toFixed(2)} -{" "}
                  <span className="text-muted small text-capitalize">
                    {expense.comment}
                  </span>
                  <span className="float-end text-muted small">
                    {expense.date}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default ExpenseForm;

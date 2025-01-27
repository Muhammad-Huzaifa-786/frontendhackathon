import React, { useState } from "react";
import "./styles.css"; // Import external CSS

const LoanCalculator = () => {
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");
  const [average, setAverage] = useState(null);

  const calculateAverage = () => {
    if (amount && months && months > 0) {
      const avg = parseFloat(amount) / parseInt(months, 10);
      setAverage(avg.toFixed(2));
    } else {
      setAverage(null);
      alert("Please enter valid amount and months.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Loan Calculator</h1>

      <div className="input-group">
        <label htmlFor="amount" className="label">
          Loan Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
          placeholder="Enter loan amount"
        />
      </div>

      <div className="input-group">
        <label htmlFor="months" className="label">
          Number of Months
        </label>
        <input
          type="number"
          id="months"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          className="input"
          placeholder="Enter number of months"
        />
      </div>

      <button
        onClick={calculateAverage}
        className="button"
      >
        Calculate
      </button>

      {average !== null && (
        <div className="result">
          <h2 className="result-title">Average Monthly Payment</h2>
          <p className="result-value">{average}</p>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;

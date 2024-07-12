import React from "react";
import { Progress } from "antd";
import "./Analytics.css";

const Analytics = ({ allTransaction, walletBalance }) => {
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "tax",
  ];

  const transactionCount = allTransaction.length;
  const incomeTransactions = allTransaction.filter(
    (txn) => txn.type === "income"
  );
  const expenseTransactions = allTransaction.filter(
    (txn) => txn.type === "expense"
  );

  const incomePercent = ((incomeTransactions.length / transactionCount) * 100).toFixed(0);
  const expensePercent = ((expenseTransactions.length / transactionCount) * 100).toFixed(0);

  const totalAmount = allTransaction.reduce(
    (acc, txn) => acc + txn.amount, 0
  );
  const incomeTotal = incomeTransactions.reduce((acc, txn) => acc + txn.amount, 0);
  const expenseTotal = expenseTransactions.reduce((acc, txn) => acc + txn.amount, 0);
  
  const incomePercentage = ((incomeTotal / totalAmount) * 100).toFixed(0);
  const expensePercentage = ((expenseTotal / totalAmount) * 100).toFixed(0);

  // Calculate total amount left in wallet
  const totalLeftInWallet = walletBalance - expenseTotal;

  return (
    <>
      <div className="analytics-summary">
        <div className="summary-card">
          <div className="summary-header">
            Total Transactions: {transactionCount}
          </div>
          <div className="summary-body">
            <div className="transaction-counts">
              <h5 className="income-text">
                Income: {incomeTransactions.length}
              </h5>
              <h5 className="expense-text">
                Expense: {expenseTransactions.length}
              </h5>
            </div>
            <div className="transaction-progress">
              <Progress
                type="circle"
                strokeColor="green"
                className="progress-circle"
                percent={incomePercent}
              />
              <Progress
                type="circle"
                strokeColor="red"
                className="progress-circle"
                percent={expensePercent}
              />
            </div>
            <div className="progress-title">
              <h4>Income vs Expense</h4>
            </div>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-header">
            Total Amount: {totalAmount}
          </div>
          <div className="summary-body">
            <div className="transaction-counts">
              <h5 className="income-text">
                Total Income: {incomeTotal}
              </h5>
              <h5 className="expense-text">
                Total Expense: {expenseTotal}
              </h5>
            </div>
            <div className="transaction-progress">
              <Progress
                type="circle"
                strokeColor="green"
                className="progress-circle"
                percent={incomePercentage}
              />
              <Progress
                type="circle"
                strokeColor="red"
                className="progress-circle"
                percent={expensePercentage}
              />
            </div>
            <div className="progress-title">
              <h4>Turnover Analysis</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="wallet-summary mt-3">
        <h4>Total Amount Left in Wallet: {totalLeftInWallet}</h4>
      </div>

      <div className="category-analysis row mt-3">
        <div className="col-md-5">
          <h4>Income by Category</h4>
          {categories.map((cat) => {
            const categoryIncome = allTransaction
              .filter((txn) => txn.type === "income" && txn.category === cat)
              .reduce((acc, txn) => acc + txn.amount, 0);
            return (
              categoryIncome > 0 && (
                <div className="category-card" key={cat}>
                  <div className="card-body">
                    <h5>{cat}</h5>
                    <Progress
                      percent={((categoryIncome / incomeTotal) * 100).toFixed(0)}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="col-md-5">
          <h4>Expense by Category</h4>
          {categories.map((cat) => {
            const categoryExpense = allTransaction
              .filter((txn) => txn.type === "expense" && txn.category === cat)
              .reduce((acc, txn) => acc + txn.amount, 0);
            return (
              categoryExpense > 0 && (
                <div className="category-card" key={cat}>
                  <div className="card-body">
                    <h5>{cat}</h5>
                    <Progress
                      percent={((categoryExpense / expenseTotal) * 100).toFixed(0)}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Analytics;

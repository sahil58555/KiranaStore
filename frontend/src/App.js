import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const domain = "https://kirana-store.onrender.com";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    type: 'credit',
    currency: 'INR'
  });
  const [dailyReport, setDailyReport] = useState([]);
  const [monthlyReport, setMonthlyReport] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${domain}/api/transactions`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${domain}/api/transactions`, formData);
      fetchTransactions();
      setFormData({
        amount: '',
        description: '',
        type: 'credit',
        currency: 'INR',
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const fetchDailyReport = async () => {
    try {
      const response = await axios.get(`${domain}/api/transactions/daily`);
      setDailyReport(response.data);
    } catch (error) {
      console.error('Error fetching daily report:', error);
    }
  };

  const fetchMonthlyReport = async () => {
    try {
      const response = await axios.get(`${domain}/api/transactions/monthly`);
      setMonthlyReport(response.data);
    } catch (error) {
      console.error('Error fetching monthly report:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Transaction Manager</h1>
      </header>
      <main>
        <div className="transaction-form">
          <h2>Add Transaction</h2>
          <form onSubmit={handleFormSubmit}>
            <label>
              Amount:
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Type:
              <select name="type" value={formData.type} onChange={handleInputChange}>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </label>
            <label>
              Currency:
              <select name="currency" value={formData.currency} onChange={handleInputChange}>
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </select>
            </label>
            <button type="submit">Add Transaction</button>
          </form>
        </div>

        <div className="transaction-list">
          <h2>All Transactions</h2>
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className={transaction.type}>
                <span style={{ order: 1 }}>{transaction.amount} INR {transaction.type}</span>
                <span style={{ order: 2 }}>{transaction.description}</span>
              </li>         
            ))}
          </ul>
        </div>

        <div className="report-section">
          <div className="report-buttons">
            <button onClick={fetchDailyReport}>Fetch Daily Report</button>
            <button onClick={fetchMonthlyReport}>Fetch Monthly Report</button>
          </div>
          
          {
            dailyReport.length > 0 && <div >
            <h2>Daily Report</h2>
            <ul>
            {dailyReport.map((entry) => (
  <li key={entry._id} className={entry.type} style={{ margin: '10px 0' }}>
    {`${entry.description}: ${entry.amount} ${entry.date}`}
  </li>
))}
            </ul>
          </div>
          }
          
          {
            monthlyReport.length > 0 && <div>
            <h2>Monthly Report</h2>
            <ul>
              {monthlyReport.map((entry) => (
                <li key={entry._id} className={entry.type}>{`${entry.description}: ${entry.amount}`}</li>
              ))}
            </ul>
          </div>
          }
          
    
        </div>
      </main>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import BasicTable from './componenets/Table';
import DailyBarChart from './componenets/DailyBarChart';
import NavBar from './componenets/NavBar';

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
      <NavBar />
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
          <BasicTable rows={transactions} />
        </div>

        <div className="report-section">
          <div className="report-buttons">
            <button onClick={fetchDailyReport}>Fetch Daily Report</button>
            <button onClick={fetchMonthlyReport}>Fetch Monthly Report</button>
          </div>
          {
            dailyReport.length > 0 && <div>
                <div >
                          <h2>Daily Report</h2>
                          <BasicTable rows={dailyReport} />
                </div> 
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
                    <DailyBarChart data={dailyReport} />
                </div>
              
            </div>
          }
          
          {
            monthlyReport.length > 0 && <div>
            <div>
                      <h2 style={{margin: '50px'}}> Monthly Report</h2>
                      <BasicTable rows={monthlyReport} />
            </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> 
                    <DailyBarChart data={monthlyReport} />
                </div>

            </ div>    
          }
          
          
        </div>
      </main>
    </div>
  );
}

export default App;

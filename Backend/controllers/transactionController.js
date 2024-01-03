const Transaction = require('../models/Transaction');

// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { description, type, currency } = req.body;
    let amount = req.body.amount;

    if(currency === 'USD') {
      amount *= 83.324635724;
    }

    const transaction = new Transaction({ amount, description, type, currency:'INR' });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getDailyReport = async (req, res) => {
  try {
    const date = new Date();
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

    const dailyTransactions = await Transaction.find({
      date: { $gte: startOfDay, $lt: endOfDay },
    });

    res.json(dailyTransactions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get monthly transactions
exports.getMonthlyReport = async (req, res) => {
  try {
    const date = new Date();
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const monthlyTransactions = await Transaction.find({
      date: { $gte: startOfMonth, $lt: endOfMonth },
    });

    res.json(monthlyTransactions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

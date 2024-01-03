const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Get all transactions
router.get('/', transactionController.getAllTransactions);

// Create a new transaction
router.post('/', transactionController.createTransaction);

// Get daily transactions
router.get('/daily', transactionController.getDailyReport);

// Get monthly transactions
router.get('/monthly', transactionController.getMonthlyReport);

module.exports = router;

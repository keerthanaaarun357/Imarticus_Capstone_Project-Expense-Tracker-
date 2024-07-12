const express = require('express');
const { addTransaction, getAllTransaction, editTransaction, deleteTransaction } = require('../functions/transactionFn');


const router = express.Router();

router.post('/add-transaction', addTransaction);

router.post('/edit-transaction', editTransaction);

router.post('/delete-transaction', deleteTransaction);

router.get('/get-transaction', getAllTransaction);

module.export = router;

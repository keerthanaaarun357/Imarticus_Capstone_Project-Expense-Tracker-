const express = require('express');
const { addTransaction, getAllTransaction, editTransaction, deleteTransaction } = require('../controllers/transactionCtrl');


// router object
const router = express.Router();

//routes
//add transaction
router.post('/add-transaction', addTransaction);

router.post('/edit-transaction', editTransaction);

router.post('/delete-transaction', deleteTransaction);

//get transaction
router.get('/get-transaction', getAllTransaction);

module.export = router;
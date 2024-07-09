const express = require('express');
const { addTransaction, getAllTransaction } = require('../controllers/transactionCtrl');


// router object
const router = express.Router();

//routes
//add transaction
router.post('/add-transaction', addTransaction);

//get transaction
router.get('/get-transaction', getAllTransaction);

module.export = router;
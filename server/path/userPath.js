const express = require('express');
const { loginController, registerController } = require('../functions/userFunctions');

const router = express.Router();

router.post('/login/', loginController);

router.post('/register/', registerController);
router.post('/', registerController);
module.exports = router; // Correct export syntax

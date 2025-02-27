const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./configuration/connectDatabase');
const path = require("path");

dotenv.config(); 

connectDb();

const app = express(); 

// Middleware setup
app.use(morgan('dev')); 
app.use(cors()); 
app.use(express.json()); 

// Routes
app.use('/api/v1/users', require("./path/userPath")); // User routes
app.use('/api/v1/transactions', require("./path/transactionPath")); 

// Serve static files (for client-side application)
app.use(express.static(path.join(__dirname, "../client/src")));

// Catch-all route to serve the client-side application's index.html
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/src/index.js"));
});

const PORT = process.env.PORT || 8000; 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

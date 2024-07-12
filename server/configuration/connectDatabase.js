const mongoose = require('mongoose');
const chalk = require('chalk');

const initializeDatabaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(chalk.bgCyan.white(`Connected to MongoDB at ${mongoose.connection.host}`));
    } catch (err) {
        console.error(chalk.bgRed(`Connection error: ${err}`));
    }
};

module.exports = initializeDatabaseConnection;

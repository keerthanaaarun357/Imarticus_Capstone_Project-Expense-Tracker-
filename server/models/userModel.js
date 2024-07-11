const mongoose = require('mongoose');

// Schema design
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            index: true // Optional: Add an index for quicker lookup (not required)
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        }
    }, 
    { timestamps: true }
);

// Export the model
const userModel = mongoose.model('users', userSchema);
module.exports = userModel; // Correct export statement

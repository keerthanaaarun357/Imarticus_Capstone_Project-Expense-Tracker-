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
            index: true 
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        confirmPassword: {
            type: String,
            required: [true, 'Confirm your password']
        },
        terms: {
            type: Boolean,
            required: [true, 'Please accept the terms and conditions']
        }
    }, 
    { timestamps: true }
);

// Export the model
const userModel = mongoose.model('users', userSchema);
module.exports = userModel; // Correct export statement

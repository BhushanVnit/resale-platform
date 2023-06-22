const mongoose = require('mongoose');
// const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User must have a name'],
    },
    username: {
        type: Number,
        required: [true, 'User must have a username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'User must have a email'],
        lowercase: true
    },
    department: {
        type: String,
    },
    yearOfStudy: {
        type: String,
    },
    photo: {
        type: String,

    },
    password: {
        type: String,
        required: [true, 'User must have a password'],
        minlength: 8,
        select: false
    },
    mobileNo: {
        type: Number,
    },
    timeAtCreate: {
        type: Date,
        default: Date.now()
    }

});

// checking for changed password

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// creating jsonwebtoken

userSchema.methods.getJwtToken = function () {

    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {

      expiresIn: process.env.JWT_EXPIRE,

    });
  };
  

userSchema.methods.correctPassword = async function (password, originalPassword) {

    return await bcrypt.compare(password, originalPassword);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
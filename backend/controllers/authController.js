const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

JWT_SECRET = process.env.JWT_SECRET;

const signToken = id => {
    return jwt.sign({ id }, JWT_SECRET,
        {
            expiresIn: "20s"
        });
};

exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        const token = signToken(newUser._id);
        res.cookie('token', token, { httpOnly: true });
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        })
    }
    catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        // 2) Check if user exists && password is correct
        const user = await User.findOne({ username }).select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.send({ message: 2 });//invalid credentials
        }
        // 3) If everything ok, send token to client
        const token = signToken(user._id);
        res.send({
            message: "1",
            token: token
        })
    } catch (err) {
        res.send({ message: 2 });
    }
}

exports.jwtVerify = async (req, res, next) => {

    const userToken = req.body.token;
    try {
        var decoded = await jwt.verify(userToken, JWT_SECRET);
        if (decoded) {
            res.send({
                message: 1,
                id: decoded.id
            });
        }
    } catch (err) {
        res.send({ message: 0 });
    }
}
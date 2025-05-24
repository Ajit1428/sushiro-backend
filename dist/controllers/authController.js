"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCode = exports.signup = void 0;
const User_1 = require("../models/User");
const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, birthDate, gender } = req.body;
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User with this email already exists' });
            return;
        }
        console.log(req.body);
        const user = new User_1.User({
            firstName,
            lastName,
            email,
            password,
            dateOfBirth: birthDate,
            gender,
        });
        await user.save();
        const { password: _, ...userResponse } = user.toObject();
        res.status(201).json({
            message: 'User created successfully',
            user: userResponse,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error creating user',
            error: error.message,
        });
    }
};
exports.signup = signup;
const saveCode = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;
        if (!email || !verificationCode) {
            res.status(400).json({ message: 'Email and verification code are required' });
            return;
        }
        const user = await User_1.User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        user.verificationCode = verificationCode;
        user.verificationCodeExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await user.save();
        res.status(200).json({
            message: 'Verification code saved successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error saving verification code',
            error: error.message
        });
    }
};
exports.saveCode = saveCode;
//# sourceMappingURL=authController.js.map
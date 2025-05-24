"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.saveCode = exports.signup = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, birthDate, gender } = req.body;
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User with this email already exists' });
            return;
        }
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
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required' });
            return;
        }
        const user = await User_1.User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
        const { password: _, ...userResponse } = user.toObject();
        res.status(200).json({
            message: 'Login successful',
            user: userResponse,
            token,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error during login',
            error: error.message,
        });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map
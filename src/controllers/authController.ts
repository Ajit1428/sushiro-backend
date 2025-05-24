import { Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, birthDate, gender } = req.body;


    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User with this email already exists' });
      return
    }

    // Create new user
    const user = new User({
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
  } catch (error: any) {
    res.status(500).json({
        message: 'Error creating user',
        error: error.message,
      });
  }
};


export const saveCode = async (req: Request, res: Response) => {
  try {
    const { email, verificationCode } = req.body;

    if (!email || !verificationCode) {
      res.status(400).json({ message: 'Email and verification code are required' });
      return
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return
    }

    // Save the verification code
    user.verificationCode = verificationCode;
    user.verificationCodeExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
    await user.save();

    res.status(200).json({
      message: 'Verification code saved successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error saving verification code',
      error: error.message
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }


    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...userResponse } = user.toObject();

    res.status(200).json({
      message: 'Login successful',
      user: userResponse,
      token,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Error during login',
      error: error.message,
    });
  }
}; 
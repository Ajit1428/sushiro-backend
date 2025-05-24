import { Request, Response } from 'express';
import { User } from '../models/User';

export const signup = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, dateOfBirth, gender } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      res.status(400).json({ message: 'Passwords do not match' });
      return
    }

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
      dateOfBirth: new Date(dateOfBirth),
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
    const { email, code } = req.body;

    if (!email || !code) {
      res.status(400).json({ message: 'Email and verification code are required' });
      return
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return
    }

    // Save the verification code
    user.verificationCode = code;
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
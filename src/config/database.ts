import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI ?? '';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('📦 Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

// Handle application termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error during MongoDB disconnection:', err);
    process.exit(1);
  }
}); 
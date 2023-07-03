import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    const MONGO_URI =
      process.env.MONGO_URI || 'mongodb://localhost:27017/connect_plus';
    mongoose.connect(MONGO_URI);
    console.log('Connected to the database!');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
};

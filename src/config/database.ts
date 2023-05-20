import mongoose from 'mongoose';
import ErrorHandler from '../utils/errorHandler';

const connectDatabase = () => {
  const dbURI = process.env.DB_URI;

  if (!dbURI) {
    return new ErrorHandler('invalid email or password', 404);
  }

  mongoose
    .connect(dbURI)
    .then(() => {
      console.log('db is connected');
    })
    .catch((error) => {
      console.error('Error connecting to the database:', error);
    });
};

export default connectDatabase;

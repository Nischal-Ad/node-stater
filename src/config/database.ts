import mongoose, { ConnectOptions } from 'mongoose';
import ErrorHandler from '../utils/errorHandler';

const connectDatabase = async () => {
  try {
    const dbURI = process.env.DB_URI;

    const options: ConnectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.MongooseOptions;

    if (!dbURI) {
      return new ErrorHandler('there is noo database', 404);
    }

    await mongoose.connect(dbURI, options);
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};

export default connectDatabase;

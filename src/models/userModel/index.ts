import mongoose, { Model, Schema } from 'mongoose';
import validator from 'validator';
import { IUser } from './user.model';

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter your name'],
    minLength: [4, 'name must be at least 4 characters'],
    maxLength: [20, 'name cannot exceed 20 characters'],
  },
  email: {
    type: String,
    required: [true, 'please enter your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'please enter your password'],
    select: false,
  },
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;

import { InferSchemaType, Schema, model } from 'mongoose'
import validator from 'validator'
import _ from 'lodash'

export type TUser = Partial<InferSchemaType<typeof userSchema>> & {
  _id: string
  cpassword: string
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'please enter your name'],
      minLength: [4, 'name must be at least 4 characters'],
      maxLength: [20, 'name cannot exceed 20 characters'],
      set: (val: string) => _.capitalize(val),
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
      required: [true, 'Please enter your password'],
      select: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'] as const,
        message: 'please enter a valid role',
      },
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
)

export default model<TUser>('User', userSchema)

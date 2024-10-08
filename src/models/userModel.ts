import { InferSchemaType, Schema, model } from 'mongoose'

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
    },
    email: {
      type: String,
      required: [true, 'please enter your email'],
      unique: true,
      lowercase: true,
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

export default model<TUser>('user', userSchema)

import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
});

// Export User type and Document
export interface User {
  email: string;
  password: string;
}

export type UserDocument = User & mongoose.Document;

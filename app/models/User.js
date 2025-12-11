import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
  userId:
      {
        type: Number,
        required: [true, 'User id is required'],
        unique: true
      },
  name:
      {
        type: String,
        required: [true, 'User name is required'],
        unique: false
      },
  age:
      {
        type: Number,
        unique: false
      }
}, { timestamps: true } )

export const User = mongoose.model('User', userSchema)

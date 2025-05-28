import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from "../models/user.model.js";

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    await seedAdminUser()
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

async function seedAdminUser() {
  const user = await User.findOne({ email: 'admin@gmail.com' })
  if (!user) {
    await User.insertOne({
      username: 'admin',
      email: 'admin@gmail.com',
      phoneNumber: '7777777777',
      password: '$2b$10$3yoaKCcEkjfrCLpoq/ssgeSSDmrO1g6Ovy4MGmNGdKkJXmi2lTgyS',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    console.log('✅ Admin user created.')
  } else {
    console.log('ℹ️ Admin user already exists.')
  }
}


export default connectDB

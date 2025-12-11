import mongoose from 'mongoose'
import logger from '../configs/logger.js'

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/phoebe'

export async function connectToDB() {
  try {
    await mongoose.connect(mongoUri, {})
    logger.info('✅ Connected to MongoDB')
  } catch (err) {
    logger.error('❌ Error connecting to MongoDB: ', err)
    process.exit(1)
  }
}

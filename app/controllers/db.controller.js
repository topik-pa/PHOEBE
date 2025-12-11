import { User } from '../models/User.js'
import logger from '../configs/logger.js'

export async function getAllUsers() {
  try {
    const users = await User.find()
    return users
  } catch (err) {
    logger.error(new Error(`❌ Error getting users\n${err}`))
    throw err
  }
}

export async function createUser(data) {
  try {
    const user = new User(data)
    const savedUser = await user.save()
    return savedUser
  } catch (err) {
    logger.error(new Error(`❌ Error saving user\n${err}`))
    throw err
  }
}

export async function readUser(userId) {
  try {
    const user = await User.findOne({ userId })
    return user
  } catch (err) {
    logger.error(new Error(`❌ Error reading user ${userId}\n${err}`))
    throw err
  }
}

export async function upsertUser(data) {
  try {
    const filter = { userId: data.userId }
    const update = { ...data }
    const options = {
      new: true,       // returns the updated document
      upsert: true,    // create if does not exist
      runValidators: true // applies schema validations
    }
    const user = await User.findOneAndUpdate(filter, update, options)
    logger.info(`✅ User updated: ${data.userId}`)
    return user
  } catch (err) {
    logger.error(new Error(`❌ Error upserting user ${data.userId}\n${err}`))
    throw err
  }
}

export async function deleteUser(userId) {
  try {
    const result = await User.deleteOne({ userId })
    if (result.deletedCount === 0) {
      logger.warn(`⚠️ User not found for deletion: ${userId}`)
    } else {
      logger.info(`✅ User deleted: ${userId}`)
    }
    return result
  } catch (err) {
    logger.error(new Error(`❌ Error deleting user ${userId}\n${err}`))
    throw err
  }
}
import { User } from '../models/User.js'

// GET all users
export const getUsers = async(req, res) => {
  const users = await User.find()
  res.json(users)
}

// GET user by ID
export const getUser = async(req, res) => {
  const stock = await User.findById(req.params.id)
  if (!stock) return res.status(404).json({ message: 'Not found' })
  res.json(stock)
}

// GET user by username
export const getUserByUsername = async(req, res) => {
  const stock = await User.findOne({ name: req.params.username })
  if (!stock) return res.status(404).json({ message: 'Not found' })
  res.json(stock)
}

// POST create a new user
export const createUser = async(req, res) => {
  const newUser = new User(req.body)
  await newUser.save()
  res.status(201).json(newUser)
}

// PUT update user by ID
export const updateUser = async(req, res) => {
  const stock = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!stock) return res.status(404).json({ message: 'Not found' })
  res.json(stock)
}

// DELETE user by ID
export const deleteUser = async(req, res) => {
  const result = await User.findByIdAndDelete(req.params.id)
  if (!result) return res.status(404).json({ message: 'Not found' })
  res.json({ message: 'Deleted' })
}

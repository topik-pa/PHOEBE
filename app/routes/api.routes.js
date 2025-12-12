import express from 'express'
import {
  getUsers,
  getUser,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/api.controller.js'
const router = express.Router()


// GET all users
router.get('/users/', getUsers)

// GET user by ID
router.get('/users/:id', getUser)

// GET user by username
router.get('/users/username/:username', getUserByUsername)

// POST create a new user
router.post('/users/', createUser)

// PUT update user by ID
router.put('/users/:id', updateUser)

// DELETE user by ID
router.delete('/users/:id', deleteUser)



export default router

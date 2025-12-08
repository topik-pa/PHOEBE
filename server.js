import express from 'express'

const app = express()

// Parse application/json
app.use(express.json())

export { app }
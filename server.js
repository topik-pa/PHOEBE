// Express app setup
import express from 'express'
const app = express()

// Generate a nonce for Content Security Policy
import crypto from 'crypto'
const nonce = crypto.randomUUID()

// Parse application/json
app.use(express.json())


// Set view engine
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'app', 'views'))

app.use('/styles', express.static(path.join(__dirname, 'app', 'styles')))
app.use('/assets', express.static(path.join(__dirname, 'app', 'assets')))
app.use('/scripts', express.static(path.join(__dirname, 'app', 'scripts')))
app.use('/views', express.static(path.join(__dirname, 'app', 'views')))


// Internationalization setup
import { I18n } from 'i18n'
const locales = ['en', 'it']
const i18n = new I18n({
  locales,
  directory: path.join(__dirname, 'app', 'locales'),
  defaultLocale: 'en',
  queryParameter: 'lang',
  autoReload: true,
  updateFiles: false,
  objectNotation: true
})
app.use((req, res, next) => {
  i18n.init(req, res)
  next()
})

//Routes
import uiRoutes from './app/routes/ui.routes.js'
app.use('/', uiRoutes)
// 404 handling
app.use((req, res) => {
  res.status(404).render('4xx/404')
})
// 500 handling
app.use((err, _req, res, _next) => {
  console.error(err.stack)
  res.status(500).render('5xx/500')
})

export { app, i18n, nonce }
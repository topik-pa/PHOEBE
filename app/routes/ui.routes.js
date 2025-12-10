// This code works with Express version 4.x

import express from 'express'
import path from 'path'
import { viewController } from '../controllers/ui.controller.js'
const router = express.Router()
const LANG_REGEX = 'it|en'

router.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/sitemap.xml'))
})
// robots.txt
router.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/robots.txt'))
})
// favicon.ico
router.get('/favicon.ico', (req, res) => {
  res.sendFile('/public/favicon.ico', { root: './app' })
})

// Privacy
router.get(`/:lang(${LANG_REGEX})/privacy`, (req, res) => viewController(req, res, 'privacy', [{ name: 'privacy' }]))

// Contacts
router.get(`/:lang(${LANG_REGEX})/contacts`, (req, res) => viewController(req, res, 'contacts', [{ name: 'contacts' }]))

// Home page
router.get(`/:lang(${LANG_REGEX})`, (req, res) => viewController(req, res, 'home', []))

// root page
router.get('/', (req, res) => {
  // Get browser prefered language
  const lang = req.acceptsLanguages('en', 'it') || 'en'
  // Redirects
  res.redirect(301, `/${lang}`)
})

export default router

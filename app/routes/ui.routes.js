// This code works with Express version 4.x

import express from 'express'
import { viewController } from '../controllers/ui.controller.js'
const router = express.Router()
const CURRENT_LANGS = 'it|en'

router.get('/sitemap.xml', (req, res) => {
  res.sendFile('/public/sitemap.xml', { root: './app' })
})
// robots.txt
router.get('/robots.txt', (req, res) => {
  res.sendFile('/public/robots.txt', { root: './app' })
})
// favicon.ico
router.get('/favicon.ico', (req, res) => {
  res.sendFile('/public/favicon.ico', { root: './app' })
})

// Privacy
router.get(`/:lang(${CURRENT_LANGS})/privacy`, (req, res) => viewController(req, res, 'privacy', [{ name: 'privacy' }]))

// Contacts
router.get(`/:lang(${CURRENT_LANGS})/contacts`, (req, res) => viewController(req, res, 'contacts', [{ name: 'contacts' }]))

// Home page
router.get(`/:lang(${CURRENT_LANGS})`, (req, res) => viewController(req, res, 'home', []))

// root page
router.get('/', (req, res) => {
  // Get browser prefered language
  const lang = req.acceptsLanguages('en', 'it') || 'en'
  // Redirects
  res.redirect(301, `/${lang}/`)
})

export default router

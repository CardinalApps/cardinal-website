const express = require('express')
const cors = require('cors')
const ejs = require('ejs')
const i18n = require('./i18n/')
//const request = require('request')
//const querystring = require('querystring')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000

/**
 * Middleware that forced https on all requests.
 */
function requireHTTPS(req, res, next) {
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && port !== 3000) {
    return res.redirect('https://' + req.get('host') + req.url)
  }

  next()
}

/**
 * Init Express app
 */
const app = express()
app.use(express.static(__dirname + '/public', {'index': false}))
app.use(cors())
app.use(cookieParser())
app.use(requireHTTPS)
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

/**
 * Before ALL routes.
 */
app.use((req, res, next) => {
  // if no lang is specified, go to English
  // TODO go to the browsers lang
  if (req.path === '/') {
    res.redirect('/en')
    return
  }

  next()
})

/**
 * Route: /
 * 
 * The home page.
 */
app.get('/en', (req, res) => {
  let vars = {
    lang: 'en',
    ...i18n.en,
  }

  res.render('index.ejs', vars)
})

app.get('/fr', (req, res) => {
  let vars = {
    lang: 'fr',
    ...i18n.fr,
  }

  res.render('index.ejs', vars)
})

/**
 * Route: /terms-and-conditions
 * 
 * The home page.
 */
app.get('/en/terms-and-conditions', (req, res) => {
  let vars = {
    lang: 'en',
    ...i18n.en,
  }

  res.render('terms-and-conditions.ejs', vars)
})

app.get('/fr/terms-and-conditions', (req, res) => {
  let vars = {
    lang: 'fr',
    ...i18n.fr,
  }

  res.render('terms-and-conditions.ejs', vars)
})

/**
 * Route: /privacy-policy
 * 
 * The home page.
 */
app.get('/en/privacy-policy', (req, res) => {
  let vars = {
    lang: 'en',
    ...i18n.en,
  }

  res.render('privacy-policy.ejs', vars)
})

app.get('/fr/privacy-policy', (req, res) => {
  let vars = {
    lang: 'fr',
    ...i18n.fr,
  }

  res.render('privacy-policy.ejs', vars)
})

/**
 * Route: /cardinal-server
 * 
 * Server app page.
 */
app.get('/en/cardinal-server', (req, res) => {
  let vars = {
    lang: 'en',
    ...i18n.en,
  }

  res.render('cardinal-server.ejs', vars)
})

app.get('/fr/cardinal-server', (req, res) => {
  let vars = {
    lang: 'fr',
    ...i18n.fr,
  }

  res.render('cardinal-server.ejs', vars)
})

/**
 * Route: /cardinal-music
 * 
 * Music app page.
 */
app.get('/en/cardinal-music', (req, res) => {
  let vars = {
    lang: 'en',
    ...i18n.en,
  }

  res.render('cardinal-music.ejs', vars)
})

app.get('/fr/cardinal-music', (req, res) => {
  let vars = {
    lang: 'fr',
    ...i18n.fr,
  }

  res.render('cardinal-music.ejs', vars)
})


/**
 * Route: /error
 * 
 * All errors redirect to this page.
 */
app.get('/error', function(req, res) {
  res.clearCookie(stateKey)
  res.sendFile('public/error.html', {'root': __dirname})
})

console.log('Listening on ' + port)
app.listen(port)
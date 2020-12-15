require('dotenv-safe').config({
  path: `.env.${process.env.NODE_ENV}`,
  allowEmptyValues: true,
})

const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const mime = require('mime-types')
const app = express()
const isLocal = require('../utils/dev').isLocal()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = isLocal

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (isLocal) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Set cache middleware (using cache-control)
  if (!isLocal) {
    app.use('/_nuxt', (req, res, next) => {
      const mimeType = mime.contentType(req.headers.accept)
      const expries = [
        [/(text\/html)/, 'no-cache'],
        [/(image|css|javascript)/, 'public, max-age=31557600'], // 1 year
        [/\*\/\*/, 'public, max-age=31557600'], // 1 year
      ]

      if (mimeType) {
        for (const index in expries) {
          if (mimeType.match(expries[index][0])) {
            res.set('Cache-Control', expries[index][1])
            break
          }
        }
      }
      next()
    })
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  })
}
start()

const express = require('express')
// http is a native node library that is working very low level with HTTP requests that are incoming
const http = require('http')
const morgan = require('morgan')
const router = require('./router')
const mongoose = require('mongoose')
const keys = require('./config/keys')

// Connect mongoose to MongoDB Atlas
mongoose.connect(keys.mongoURL)

const app = express()

// App setup
// Register morgan as a middleware
// Morgan is a logging framework
app.use(morgan('combined'))
// Parse incoming requests to JSON
// { type: '*/*' }: It attempts to parse no matter the type of the request
app.use(express.json({ type: '*/*' }))
// Passing app to the routers
router(app)

// Server setup
const port = process.env.PORT || 3090
// Create a HTTP server that knows how to receive requests
//    and anything that comes in,forward it onto the express application
const server = http.createServer(app)
server.listen(port, () => console.log('Server listening on: ', port))
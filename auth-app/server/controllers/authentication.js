require('dotenv').config()
const fs = require('fs')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')

function createToken(user) {
  const privateKey = fs.readFileSync(process.env.PRIVATE_KEY)
  const passphrase = process.env.PEM_PASSPHRASE

  // Available opitons of jwt: https://github.com/auth0/node-jsonwebtoken/
  return jwt.sign(
    { userId: user.id }, // payload
    { key: privateKey, passphrase }, // secretOrPrivateKey
    { subject: user.id, algorithm: 'RS256' } // options, callback
  )
}

/**
 * @param {} req - reqest that has been made
 * @param {} res - response to send back to the client
 * @param {} next - error handling
 */
exports.signup = function (req, res, next) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide both email and password.' })
  }

  // See if a user with the given email exists
  UserModel.findOne({ email }, (err, existingUser) => {
    if (err) return next(err)

    // If a user exists, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use.' })
    }

    // if a user does not exist, create and save user record
    const user = new UserModel({
      email,
      password
    })

    // Save the record to the DB
    user.save((err) => {
      if (err) return next(err)
      res.json({ token: createToken(user) })
    })
  })
}

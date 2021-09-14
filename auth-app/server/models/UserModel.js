const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

// Define the UserModel
const userSchema = new Schema({
  // "unique: true" makes sure that the email doesn not exist in the DB before saving it
  // "lowercase: true" makes sure that the email is lowercased before it gets stored or compared for uniqueness
  email: { type: String, unique: true, lowercase: true },
  password: String,
})

/**
 * salt: randomly generated string of characters created when saving a password
 * hash: combined string consists of a solt and hashed password
*/

// On save hook, encrypt password
// Before saving a model, run this function: .pre()
userSchema.pre('save', function(next) {
  // Getting access to the UserModel with actual email and password
  const user = this
  
  // Generate a salt, then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err)

    // hash(encrypt) the password using the salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)
      // Overwrite plain text password with encrypted password
      user.password = hash
      next()
    })
  })
})

// Create the model class
const UserModel = mongoose.model('user', userSchema)

// Export the model
module.exports = UserModel
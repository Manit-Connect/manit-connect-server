const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs')

const generateJwt = (user) => {
  return jwt.sign({
    id: user.id,
    email: user.email,
    name: user.name
  }, "abcdefughijklmnopqrstuvwxyz", {
    expiresIn: "24h"
  });
}

const login = async (req, res, next) => {
  const user = req.body
  const currentUser = await User.findOne({ email: user.email })
  if (!currentUser) {
    res.status(401).json({
      message: 'User not found'
    })
  }

  const match = bcrypt.compare(user.password, currentUser.password)
  if (!match) {
    res.status(401).json({
      message: 'Password is incorrect'
    })
  }
  const token = generateJwt(currentUser)

  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email
    }
  })
}

const signup = async (req, res, next) => {
  const user = req.body
  const currentUser = await User.findOne({ email: user.email })
  if (currentUser) {
    res.status(401).json({
      message: 'User already exists'
    })
  }

  const hash = await bcrypt.hash(user.password, 10)
  const newUser = new User({
    name: user.name,
    email: user.email,
    password: hash
  })
  await newUser.save()
  const token = generateJwt(newUser)

  res.status(201).json({
    message: 'User created',
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }
  })
}

const logout = async(req, res, next) => {
  res.status(200).json({
    message: 'Logout successful'
  })
}

module.exports = {
  login,
  signup,
  logout
}
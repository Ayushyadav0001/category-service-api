// File: routes/auth.routes.js
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.post('/', (req, res) => {
  const { email, password } = req.body

  if (email === 'admin@codesfortomorrow.com' && password === 'Admin123!@#') {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })
    return res.json({ token })
  }

  return res.status(401).json({ message: 'Invalid credentials' })
})

module.exports = router

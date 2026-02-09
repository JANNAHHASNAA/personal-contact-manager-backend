const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();

// ======================
// REGISTER ROUTE
// ======================
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // 1️⃣ Check for empty fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  // 2️⃣ Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email' });
  }

  // 3️⃣ Optional: validate password length
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  // 4️⃣ Check if email already exists in DB
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length > 0) return res.status(400).json({ message: 'Email already exists' });

    // 5️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6️⃣ Insert new user
    db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'User registered successfully' });
      }
    );
  });
});

// ======================
// LOGIN ROUTE
// ======================
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // 1️⃣ Validate empty fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter email and password' });
  }

  // 2️⃣ Optional: validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email' });
  }

  // 3️⃣ Check if email exists in DB
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(400).json({ message: 'Email not found' });

    const user = result[0];

    // 4️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    // 5️⃣ Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

module.exports = router;

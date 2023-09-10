


const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../entities/User');
const bcrypt = require('bcryptjs');

// Authenticate user and get a token
router.post('/auth', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      'your-secret-key',
      { expiresIn: 3600 }, // Adjust token expiration as needed
      (error, token) => {
        if (error) {
          console.error('Error generating token:', error);
          res.status(500).json({ error: 'Server error' });
        } else {
          res.json({ token });
        }
      }
    );
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

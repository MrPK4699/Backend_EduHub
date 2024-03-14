const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const {jwtSecret}= require('../config/config');
      

exports.register = async (req, res) => {
  try {
    
    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,

    });

    await user.save();
    
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error(err);
    res.status(402).json({ message: 'Internal server error', err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });

    res.status(201).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(402).json({ message: 'Internal server error',err });
  }
};

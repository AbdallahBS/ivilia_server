// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    console.log("registreation");
    
  try {
    const { username, password, phone_number, email } = req.body;
   console.log(username, password, phone_number, email);
   
    
    const user = await User.create({ username,email,phone_number,password });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: 'Registration error', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Login error', error });
  }
};

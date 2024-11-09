// controllers/userController.js
const User = require('../models/User');

const crypto = require("crypto");

const jwt = require('jsonwebtoken');
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");
const TOKEN = "b905c868d49b7c13f29f4ec9aa50b107";

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);



exports.register = async (req, res) => {
    console.log("registreation");
    
  try {
    const { username, password, phone_number, email } = req.body;
   console.log(username, password, phone_number, email);
   const confirmationCode = crypto.randomInt(100000, 999999);

    
    const user = await User.create({ username,email,phone_number,password , confirmationCode,  // Store the confirmation code
      isVerified: false,  });

    const mailOptions = {
      from: {
        address: "hello@demomailtrap.com",  // Sender address as accepted by Mailtrap
        name: "Ivilia",
      },
      to: email,
      subject: "Welcome to Ivialia Nature!",
      text: `Hello ${username}, welcome to Ivialia! Your registration was successful. Experience nature like never before with Ivialia’s eco-natural tours and immerse yourself in realistic moments surrounded by nature.`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <!-- Logo -->
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://i.postimg.cc/52gk8jDp/Capture-d-cran-2024-08-27-092416-Photoroom-removebg-preview.png" alt="Ivialia Logo" style="max-width: 150px;"/>
          </div>
    
          <!-- Welcome Message -->
          <h2 style="color: #4CAF50; text-align: center;">Welcome to Ivialia Nature, ${username}!</h2>
    
          <p style="font-size: 16px; line-height: 1.5; text-align: center;">
            Your registration was successful! We are thrilled to have you on board.
          </p>
    
          <!-- Description -->
          <p style="font-size: 16px; line-height: 1.5; color: #555; text-align: center;">
            At Ivialia, we offer eco-friendly tours designed to let you experience the beauty of nature up close. Step into realistic moments where nature embraces you, and unwind with experiences that are both enriching and unforgettable.
          </p>
     <p>Thank you for registering! Use the following confirmation code to verify your account:</p>
        <h2>${confirmationCode}</h2>
    
          <!-- Footer -->
          <p style="font-size: 12px; color: #888; text-align: center; margin-top: 20px;">
            &copy; ${new Date().getFullYear()} Ivialia Nature. All rights reserved.
          </p>
        </div>
      `

    };

    // Send the email
    transport.sendMail(mailOptions)
      .then(info => {
        console.log("Email sent:", info);
      })
      .catch(error => {
        console.error("Error sending email:", error);
      });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: 'Registration error', error });
  }
};

exports.login = async (req, res) => {
  console.log("sign in called");
  
  try {
    const { username, password } = req.body;
    console.log(username,password);
    
    const user = await User.findOne({ where: { username } });

    if (!user || user.password !== password) { // Direct comparison
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    
    // Send back the user data along with the token
    res.status(201).json({ 
      message: 'Login successful', 
      token, 
      user: {
        username: user.username,
        email: user.email,
        phone_number: user.phone_number,
        // Include any other user data you want to return
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login error', error });
  }
};


exports.verifyCode = async (req, res) => {
  const { userId, code } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (user && user.confirmationCode === code) {
      user.isVerified = true;
      await user.save();
      res.status(200).json({ message: "Account verified successfully." });
    } else {
      res.status(400).json({ message: "Invalid confirmation code." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Verification error", error });
  }
};
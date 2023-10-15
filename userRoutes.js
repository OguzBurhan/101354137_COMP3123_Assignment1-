const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/userModel');

const router = express.Router();

// User Signup
router.post('/signup', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        const result = await user.save();
        res.status(201).json({ message: "User registered successfully", user: result });

    } catch (error) {
        res.status(500).json({ error });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: "Invalid Username and password" });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid Username and password" });
        }

        // Here you can generate a JWT token if you want
        res.status(200).json({ message: "User logged in successfully", username: user.username });

    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;


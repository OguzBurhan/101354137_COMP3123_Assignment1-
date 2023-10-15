const express = require('express');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/comp3123_assignment1', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Successfully connected to MongoDB!");
});

// Import Routes
const userRoutes = require('./userRoutes');
const employeeRoutes = require('./employeeRoutes');

// Use Routes with Express
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
//user
const userRoute = require('./routes/user');
//user middleware
app.use('/api/user', userRoute);

//patient
const patientRoute = require('./routes/patient');
//patient middleware
app.use('/api/patient', patientRoute);



// Test route
app.post('/test', (req, res) => {
    console.log(req.body);
    res.send('Received!');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!', 
        error: process.env.NODE_ENV === 'production' ? {} : err.message 
    });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
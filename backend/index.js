const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database'); // Ensure database connection is initialized

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// User
const userRoute = require('./routes/user');
app.use('/api/user', userRoute);

// Patient
const patientRoute = require('./routes/patient');
app.use('/api/patient', patientRoute);

// Ward
const wardRoute = require('./routes/ward');
app.use('/api/ward', wardRoute);

// Department
const departmentRoute = require('./routes/department');
app.use('/api/department', departmentRoute);

// Staff (if staff functionality is included under user or a separate route)
const staffRoute = require('./routes/staff');
app.use('/api/staff', staffRoute);

// Test route
app.post('/test', (req, res) => {
    console.log(req.body);
    res.send('Received!');
});

// Sync Database
(async () => {
    try {
        await sequelize.sync(); // Sync all models with the database
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
})();

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

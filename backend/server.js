// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./firebase');
const employeeRoutes = require('./routes/EmployeeRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// API Routes will go here
app.use('/api', employeeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running in new updated files on port ${PORT}`);
});

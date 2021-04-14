// Imports express
const express = require('express');

const apiRoutes = require('./routes/apiRoutes');

// Imports db/connection.js
const db = require('./db/connection');
// Imports inputCheck module
const inputCheck = require('./utils/inputCheck');
// Adds PORT designation and app expression
const PORT = process.env.PORT || 3001;
const app = express();

// Adds Express.js middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// get is route method, res.json() is response method

// Handle user requests that aren't supported by the app
// Default response for any other request (Not Found)
// MUST BE LAST ROUTE
app.use((req, res) => {
    res.status(404).end();
});


// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
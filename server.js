// Imports express
const express = require('express');

// Adds PORT designation and app expression
const PORT = process.env.PORT || 3001;
const app = express();

// Adds Express.js middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// get is route method, res.json() is response method

// Handle user requests that aren't supported by the app
// Default response for any other request (Not Found)
// MUST BE LAST ROUTE
app.use((req,res) => {
    res.status(404).end();
});









// Adds the function that starts Express.js server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
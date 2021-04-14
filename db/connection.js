// Imports mysql2 package, which is in node_modules
const mysql = require('mysql2');

// Connect to MySQl database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'August2020',
        database: 'election'
    },
    console.log('Connected to the election database.')

);




module.exports = db;

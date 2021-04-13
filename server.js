// Imports express
const express = require('express');
// Imports mysql2 package, which is in node_modules
const mysql = require('mysql2');

// Adds PORT designation and app expression
const PORT = process.env.PORT || 3001;
const app = express();

// Adds Express.js middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

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

// get is route method, res.json() is response method


// Returns all data in the candidates table
// db.query(`SELECT * FROM candidates`, (err,rows) => {
//     console.log(rows);
// });

// GET a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err,row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(row);
// })

// Delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err,result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
            VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err,result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
});

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
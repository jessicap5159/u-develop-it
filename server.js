// Imports express
const express = require('express');
// Imports mysql2 package, which is in node_modules
const mysql = require('mysql2');
// Imports inputCheck module
const inputCheck = require('./utils/inputCheck');
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
app.get('/api/candidates', (req,res) => {
    const sql = `SELECT * FROM candidates`;

    db.query(sql, (err,rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// GET a single candidate
app.get('/api/candidate/:id', (req,res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err,row) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Delete a candidate
app.delete('/api/candidate/:id', (req,res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// Create a candidate
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
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
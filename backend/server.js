//Import core module
const express = require("express");
const bodyParser = require('body-parser');

//Create Mysql pool
const db = require('./db');

//Create Express server
const app = express();

//Register to interpret the body of the request in json form
app.use(bodyParser.json());

//Create DB table
db.pool.query(`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT, 
    PRIMARY KEY (id)
)`, (err, results, fileds) => {
    console.log('results', results)
})

//Send all data in DB list to Frontend server
app.get('/api/hi', function (req, res) {
    //Get all data from DB
    res.status(200).send('good')
})

//Send all data in DB list to Frontend server
app.get('/api/values', function (req, res) {
    //Get all data from DB
    db.pool.query('SELECT * FROM lists;',
        (err, results, fileds) => {
            if (err)
                return res.status(500).send(err)
            else
                return res.json(results)
        })
})

//Insert Client input value to DB list table
app.post('/api/value', function (req, res, next) {
    //Insert value to DB
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
        (err, results, fileds) => {
            if (err)
                return res.status(500).send(err)
            else
                return res.json({ success: true, value: req.body.value })
        })
})

app.listen(5000, () => {
    console.log('The application started on port 5000.')
})

const express = require('express');
const express_handlebars = require('express-handlebars');
const body_parser = require('body-parser');
const mySql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Parsing middleware
app.use(body_parser.urlencoded({ extended: false }));

// Parse application/json
app.use(body_parser.json());

// static files
app.use(express.static('public'));

// Templating engine
app.engine('hbs', express_handlebars.engine( {extname: '.hbs'}));
app.set('view engine', 'hbs');

// Connection port
const pool = mySql.createPool({
    connectionLimit : 100,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password: process.env.DB_PASS,
    database : process.env.DB_NAME
});

//Connection to DB
pool.getConnection((err, connection) => {
    if(err) throw err; // problem occured!
    console.log('Successfully connected as ID ' + connection.threadId);
});


const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
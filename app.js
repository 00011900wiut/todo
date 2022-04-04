const express = require('express');
const express_handlebars = require('express-handlebars');
const body_parser = require('body-parser');
const mySql = require('mysql');

require('dotenv').config();

const app = express();
const port = 3000;

// Parsing middleware
app.use(body_parser.urlencoded({ extended: false }));

// Parse application/json
app.use(body_parser.json());

// static files
app.use(express.static('public'));

// Templating engine
app.engine('hbs', express_handlebars.engine( {extname: '.hbs'}));
app.set('view engine', 'hbs');

// Router
app.get('', (req, res) => {
    res.render('home');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
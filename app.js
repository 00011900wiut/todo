const express = require('express');
const express_handlebars = require('express-handlebars');
const body_parser = require('body-parser');
const mySql = require('mysql');

require('dotenv').config();

const app = express();
const port = 3000;



app.listen(port, () => console.log(`Listening on port ${port}`));
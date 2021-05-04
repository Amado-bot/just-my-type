// const express = require('express');
// const exphbs = require('express-handlebars');
// const session = require('express-session');
// const sequelize = require('./config/connection');
// const routes = require('./routes')

const express = require('express');

const sequelize = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);



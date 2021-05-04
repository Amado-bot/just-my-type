const express = require('express');
const path = require('path')
const exphbs = require('express-handlebars');
const session = require('express-session')
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const routes = require('./controllers/');
const sequelize = require('./config/connection');


const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Secret secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};


const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening.'));
});
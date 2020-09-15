const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { PORT, MONGODB_URI } = require('./config');

const app = express();

// connection to db
mongoose
    .connect(MONGODB_URI)
    .then((db) => console.log('DB connected'))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });

// importing routes
const indexRoutes = require('./routes/index');

// settings
app.set('port', PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
// routes
app.use('/', indexRoutes);

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});

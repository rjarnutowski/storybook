const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

// Load Models
require('./models/Users');

// Passport Config
require('./config/passport')(passport);

//Route Files
const auth = require('./routes/auth');
// Loag Keys
const keys = require('./config/keys');


mongoose.Promise = global.Promise;

// Mongoose connect
mongoose.connect(keys.mongoURI, {})
    .then(() => console.log("Mongo Connected"))
    .catch(err => console.log(err));


const app = express();

app.get('/', (req, res) => {
    res.send('It Works');
});

// Middleware
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


// Use routes
app.use('/auth', auth);

const port = process.env.port || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

// Load Models
require('./models/Users');

// Passport Config
require('./config/passport')(passport);

//Route Files
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');
// Loag Keys
const keys = require('./config/keys');


mongoose.Promise = global.Promise;

// Mongoose connect
mongoose.connect(keys.mongoURI, {})
    .then(() => console.log("Mongo Connected"))
    .catch(err => console.log(err));


const app = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

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

// Set Global Vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

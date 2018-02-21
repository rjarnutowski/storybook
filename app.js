const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// Passport Config
require('./config/passport')(passport);

//Route Files
const auth = require('./routes/auth');


const app = express();

app.get('/', (req, res) => {
    res.send('It Works');
});

// Use routes
app.use('/auth', auth);

const port = process.env.port || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

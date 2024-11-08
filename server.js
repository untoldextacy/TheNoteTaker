// Installations with npm

const express = require('express');
const path = require('path');
const fs = require('fs');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 3002

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

// Routes used

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Server

app.listen(PORT, () => {
    console.log(`The server is live! Check it out on http://localhost:${PORT}`)
});
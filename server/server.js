const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const app = express();
const port = 1234;

// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(helmet());

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/';

mongoose.connect(url, function (err) {
    if (err) throw err;
    console.log('Mongoose connected');
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});
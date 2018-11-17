const mongoose = require('mongoose');

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
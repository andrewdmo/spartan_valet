// https://github.com/dbjsdev/reactnodedemo/blob/master/server/app.js#L6

const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const routes = require('./routes/index');


const app = express();
const port = 1235;

// app.get('/', (req, res) => res.send('Hello World!'));


// app.use(cors());
// app.options('*', cors());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

// app.use('/user', authRoute);
//
// app.use('/news/:id/comment', authCheckMiddleware);
// app.use('/news', newsRoute);


app.use(helmet());

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/';

mongoose.connect(url, function (err) {
    if (err) throw err;
    console.log('Mongoose connected');
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose connection error:'));
db.once('open', function () {
console.log('db open')}
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

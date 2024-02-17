require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const corsOptions = {
    origin: '*',
    method: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Contect-Type, Authorization' // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
bodyParser.urlencoded({ extended: true });

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('MongoDB connected ...');
        app.listen(4242, () => {
            console.log('Running on port 4242 ...');
        })
    })
    .catch(err => {
        console.log(err);
    });

app.use('/', (req, res, next) => {
    console.log("Hello World!")
});

app.use('/api/v1/cement-swift/', () => {
    console.log("Hello World!")
});
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const allRoutes = require('./routes');

const app = express();

const corsOptions = {
    origin: ['http://localhost:3000', process.env.CLIENT_URL],
    method: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Contect-Type, Authorization' // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
bodyParser.urlencoded({ extended: true });

const port = 4242;

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('MongoDB connected ...');
        app.listen(port, () => {
            console.log(`Running on port ${port} ...`);
        })
    })
    .catch(err => {
        console.log(err);
    });

// Other end-points
app.use('/api/v1/cement-swift/', allRoutes);
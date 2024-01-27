require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const allRoutes = require('./routes');
const checkoutRouter = require('./routes/checkout.routes');
const { default: mongoose } = require('mongoose');
const app = express();

const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization'
};

app.use(cors(corsOptions));
app.use(express.json());
bodyParser.urlencoded({ extended: true })

mongoose.connect(process.env.MONGODB_URL)
.then(()=> {
  console.log('Connected to MongoDB ...');
  app.listen(4242, () => console.log('Running on port 4242 ...'));
})
.catch((err) => {
  console.log(err);
});

// Checkout routes
app.use('/', checkoutRouter);
// Other end-points
app.use('/api/v1/cement-swift/', allRoutes);

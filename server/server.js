const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const allRoutes = require('./routes');
const checkoutRouter = require('./routes/checkout.routes');
const app = express();

const corsOptions = {
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization'
};

app.use(cors(corsOptions));
app.use(express.json());
bodyParser.urlencoded({ extended: true })

mongoose.connect('')
.then(()=> {
  console.log('Connected to MongoDB...');
})
.catch((err) => {
  console.log(err);
});

// Checkout routes
app.use('/', checkoutRouter);
// Other end-points
app.use('/api/v1/cement-swift/', allRoutes);

app.listen(4242, () => console.log('Running on port 4242'));
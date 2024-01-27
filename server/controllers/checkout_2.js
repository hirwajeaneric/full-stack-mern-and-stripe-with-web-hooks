const stripe = require('stripe')('sk_test_51OXVUEJ0gOzWqZK5achNSoS4RyBoRiyapu41GA2h3bZnQwAWK8M1oSgu1TStrCnqgAcCaUnTC05uJQJ3dSMrZ9xT00Xi7ocwGG');
const CLIENT_ADDRESS = 'http://localhost:3000';
const customer = await stripe.customers.create();

const paymentIntent = await stripe.paymentIntents.create({
  customer: customer.id,
  setup_future_usage: 'off_session',
  amount: 1099,
  currency: 'usd',
  automatic_payment_methods: {
    enabled: true,
  },
});

const getClientSecret = async (req, res, next) => {
  const intent = paymentIntent();
  res.status(200).json({ client_secret: intent.client_secret });
};

module.exports = {
  getClientSecret
}
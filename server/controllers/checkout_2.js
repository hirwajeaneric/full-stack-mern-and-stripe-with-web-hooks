const stripe = require('stripe')('sk_test_51OXVUEJ0gOzWqZK5achNSoS4RyBoRiyapu41GA2h3bZnQwAWK8M1oSgu1TStrCnqgAcCaUnTC05uJQJ3dSMrZ9xT00Xi7ocwGG');

const createPaymentIntent = async () => {
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

  return paymentIntent;
};

const getClientSecret = async (req, res, next) => {
  try {
    const paymentIntent = await createPaymentIntent();
    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};

module.exports = {
  getClientSecret
};

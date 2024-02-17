const stripe = require('stripe')('sk_test_51OXVUEJ0gOzWqZK5achNSoS4RyBoRiyapu41GA2h3bZnQwAWK8M1oSgu1TStrCnqgAcCaUnTC05uJQJ3dSMrZ9xT00Xi7ocwGG');

const createPaymentIntent = async (items, amount) => {
    const customer = await stripe.customers.create();
    const paymentIntent = await stripe.paymentIntents.create({
        customer: customer.id,
        setup_future_usage: 'off_session',
        amount: amount,
        currency: 'rwf',
        automatic_payment_method: {
            enabled: true,
        },
    });

    return paymentIntent;
};

const getClientSecret = async (req, res, next) => {
    const { items, amount } = req.body;
    try {
        const paymentIntent = await createPaymentIntent(items, amount);
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Failed to create payment intent.'});
    }
}

module.exports = {
    getClientSecret
}
const stripe = require('stripe')('sk_test_51OXVUEJ0gOzWqZK5achNSoS4RyBoRiyapu41GA2h3bZnQwAWK8M1oSgu1TStrCnqgAcCaUnTC05uJQJ3dSMrZ9xT00Xi7ocwGG');
const CLIENT_ADDRESS = 'http://localhost:3000';

const createCheckoutSession = async (req, res) => {
  const { items } = req.body;

  console.log(req.body);

  if (items) {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: items,
      mode: 'payment',
      return_url: `${CLIENT_ADDRESS}/return?session_id={CHECKOUT_SESSION_ID}`,
    });
  
    res.send({ clientSecret: session.client_secret });
  }
};

const checkSessionStatus = async (req, res) => {
  console.log(req);
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
    more: session
  });
};

module.exports = {
  createCheckoutSession,
  checkSessionStatus
}
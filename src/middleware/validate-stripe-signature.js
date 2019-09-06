const {
  validateWebhookOrigin,
  validateWebhookSignature,
} = require('../lib/stripe');

// Since the secret is ever-changing with each newly generated ngrok url, it is useless to set a default value
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

module.exports = async (req, res, next) => {
  let event;

  // Check if the webhook has legit origin IP address as specified by Stripe
  if (!validateWebhookOrigin(req)) {
    res.sendStatus(400);
  }

  // Retrieve the signature part
  const sig = req.headers['stripe-signature'];

  try {
    // Build and validate Stripe event from the raw body data
    event = await validateWebhookSignature(req.body, sig, endpointSecret);
  } catch (err) {
    // Any invalid event signature would throw an error
    res.sendStatus(400);
  }

  // Attach the event object to req for further use
  req.event = event;

  // The webhook event is valid, proceed to the next middleware
  next();
};

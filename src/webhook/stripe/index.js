const { checkoutCompleted } = require('./checkout');

module.exports = (req, res) => {
  const {
    data,
    type,
  } = req.event;
  const { object } = data;
  console.log(`EventType: ${type}`);
  console.log(object);

  // Send out HTTP 200 to response to Stripe right away that we have received their event
  res.sendStatus(200);

  // Handle each event type that we currently care about
  switch (type) {
    case 'checkout.session.completed':
      return checkoutCompleted(object);
    default:
      // Ignore the event
      return true;
  }
};

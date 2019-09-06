// List of valid webhook origins from Stripe
const stripeWebhookOrigins = [
  '54.187.174.169',
  '54.187.205.235',
  '54.187.216.72',
  '54.241.31.99',
  '54.241.31.102',
  '54.241.34.107',
];

module.exports = ({ webhooks }, throwError) => ({
  validateWebhookOrigin: (req) => {
    // Retrieve the webhook origin IP address
    const originIp = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;

    if (!stripeWebhookOrigins.includes(originIp)) {
      // Report the abnormal webhook manually since no error is actually thrown
      throwError(new Error('Invalid origin'), {
        fn: 'validateWebhookSignature',
        source: 'src/lib/stripe/webhooks.js',
        payload: JSON.stringify({
          originIp,
          request: {
            url: req.url,
            rawHeaders: req.rawHeaders,
            body: req.body,
          },
        }),
      }, {
        requestUrl: req.url,
        requestHost: req.headers.host,
      });

      return false;
    }

    return true;
  },
  validateWebhookSignature: (requestBody, signature, secret) => {
    try {
      return webhooks.constructEvent(requestBody, signature, secret);
    } catch (err) {
      return throwError(err, {
        fn: 'validateWebhookSignature',
        source: 'src/lib/stripe/webhooks.js',
      });
    }
  },
});

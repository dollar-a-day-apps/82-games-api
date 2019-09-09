const { managementClient } = require('../../util/auth');
const { retrieveProduct } = require('../../lib/stripe');
const throwError = require('../../util/throw-error');

module.exports = {
  checkoutCompleted: async (args) => {
    // The client_reference_id should always be the user/buyer's Auth0 identifier
    // as set from the frontend, before redirecting the user to Stripe Checkout page
    const {
      client_reference_id: authId,
      display_items,
    } = args;

    try {
      // Get the SKU identifier of the purchased item
      const { sku: { product: productId } } = display_items[0];

      // Get the product detail from Stripe to extract the metadata
      const { metadata } = await retrieveProduct(productId);
      // Quick typecasting via multiplication since the metadata is retrieved as String
      const productTicketCount = metadata.ticketCount * 1;

      // Get the user data from Auth0 to fetch the current ticket count of the user
      const userData = await managementClient.getUser({ id: authId });
      const { user_metadata = {} } = userData;
      const { ticketCount = 0 } = user_metadata;

      // Update the user's ticket count after the purchase
      await managementClient.updateUserMetadata({ id: authId }, {
        ticketCount: ticketCount + productTicketCount,
      });

      return true;
    } catch (err) {
      return throwError(err, {
        fn: 'checkoutCompleted',
        source: 'src/webhook/stripe/checkout.js',
      });
    }
  },
};

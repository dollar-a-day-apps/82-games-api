const { managementClient } = require('../../util/auth');
const { retrieveProduct } = require('../../lib/stripe');
const throwError = require('../../util/throw-error');

module.exports = {
  checkoutCompleted: async (args) => {
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
      const productVoucherCount = metadata.voucherCount * 1;

      // Get the user data from Auth0 to fetch the current voucher count of the user
      const userData = await managementClient.getUser({ id: authId });
      const { user_metadata = {} } = userData;
      const { voucherCount = 0 } = user_metadata;

      // Update the user's voucher count after the purchase
      await managementClient.updateUserMetadata({ id: authId }, {
        voucherCount: voucherCount + productVoucherCount,
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

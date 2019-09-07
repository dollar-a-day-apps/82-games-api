module.exports = ({ products }, throwError) => ({
  retrieveProduct: (productId) => {
    try {
      return products.retrieve(productId);
    } catch (err) {
      return throwError(err, {
        fn: 'retrieveProduct',
        source: 'src/lib/stripe/products.js',
        payload: JSON.stringify({
          fnArgs: {
            productId,
          },
        }),
      });
    }
  },
});

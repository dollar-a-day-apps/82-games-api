const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_yrVNmF4CZaulZ0Ekp5zr2DlW');
const products = require('./products');
const webhook = require('./webhook');
const throwError = require('../../util/throw-error');

module.exports = {
  ...products(stripe, throwError),
  ...webhook(stripe, throwError),
};

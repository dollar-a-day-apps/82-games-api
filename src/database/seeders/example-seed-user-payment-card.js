const { currentDateTime } = require('../../util/date');
const { UserPaymentCard } = require('../models');

module.exports = {
  up: async (queryInterface) => {
    // Only seed the table if it is empty
    const empty = !(await UserPaymentCard.count());

    if (empty) {
      return queryInterface.bulkInsert('UserPaymentCards', [{
        userId: '28c7b42d-d35f-48b1-b414-46fe0a3aca6e',
        metadata: '{"brand":"mastercard","expiryMonth":3,"expiryYear":2024}',
        createdAt: currentDateTime,
        updatedAt: currentDateTime,
      }], {});
    }
  },

  down: queryInterface => (
    queryInterface.bulkDelete('UserPaymentCards', null, {})
  ),
};

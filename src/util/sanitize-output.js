const { cloneDeep } = require('lodash');

// Delete unused or private fields/props from an object
// By default, it only removes `createdAt` and `updatedAt` fields
// More fields can be specified in the `customFields` param
const sanitizeObject = (obj, customFields = [], plain = true) => {
  if (!obj) {
    return null;
  }

  const newObj = cloneDeep((plain ? obj.get({ plain: true }) : obj));

  // Delete default unused fields
  delete newObj.createdAt;
  delete newObj.updatedAt;

  // Delete any additional properties specified
  customFields.forEach((field) => {
    delete newObj[field];
  });

  return newObj;
};

// Delete unused or private fields/props from a list of object
const sanitizeList = (list, customFields = [], plain = false) => {
  if (!list) {
    return null;
  }

  const newList = [];

  list.forEach(((obj) => {
    // Set `plain` to false since the list data is raw
    // so we no longer need to get the raw data from each objects
    newList.push(sanitizeObject(obj, customFields, plain));
  }));

  return newList;
};

module.exports = {
  sanitizeObject,
  sanitizeList,
};

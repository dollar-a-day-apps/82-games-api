const moment = require('moment');

const defaultDateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

// Convenient method to get the current timestamp pre-formatted for Postgresql's Date type
module.exports = {
  defaultDateTimeFormat,
  timestampToDateTime: timestamp => moment.unix(timestamp).format(defaultDateTimeFormat),
  dateTimeToTimestamp: dateTime => `${moment(dateTime).unix()}`,
  currentDateTime: moment().format(defaultDateTimeFormat),
};

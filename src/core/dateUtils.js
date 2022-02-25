const moment = require("moment")

const momentFormat = "YYYY-MM-DD"
module.exports.newMoment = date => {
    if (date.isMoment) return date
    if (typeof date === 'string') return moment(date, momentFormat)
    if (date instanceof Date) return moment(date.toISOString());
    else return moment(date)
}
module.exports.format = date => {
    if (date.isMoment) return date.format(momentFormat)
    else return moment(date).format(momentFormat)
}

module.exports.dateToValue = (date) => {
    const day = date.getUTCDate();
    const dayString = day < 10 ? `0${day}` : `${day}`;
    const month = date.getUTCMonth() + 1;
    const monthString = month < 10 ? `0${month}` : `${month}`;
    return `${date.getUTCFullYear()}-${monthString}-${dayString}`;
  };

  module.exports.valueToDate = (value) => {
    const date = new Date(value);
    if (isNaN(date)) {
      return null;
    }
    const dateAccountingForTimezone = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    return dateAccountingForTimezone;
  };

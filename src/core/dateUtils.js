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
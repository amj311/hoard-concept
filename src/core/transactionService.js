const { TransactionEvent } = require("./models");

class TransactionService {
    static generateEventsBetween(start,end,tranSchedule) {
        let dates = tranSchedule.schedule.getOccurrencesBetween(start,end);
        return dates.map(d=>new TransactionEvent(tranSchedule.template,d))
    }
}

module.exports = TransactionService;

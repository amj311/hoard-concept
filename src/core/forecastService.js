const { newMoment } = require("./dateUtils");
const { MonthSummary, Snapshot, Account, TransactionType } = require("./models");
const TransactionService = require("./transactionService");

class ForecastService {
    static computeForecast(initialBalances, scheduledTransactions, begin, end) {
        let now = newMoment(begin)
        end = newMoment(end);
    
        let events = [];
        for (let t of scheduledTransactions) { 
            events.push(...TransactionService.generateEventsBetween(now,end,t)) 
        }
        events.sort((a,b)=>(a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0));
    
        // set initial
        let accounts = new Map();
        for (let a  of initialBalances){
            accounts.set(a.id,a)
        }
    
        let accountsCopy = this.copyAccounts(accounts)
        let monthlySummaries = [];
        let month = new MonthSummary(now, this.copyAccounts(accounts));
        for (let event of events) {
            let eventDate = newMoment(event.date);
            if (eventDate.isAfter(end)) break;
            while (eventDate.year() > now.year() || eventDate.month() > now.month()) {
                monthlySummaries.push(month);
                month = new MonthSummary(now.add(1,'M'), this.copyAccounts(accounts))
            }
            let details = event.details;
            accountsCopy = this.copyAccounts(accountsCopy)

            // Handle Income
            if (details.type === TransactionType.Income) {
                let changedAccount = accountsCopy.get(details.targetAccount)
                changedAccount.balance += details.amount
            }

            if (details.type === TransactionType.Expense) {
                let changedAccount = accountsCopy.get(details.targetAccount)
                changedAccount.balance -= details.amount
            }

            if (details.type === TransactionType.Transfer) {
                let target = accountsCopy.get(details.targetAccount)
                let origin = accountsCopy.get(details.originAccount)
                target.balance += details.amount
                origin.balance -= details.amount
            }

            // Nice logging per transaction, could be useful somewhere.
            //
            // console.log("\n--- "+format(event.date)+" ---")
            // let sign = details.amount > 0 ? '????' : '????'
            // console.log(sign+" $"+Math.abs(details.amount)+" for "+details.memo)
            // console.log(changedAccount.toString())
            // if (changedAccount.balance < 0) {
            //     console.log("??? NEGATIVE BALANCE !!!")
            // }

            month.addSnapshot(new Snapshot(accountsCopy,event))
        }
    
        monthlySummaries.push(month);
    
        return monthlySummaries;
    }

    static copyAccounts(accounts) {
        let newAccounts = new Map();
        for (let a of accounts.values()) {
            newAccounts.set(a.id, new Account(a.id,a.name,Number(a.balance)))
        }
        return newAccounts
    }
}

module.exports = ForecastService
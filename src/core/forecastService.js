const { newMoment } = require("./dateUtils");
const { MonthSummary, Snapshot, Account } = require("./models");
const TransactionService = require("./transactionService");

class ForecastService {
    static computeForecast(initialBalances, scheduledTransactions, begin, end) {
        let now = newMoment(begin)
        end = newMoment(end);
    
        let events = [];
        for (let t of scheduledTransactions) { events.push(...TransactionService.generateEventsBetween(now,end,t)) }
        events.sort((a,b)=>(a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0));
    
        // set initial
        let accounts = new Map();
        for (let a  of initialBalances){
            accounts.set(a.id,a)
        }
    
        console.log("--- INITIAL STATE ---\n")
        console.log("Accounts:")
        for (let a  of initialBalances) {
            console.log("  "+a.toString());
        }
    
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
            let changedAccount = accounts.get(details.account)
            if (changedAccount) {
                // console.log("\n--- "+format(event.date)+" ---")
                // let sign = details.amount > 0 ? '💹' : '🔻'
                // console.log(sign+" $"+Math.abs(details.amount)+" for "+details.memo)
                changedAccount.balance += details.amount
                // console.log(changedAccount.toString())
                // if (changedAccount.balance < 0) {
                //     console.log("⭕ NEGATIVE BALANCE !!!")
                // }
                month.addSnapshot(new Snapshot(this.copyAccounts(accounts),event))
            }
        }
    
        monthlySummaries.push(month);

        console.log("\n\n--- FINAL STATE ---")
        console.log("Accounts:")
        for (let a of accounts.values()) {
            console.log("  "+a.toString());
        }
    
        return monthlySummaries;
    }

    static copyAccounts(accounts) {
        let newAccounts = new Map();
        for (let a of accounts.values()) {
            newAccounts.set(a.id, new Account(a.id,Number(a.balance)))
        }
        return newAccounts
    }
}

// Create forecast with monthly breakdowns and yearly summaries
module.exports = ForecastService
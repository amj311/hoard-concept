const {
    Account,
    TransactionSchedule,
    TransactionEvent,
    XPerMonthSchedule,
    TransactionTemplate,
    OneTimeSchedule,
    MonthSummary,
    Snapshot,
    TransactionType,
} = require("./models");
const { MONTHS } = require("./constants");
const { newMoment } = require("./dateUtils");
const ForecastService = require("./forecastService");
const idGenerator = require("../util/idGenerator");

const checkingID = idGenerator();
let initialAccounts = [
    new Account(checkingID, "checking",20000),
    // new Account("savings",1500),
];


let scheduledTransactions = [
    new TransactionSchedule( // Groceries
        idGenerator(),
        new TransactionTemplate(TransactionType.Expense,"Groceries",200,checkingID, null, 'food'),
        new XPerMonthSchedule(2, new Date(2021,MONTHS.APR,10))
    ),
    new TransactionSchedule( // Utilities
        idGenerator(),
        new TransactionTemplate(TransactionType.Expense,"Groceries",100,checkingID, null),
        new XPerMonthSchedule(1, new Date(2021,MONTHS.APR,10))
    ),
    new TransactionSchedule( // Car Insurance
        idGenerator(),
        new TransactionTemplate(TransactionType.Expense,"Car Insurance",80,checkingID, null),
        new XPerMonthSchedule(1, new Date(2021,MONTHS.APR,10))
    ),
    new TransactionSchedule( // Fun Money
        idGenerator(),
        new TransactionTemplate(TransactionType.Expense,"Fun Money",300,checkingID, null),
        new XPerMonthSchedule(1, new Date(2021,MONTHS.APR,10))
    ),
    new TransactionSchedule( // Child Care
        idGenerator(),
        new TransactionTemplate(TransactionType.Expense,"Child Care",12,checkingID, null),
        new XPerMonthSchedule(1, new Date(2021,MONTHS.APR,10))
    ),
    new TransactionSchedule( // Clozd parttime (should actually be every 2 weeks)
        idGenerator(),
        new TransactionTemplate(TransactionType.Income,"Student Job PT",1000,checkingID, null),
        new XPerMonthSchedule(2, new Date(2022,MONTHS.FEB,15), new Date(2022,MONTHS.MAY,5))
    ),
    
    new TransactionSchedule(
            idGenerator(),
      new TransactionTemplate(TransactionType.Expense,"Graduation Party",100,checkingID, null),
      new OneTimeSchedule(new Date(2022,MONTHS.APR,22))
    ),
  
    new TransactionSchedule( // Clozd fulltime
        idGenerator(),
        new TransactionTemplate(TransactionType.Income,"Full TIme Salary",2500,checkingID, null),
        new XPerMonthSchedule(2, new Date(2022,MONTHS.MAY,15))
    ),
    new TransactionSchedule(
        idGenerator(),
        new TransactionTemplate(TransactionType.Expense,"Rent",550,checkingID, null),
        new XPerMonthSchedule(1, new Date(2020,MONTHS.FEB,5), new Date(2022,MONTHS.JUL,5))
    ),
    new TransactionSchedule(
        idGenerator(),
        new TransactionTemplate(TransactionType.Expense,"Mortgage",2000,checkingID, null),
        new XPerMonthSchedule(1, new Date(2022,MONTHS.AUG,5))
    ),
    new TransactionSchedule(
        idGenerator(),
        new TransactionTemplate(TransactionType.Expense,"Down Payment",20000,checkingID, null),
        new OneTimeSchedule(new Date(2022,MONTHS.JUL,5))
    ),
    new TransactionSchedule(
        idGenerator(),
        new TransactionTemplate(TransactionType.Expense,"Closing Costs",10000,checkingID, null),
        new OneTimeSchedule(new Date(2022,MONTHS.JUL,5))
    ),
  ]


let forecast = ForecastService.computeForecast(initialAccounts, scheduledTransactions, newMoment("2022-02-01"), newMoment("2023-01-01"))

for (let month of forecast) {
    month.printReport();
}


// let start = newMoment(new Date(2022, MONTHS.JAN, 5))
// let day2 = newMoment(new Date(2022,MONTHS.NOV,6))

// let sched = new XPerMonthSchedule(2,new Date(2022,MONTHS.JAN,31))
// console.log(sched.getOccurrencesBetween(start,day2))

// console.log(day2.diff(start, 'M'))

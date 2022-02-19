import {
    Account,
    TransactionSchedule,
    TransactionEvent,
    XPerMonthSchedule,
    TransactionTemplate,
    OneTimeSchedule,
    MonthSummary,
    Snapshot,
} from "./models"
import { MONTHS } from "./constants"
import { newMoment } from "./dateUtils"
import ForecastService from "./forecastService"

let initialAccounts = [
    new Account("checking",20000),
    // new Account("savings",1500),
];

let scheduledTransactions = [
    new TransactionSchedule( // Groceries
        new TransactionTemplate("Groceries",-200,"checking"),
        new XPerMonthSchedule(2, new Date(2021,MONTHS.APR,10))
    ),
    new TransactionSchedule( // Utilities
        new TransactionTemplate("Groceries",-100,"checking"),
        new XPerMonthSchedule(1, new Date(2021,MONTHS.APR,10))
    ),
    new TransactionSchedule( // Car Insurance
        new TransactionTemplate("Car Insurance",-80,"checking"),
        new XPerMonthSchedule(1, new Date(2021,MONTHS.APR,10))
    ),
    new TransactionSchedule( // Fun Money
        new TransactionTemplate("Fun Money",-300,"checking"),
        new XPerMonthSchedule(1, new Date(2021,MONTHS.APR,10))
    ),
    new TransactionSchedule( // Child Care
        new TransactionTemplate("Child Care",-12,"checking"),
        new XPerMonthSchedule(1, new Date(2021,MONTHS.APR,10))
    ),
    new TransactionSchedule(
        new TransactionTemplate("Graduation Party",-100,"checking"),
        new OneTimeSchedule(new Date(2022,MONTHS.APR,22))
    ),

    new TransactionSchedule( // 
        new TransactionTemplate("Student PT",1000,"checking"),
        new XPerMonthSchedule(2, new Date(2022,MONTHS.FEB,15), new Date(2022,MONTHS.MAY,5))
    ),
    new TransactionSchedule( // full-time
        new TransactionTemplate("Full-time Salary",2500,"checking"),
        new XPerMonthSchedule(2, new Date(2022,MONTHS.MAY,15))
    ),
    new TransactionSchedule(
        new TransactionTemplate("Rent",-550,"checking"),
        new XPerMonthSchedule(1, new Date(2020,MONTHS.FEB,5), new Date(2022,MONTHS.JUL,5))
    ),
    new TransactionSchedule(
        new TransactionTemplate("Mortgage",-2000,"checking"),
        new XPerMonthSchedule(1, new Date(2022,MONTHS.AUG,5))
    ),
    new TransactionSchedule(
        new TransactionTemplate("Down Payment",-20000,"checking"),
        new OneTimeSchedule(new Date(2022,MONTHS.JUL,5))
    ),
    new TransactionSchedule(
        new TransactionTemplate("Closing Costs",-10000,"checking"),
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
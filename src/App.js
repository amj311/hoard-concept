import logo from './logo.svg';
import './App.css';
import { createContext, useState } from 'react';
import AccountsList from './components/AccountsList';
import Forecast from './components/Forecast';

const {
  Account,
  TransactionSchedule,
  XPerMonthSchedule,
  TransactionTemplate,
  OneTimeSchedule,
} = require("./core/models")
const { MONTHS } = require("./core/constants");
const { newMoment } = require("./core/dateUtils");
const ForecastService = require("./core/forecastService");


// INITIAL DATA

let initialAccounts = [
  new Account("checking",20000),
  new Account("savings",1500),
]; //<accountId,account>


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
      new TransactionTemplate("Car Insurance",-71,"checking"),
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
  new TransactionSchedule( // Nubill thru january
      new TransactionTemplate("Nubill",1200,"checking"),
      new XPerMonthSchedule(2, new Date(2021,MONTHS.APR,20), new Date(2022,MONTHS.FEB,5))
  ),
  new TransactionSchedule( // Clozd part-time (should actually be every 2 weeks)
      new TransactionTemplate("Clozd PT",1000,"checking"),
      new XPerMonthSchedule(2, new Date(2022,MONTHS.FEB,15), new Date(2022,MONTHS.MAY,5))
  ),
  new TransactionSchedule( // Clozd full-time
      new TransactionTemplate("Clozd Salary",2500,"checking"),
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


export const globalContext = createContext();

function App() {
  let accounts = useState(initialAccounts)
  let scheduled = useState(scheduledTransactions)
  
  return (
    <globalContext.Provider value={{
      accounts, scheduled
    }}>
        
      <div className="App">
        <AccountsList></AccountsList>
        {/* TODO transaction scheduler component */}
        <Forecast></Forecast>
      </div>
      
    </globalContext.Provider>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { createContext, useState } from 'react';
import AccountsList from './components/AccountsList';
import Forecast from './components/Forecast';
import TransactionList from './components/TransactionList';

const {
  Account,
  TransactionSchedule,
  XPerMonthSchedule,
  TransactionTemplate,
  OneTimeSchedule,
  Category,
  TransactionType
} = require("./core/models")
const { MONTHS } = require("./core/constants");
const { newMoment } = require("./core/dateUtils");
const ForecastService = require("./core/forecastService");


// INITIAL DATA

let initialAccounts = [
  new Account("checking",20000),
  new Account("savings",1500),
];


let scheduledTransactions = [
  new TransactionSchedule( // Groceries
      new TransactionTemplate(TransactionType.Expense,"Groceries",-200,"checking", null, 'food'),
      new XPerMonthSchedule(2, new Date(2021,MONTHS.APR,10))
  ),
  new TransactionSchedule( // Utilities
      new TransactionTemplate(TransactionType.Expense,"Groceries",-100,"checking", null),
      new XPerMonthSchedule(1, new Date(2021,MONTHS.APR,10))
  ),
  new TransactionSchedule( // Car Insurance
      new TransactionTemplate(TransactionType.Expense,"Car Insurance",-71,"checking", null),
      new XPerMonthSchedule(1, new Date(2021,MONTHS.APR,10))
  ),
  new TransactionSchedule( // Fun Money
      new TransactionTemplate(TransactionType.Expense,"Fun Money",-300,"checking", null),
      new XPerMonthSchedule(1, new Date(2021,MONTHS.APR,10))
  ),
  new TransactionSchedule( // Child Care
      new TransactionTemplate(TransactionType.Expense,"Child Care",-12,"checking", null),
      new XPerMonthSchedule(1, new Date(2021,MONTHS.APR,10))
  ),
  new TransactionSchedule( // Nubill thru january
      new TransactionTemplate(TransactionType.Income,"Nubill",1200,"checking", null),
      new XPerMonthSchedule(2, new Date(2021,MONTHS.APR,20), new Date(2022,MONTHS.FEB,5))
  ),
  new TransactionSchedule( // Clozd part-time (should actually be every 2 weeks)
      new TransactionTemplate(TransactionType.Income,"Clozd PT",1000,"checking", null),
      new XPerMonthSchedule(2, new Date(2022,MONTHS.FEB,15), new Date(2022,MONTHS.MAY,5))
  ),
  
  new TransactionSchedule(
    new TransactionTemplate(TransactionType.Expense,"Graduation Party",-100,"checking", null),
    new OneTimeSchedule(new Date(2022,MONTHS.APR,22))
  ),

  new TransactionSchedule( // Clozd full-time
      new TransactionTemplate(TransactionType.Income,"Clozd Salary",2500,"checking", null),
      new XPerMonthSchedule(2, new Date(2022,MONTHS.MAY,15))
  ),
  new TransactionSchedule(
      new TransactionTemplate(TransactionType.Expense,"Rent",-550,"checking", null),
      new XPerMonthSchedule(1, new Date(2020,MONTHS.FEB,5), new Date(2022,MONTHS.JUL,5))
  ),
  new TransactionSchedule(
      new TransactionTemplate(TransactionType.Expense,"Mortgage",-2000,"checking", null),
      new XPerMonthSchedule(1, new Date(2022,MONTHS.AUG,5))
  ),
  new TransactionSchedule(
      new TransactionTemplate(TransactionType.Expense,"Down Payment",-20000,"checking", null),
      new OneTimeSchedule(new Date(2022,MONTHS.JUL,5))
  ),
  new TransactionSchedule(
      new TransactionTemplate(TransactionType.Expense,"Closing Costs",-10000,"checking", null),
      new OneTimeSchedule(new Date(2022,MONTHS.JUL,5))
  ),
]

let initialCategories = [
  new Category('food', 'Food')
];


export const globalContext = createContext();

function App() {
  let accounts = useState(initialAccounts)
  let scheduled = useState(scheduledTransactions)
  let categories = useState(initialCategories);
  
  return (
    <globalContext.Provider value={{
      accounts, scheduled, categories
    }}>
        
      <div className="App">
        <AccountsList></AccountsList>
        <TransactionList />
        <Forecast></Forecast>
      </div>
      
    </globalContext.Provider>
  );
}

export default App;

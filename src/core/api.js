import { MONTHS } from "./constants";
import { Account, Category, OneTimeSchedule, TransactionSchedule, TransactionTemplate, TransactionType, XPerMonthSchedule } from "./models";

const apiURL = 'http://localhost:8080';

const api = {
  getUserID: async (username) => {
    return fetch(`${apiURL}/user/${username}/id`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET'
    })
      .then((response) => response.json())
      .then((resBody) => {
        if (resBody.error) {
          throw Error(resBody.error);
        }
        return resBody.id;
      })
      .catch(async () => {
        throw Error('Could not retrieve data');
      });
  },
  getAccounts: (userID) => {
    return [
      new Account("checking",500),
      new Account("savings",20000),
    ];
  },
  getCategories: (userID) => {
    return [
      new Category('food', 'Food')
    ];
  },
  getTransactions: (userID) => {
    return [
      new TransactionSchedule( // Groceries
        new TransactionTemplate(TransactionType.Expense,"Groceries",200,"checking", null, 'food'),
        new XPerMonthSchedule(2, new Date(2021,MONTHS.APR,10))
    ),
    new TransactionSchedule( // Utilities
        new TransactionTemplate(TransactionType.Expense,"Groceries",100,"checking", null),
        new XPerMonthSchedule(1, new Date(2021,MONTHS.APR,10))
    ),
    new TransactionSchedule( // Car Insurance
        new TransactionTemplate(TransactionType.Expense,"Car Insurance",80,"checking", null),
        new XPerMonthSchedule(1, new Date(2021,MONTHS.APR,10))
    ),
    new TransactionSchedule( // Fun Money
        new TransactionTemplate(TransactionType.Expense,"Fun Money",300,"checking", null),
        new XPerMonthSchedule(1, new Date(2021,MONTHS.APR,10))
    ),
    new TransactionSchedule( // Child Care
        new TransactionTemplate(TransactionType.Expense,"Child Care",12,"checking", null),
        new XPerMonthSchedule(1, new Date(2021,MONTHS.APR,10))
    ),
    
    new TransactionSchedule(
      new TransactionTemplate(TransactionType.Expense,"Rent",550,"checking", null),
      new XPerMonthSchedule(1, new Date(2020,MONTHS.FEB,5), new Date(2022,MONTHS.JUL,5))
    ),
    new TransactionSchedule(
        new TransactionTemplate(TransactionType.Expense,"Mortgage",2000,"checking", null),
        new XPerMonthSchedule(1, new Date(2022,MONTHS.AUG,5))
    ),
    
  
    // Recurring Income Sources
    new TransactionSchedule( // Clozd parttime (should actually be every 2 weeks)
        new TransactionTemplate(TransactionType.Income,"Student Job PT",1000,"checking", null),
        new XPerMonthSchedule(2, new Date(2022,MONTHS.FEB,15), new Date(2022,MONTHS.MAY,5))
    ),
    new TransactionSchedule( // Clozd fulltime
      new TransactionTemplate(TransactionType.Income,"Full Time Salary",2500,"checking", null),
      new XPerMonthSchedule(2, new Date(2022,MONTHS.MAY,15))
    ),
  
  
    // Recurring Transfers
    new TransactionSchedule(
      new TransactionTemplate(TransactionType.Transfer,"Transfer",750,"savings","checking"),
      new XPerMonthSchedule(1, new Date(2022,MONTHS.JAN,5), new Date(2022,MONTHS.MAY,5))
    ),
    new TransactionSchedule(
      new TransactionTemplate(TransactionType.Transfer,"Transfer",1700,"savings","checking"),
      new XPerMonthSchedule(2, new Date(2022,MONTHS.MAY,15), new Date(2022,MONTHS.JUL,30))
    ),
    new TransactionSchedule(
      new TransactionTemplate(TransactionType.Transfer,"Transfer",1000,"savings","checking"),
      new XPerMonthSchedule(2, new Date(2022,MONTHS.AUG,15))
    ),
  
  
    // One-Time Transactions
    new TransactionSchedule(
      new TransactionTemplate(TransactionType.Expense,"Graduation Party",100,"checking", null),
      new OneTimeSchedule(new Date(2022,MONTHS.APR,22))
    ),
    new TransactionSchedule(
        new TransactionTemplate(TransactionType.Expense,"Down Payment",20000,"savings", null),
        new OneTimeSchedule(new Date(2022,MONTHS.JUL,5))
    ),
    new TransactionSchedule(
        new TransactionTemplate(TransactionType.Expense,"Closing Costs",10000,"savings", null),
        new OneTimeSchedule(new Date(2022,MONTHS.JUL,5))
    ),
    ]
  },
  addUser: async (username) => { return ({id: 'userID', username})},
  addAccount: (userID, account) => {},
  addCategory: (userID, category) => {},
  addTransaction: (userID, transaction) => {},
  deleteUser: (userID) => {},
  deleteAccount: (accountID) => {},
  deleteCategory: (categoryID) => {},
  deleteTransaction: (transactionID) => {},
};

export default api;

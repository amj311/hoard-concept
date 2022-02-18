import React, {useState, useContext} from 'react';
import { globalContext } from '../App';
import { OneTimeSchedule, TransactionType, XPerMonthSchedule } from '../core/models';
import NewTransactionForm from './NewTransactionForm';
import './TransactionList.css';

const TransactionList = (props) => {
  const [transactions, setTransactions] = useContext(globalContext).scheduled;
  const [categories, setCategories] = useContext(globalContext).categories;
  const [createTransaction, setCreateTransaction] = useState(false);

  const removeScheduledTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const getAmountClass = (template) => {
    if (template.type === TransactionType.Income) return 'income'
    if (template.type === TransactionType.Expense) return 'expense'
    if (template.type === TransactionType.Transfer) return 'transfer'
  }

  return (
    <div>
      <div className='transaction-list-header'>
        <h2>Scheduled Transactions</h2>
        <button className='schedule-transaction-button' onClick={() => setCreateTransaction(!createTransaction)}>{createTransaction ? '✖' : '➕'}</button>
      </div>
      {createTransaction &&
        <NewTransactionForm close={() => setCreateTransaction(false)}/>
      }
      <div className='transaction-list'>
        {transactions.map((transaction, idx) => {
          let template = transaction.template;

          let categoryName;
          if (template.categoryId) {
            const category = categories.find((category) => category.id === template.categoryId);
            if (category) {
              categoryName = category.displayName;
            }
          }
          return (
            <div key={idx} className='transaction'>
              <button className='delete-transaction-button' onClick={()=>removeScheduledTransaction(transaction.id)}>❌</button>
              
              <div className='transaction-details'>
                <div className='transaction-left'>
                  <div className='memo'>{template.memo}</div>
                  { categoryName &&
                    <div className='category'>
                      Category: {categoryName}
                    </div>
                  }
                </div>
                <div className='transaction-right'>
                  <div className={`${getAmountClass(transaction.template)} amount`}>
                    { template.type === TransactionType.Transfer && <span>⇆ </span> }
                    ${template.amount.toLocaleString('en-US')}
                  </div>
                  <div className='account'>
                    Account: {template.targetAccount}
                  </div>
                </div>
              </div>
              
              <div className='schedule-details'>
                {transaction.schedule instanceof OneTimeSchedule &&
                  `One-time on ${transaction.schedule.date.format('MM-DD-YYYY')}`
                }
                {transaction.schedule instanceof XPerMonthSchedule &&
                  <>
                    {`Scheduled ${transaction.schedule.frequencyPerMonth > 1 ? `${transaction.schedule.frequencyPerMonth}  times` : 'once'} a month`}
                    <br></br>
                    {`${transaction.schedule.endDate ?
                      `${transaction.schedule.startDate.format('MM-DD-YYYY')} to ${transaction.schedule.endDate.format('MM-DD-YYYY')}` :
                      `starting ${transaction.schedule.startDate.format('MM-DD-YYYY')}`}`}
                  </>
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionList;

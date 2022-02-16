import React, {useState, useContext} from 'react';
import { globalContext } from '../App';
import { OneTimeSchedule, XPerMonthSchedule } from '../core/models';
import NewTransactionForm from './NewTransactionForm';
import './TransactionList.css';

const TransactionList = (props) => {
  const [transactions, setTransactions] = useContext(globalContext).scheduled;
  const [categories, setCategories] = useContext(globalContext).categories;
  const [createTransaction, setCreateTransaction] = useState(false);

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
          let categoryName;
          if (transaction.template.categoryId) {
            const category = categories.find((category) => category.id === transaction.template.categoryId);
            if (category) {
              categoryName = category.displayName;
            }
          }
          return (
            <div key={idx} className='transaction'>
              <div className='transaction-details'>
                <div className='transaction-left'>
                  {transaction.template.amount < 0 ?
                    <div className='expense amount'>
                      ${-transaction.template.amount}
                    </div> :
                    <div className='income amount'>
                      ${transaction.template.amount}
                    </div>
                  }
                  <div className='account'>
                    Account: {transaction.template.account}
                  </div>
                </div>
                <div className='transaction-right'>
                  <div className='memo'>
                    {transaction.template.memo}
                  </div>
                  {categoryName &&
                    <div className='category'>
                      Category: {categoryName}
                    </div>
                  }
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

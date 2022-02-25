import React, {useState, useContext} from 'react';
import { authContext, globalContext } from '../App';
import api from '../core/api';
import { OneTimeSchedule, TransactionType, XPerMonthSchedule } from '../core/models';
import NewTransactionForm from './NewTransactionForm';
import './TransactionList.css';

const TransactionList = (props) => {
  const {userID} = useContext(authContext);
  const {transactions, categories, accounts, setTransactions} = useContext(globalContext);
  const [createTransaction, setCreateTransaction] = useState(false);

  const removeScheduledTransaction = async (id) => {
    try {
      await api.deleteTransaction(id);
      const transactions = await api.getTransactions(userID);
      setTransactions(transactions);
    } catch (err) {
      alert(err);
    }
  };

  const getAmountClass = (template) => {
    if (template.type === TransactionType.Income) return 'income'
    if (template.type === TransactionType.Expense) return 'expense'
    if (template.type === TransactionType.Transfer) return 'transfer'
  }

  return (
    <div id="transaction-container">
      <div className='transaction-list-header'>
        <h3>Scheduled Transactions</h3>
        <button className='hoardButton' id="schedule-transaction-button" onClick={() => setCreateTransaction(!createTransaction)}>{createTransaction ? '✖' : '+'}</button>
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
              categoryName = category.name;
            }
          }

          const targetAccount = accounts.find((account) => account.id === template.targetAccount).name;

          let originAccount;
          if (template.originAccount) {
            originAccount = accounts.find((account) => account.id === template.originAccount).name;
          }

          return (
            <div key={idx} className='transaction'>
              <button  className="deleteButton" id='delete-transaction-button' onClick={()=>removeScheduledTransaction(transaction.id)}>×</button>
              
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
                    ${(template.amount / 100).toLocaleString('en-US')}
                  </div>
                  {template.type === TransactionType.Transfer ?
                    <div className='account'>
                      From: {originAccount}
                      <br></br>
                      To: {targetAccount}
                    </div>
                    :
                    <div className='account'>
                      Account: {targetAccount}
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

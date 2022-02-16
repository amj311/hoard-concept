import React, {useContext} from 'react';
import { globalContext } from '../App';
import { XPerMonthSchedule } from '../core/models';

const TransactionList = (props) => {
  const [transactions, setTransactions] = useContext(globalContext).scheduled;

  return (
    <div className='transactionList'>
      {transactions.map((schedule, idx) => {
        return (
          <div key={idx} className='transaction'>
            {schedule.template.amount}
          </div>
        );
      })}
    </div>
  );
};

export default TransactionList;

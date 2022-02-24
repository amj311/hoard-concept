import React, {useState, useContext} from 'react';

import { authContext, globalContext } from '../App';
import api from '../core/api';
import { OneTimeSchedule, TransactionSchedule, TransactionTemplate, TransactionType, XPerMonthSchedule } from '../core/models';

const NewTransactionForm = (props) => {
  const {userID} = useContext(authContext);
  const {categories, accounts, setTransactions} = useContext(globalContext);

  const [type, setType] = useState(TransactionType.Expense);
  const [amount, setAmount] = useState(0);
  const [memo, setMemo] = useState('');
  const [targetAcct, setTargetAcct] = useState(undefined);
  const [originAcct, setOriginAcct] = useState(undefined);
  const [category, setCategory] = useState(undefined);
  const [frequencyType, setFrequencyType] = useState('ONCE');
  const [frequencyPeriod, setFrequency] = useState(1);
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(undefined);

  const reset = () => {
    setType(TransactionType.Expense);
    setAmount(0);
    setMemo('');
    setTargetAcct(undefined);
    setOriginAcct(undefined);
    setCategory(undefined);
    setFrequencyType('ONCE');
    setFrequency(1);
    setDate(new Date());
    setStartDate(new Date());
    setEndDate(undefined);
  };

  const scheduleTransaction = async (event) => {
    event.preventDefault();
    if (amount <= 0) {
      alert('Amount must be greater than 0');
      return;
    }
    if (!targetAcct) {
      alert('Please select an account');
      return;
    }
    if (type === TransactionType.Transfer && !originAcct) {
      alert('Please specify the "transfer from" account!');
      return;
    }

    try {
      await api.addTransaction(userID, {type, amount, memo, frequencyType, frequencyPeriod, startDate, endDate, targetAccount: targetAcct, originAccount: originAcct, categoryID: category});
      const transactions = api.getTransactions(userID);
      setTransactions(transactions);
    } catch (err) {
      alert(err);
    }

    reset();
    props.close();
  };

  const dateToValue = (date) => {
    const day = date.getUTCDate();
    const dayString = day < 10 ? `0${day}` : `${day}`;
    const month = date.getUTCMonth() + 1;
    const monthString = month < 10 ? `0${month}` : `${month}`;
    return `${date.getUTCFullYear()}-${monthString}-${dayString}`;
  };

  const valueToDate = (value) => {
    const date = new Date(value);
    if (isNaN(date)) {
      return null;
    }
    const dateAccountingForTimezone = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    return dateAccountingForTimezone;
  };

 
  return (
    <form onSubmit={scheduleTransaction}>
      <b>New Transaction</b>
      <br/>
      <br/>
      
      <label htmlFor='type'>Type: </label>
      <select id='type' name='type' value={type} onChange={(event) => setType(event.target.value)}>
        { Array.from(Object.values(TransactionType)).map(v=>(
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
      <br />
      <label htmlFor='amount'>Amount: </label>
      <input id="amount" type="number" step={0.01} min="0" value={amount} onChange={(event) => setAmount(event.target.valueAsNumber)} ></input>
      <br />

      { type === TransactionType.Transfer ?
        <>
          <label htmlFor='origin'>From: </label>
          <select id='origin' name='origin' value={originAcct} onChange={(event) => setOriginAcct(event.target.value)}>
            <option value={undefined}>Please select an account</option>
            {accounts.map((account) => <option key={account.id} value={account.id}>{account.id}</option>)}
          </select>
          <br/>
          <label htmlFor='target'>To: </label>
          <select id='target' name='target' value={targetAcct} onChange={(event) => setTargetAcct(event.target.value)}>
            <option value={undefined}>Please select an account</option>
            {accounts.map((account) => <option key={account.id} value={account.id}>{account.id}</option>)}
          </select>
        </>
        :
        <>
          <label htmlFor='account'>Account: </label>
          <select id='account' name='account' value={targetAcct} onChange={(event) => setTargetAcct(event.target.value)}>
            <option value={undefined}>Please select an account</option>
            {accounts.map((account) => <option key={account.id} value={account.id}>{account.id}</option>)}
          </select>
        </>
        
      }
      <br/>
      <br/>

      <label htmlFor='memo'>Memo: </label>
      <input id="memo" type="text" value={memo} onChange={(event) => setMemo(event.target.value)}></input>
      <br />

      <label htmlFor='category'>Category: </label>
      <select id='category' name='category' value={category} onChange={(event) => setCategory(event.target.value)}>
        <option value={undefined}>Please select a category</option>
        {categories.map((category) => <option key={category.id} value={category.id}>{category.displayName}</option>)}
      </select>
      <br />
      <br />

      <label htmlFor='frequency'>Frequency: </label>
      <select id='frequency' name='frequency' value={frequencyType} onChange={(event) => setFrequencyType(event.target.value)}>
        <option value='ONCE'>One-time</option>
        <option value='MONTHLY'>Monthly</option>
      </select>
      {frequencyType === 'MONTHLY' &&
        <>
          <input type='number' step={1} value={frequencyPeriod} onChange={(event) => setFrequency(event.target.value)}></input>
          <span> times a month</span>
        </>}
      <br />
      {frequencyType === 'ONCE' ?
        <>
          <label htmlFor='date'>Date: </label>
          <input
            type='date'
            id='date'
            value={dateToValue(date)}
            onChange={(event) => {
              const date = valueToDate(event.target.valueAsNumber);
              if (date) {
                setDate(date);
              }
            }}>
          </input>
        </> :
        <>
          <label htmlFor='startDate'>Start Date: </label>
          <input
            type='date'
            id='startDate'
            value={dateToValue(startDate)}
            onChange={(event) => {
              const date = valueToDate(event.target.valueAsNumber);
              if (date) {
                setStartDate(date)
              }
            }}>
          </input>
          <br />
          <label htmlFor='endDate'>End Date: </label>
          <input
            type='date'
            id='endDate'
            value={endDate ? dateToValue(endDate) : undefined}
            onChange={(event) => {
              const date = valueToDate(event.target.valueAsNumber);
              if (date) {
                setEndDate(date);
              }
            }}>
          </input>
        </>
      }
      <br />
      <input type="submit" value="Schedule Transaction"></input>
    </form>
  );
};

export default NewTransactionForm;

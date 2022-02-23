import React, {useState, useContext} from 'react';

import { globalContext } from '../App';
import { OneTimeSchedule, TransactionSchedule, TransactionTemplate, XPerMonthSchedule } from '../core/models';

const NewTransactionForm = (props) => {
  const [categories, setCategories] = useContext(globalContext).categories;
  const [accounts, setAccounts] = useContext(globalContext).accounts;
  const [transactions, setTransactions] = useContext(globalContext).scheduled;
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState(0);
  const [memo, setMemo] = useState('');
  const [account, setAccount] = useState('none');
  const [category, setCategory] = useState('none');
  const [frequencyType, setFrequencyType] = useState('ONCE');
  const [frequency, setFrequency] = useState(1);
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(undefined);

  const reset = () => {
    setType('expense');
    setAmount(0);
    setMemo('');
    setAccount('none');
    setCategory('none');
    setFrequencyType('ONCE');
    setFrequency(1);
    setDate(new Date());
    setStartDate(new Date());
    setEndDate(undefined);
  };

  const scheduleTransaction = (event) => {
    event.preventDefault();
    if (amount <= 0) {
      alert('Amount must be greater than 0');
      return;
    }
    if (account === 'none') {
      alert('Please select an account');
      return;
    }
    let schedule;
    if (frequencyType === 'ONCE') {
      schedule = new OneTimeSchedule(date);
    } else if (frequencyType === 'MONTHLY') {
      schedule = new XPerMonthSchedule(frequency, startDate, endDate);
    }

    const transactionAmount = type === 'expense' ? -amount : amount;

    const newTransaction = new TransactionSchedule(
      new TransactionTemplate(memo,transactionAmount,account,category === 'none' ? null : category),
      schedule
    );

    setTransactions(transactions.concat([newTransaction]));

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
      <label htmlFor='type'>Type: </label>
      <select id='type' name='type' value={type} onChange={(event) => setType(event.target.value)}>
        <option value='expense'>expense</option>
        <option value='income'>income</option>
      </select>
      <br />
      <label htmlFor='amount'>Amount: </label>
      <input id="amount" type="number" step={0.01} value={amount} onChange={(event) => setAmount(event.target.valueAsNumber)} ></input>
      <br />
      <label htmlFor='memo'>Memo: </label>
      <input id="memo" type="text" value={memo} onChange={(event) => setMemo(event.target.value)}></input>
      <br />
      <label htmlFor='account'>Account: </label>
      <select id='account' name='account' value={account} onChange={(event) => setAccount(event.target.value)}>
        <option value={'none'}>Please select an account</option>
        {accounts.map((account) => <option key={account.id} value={account.id}>{account.id}</option>)}
      </select>
      <br />
      <label htmlFor='category'>Category: </label>
      <select id='category' name='category' value={category} onChange={(event) => setCategory(event.target.value)}>
        <option value={'none'}>Please select a category</option>
        {categories.map((category) => <option key={category.id} value={category.id}>{category.displayName}</option>)}
      </select>
      <br />
      <label htmlFor='frequency'>Frequency: </label>
      <select id='frequency' name='frequency' value={frequencyType} onChange={(event) => setFrequencyType(event.target.value)}>
        <option value='ONCE'>One-time</option>
        <option value='MONTHLY'>Monthly</option>
      </select>
      {frequencyType === 'MONTHLY' &&
        <>
          <input type='number' step={1} value={frequency} onChange={(event) => setFrequency(event.target.value)}></input>
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

import './Dashboard.css';
import { createContext, useContext, useEffect, useState } from 'react';
import AccountsList from '../components/AccountsList';
import Forecast from '../components/Forecast';
import TransactionList from '../components/TransactionList';
import CategoryList from '../components/CategoryList';
import Investment from '../components/Investment';
import { authContext, globalContext } from '../App';
import api from '../core/api';

const { MONTHS } = require("../core/constants");
const { newMoment } = require("../core/dateUtils");
const ForecastService = require("../core/forecastService");

function Dashboard() {
  const {userID, setUserID} = useContext(authContext);
  const {accounts, categories, transactions, setAccounts, setCategories, setTransactions} = useContext(globalContext);
  
  const setData = async () => {
    const accountResult = await api.getAccounts(userID);
    const categoryResult = await api.getCategories(userID);
    const transactionResult = await api.getTransactions(userID);
    setAccounts(accountResult);
    setCategories(categoryResult);
    setTransactions(transactionResult);
  };
  
  const logout = () => {
    setAccounts([]);
    setCategories([]);
    setTransactions([]);
    setUserID(undefined);
  }

  useEffect(() => {
    setData();
  }, []);

  return (
    <div className="App">
      <div id="logo">
        <img id="imgLogo" src="hoardLogo.png"/>
      </div>
      <button className='logout-button' onClick={logout}>Logout</button>
      <AccountsList></AccountsList>
      <CategoryList />
      <TransactionList />
      <Forecast></Forecast>
      <Investment></Investment>
    </div>
  );
}

export default Dashboard;
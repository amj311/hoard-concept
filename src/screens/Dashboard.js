import './Dashboard.css';
import { useContext, useEffect } from 'react';
import AccountsList from '../components/AccountsList';
import Forecast from '../components/Forecast';
import TransactionList from '../components/TransactionList';
import CategoryList from '../components/CategoryList';
import Investment from '../components/Investment';
import { authContext, globalContext } from '../App';
import api from '../core/api';

function Dashboard() {
  const {userID, setUserID} = useContext(authContext);
  const {setAccounts, setCategories, setTransactions} = useContext(globalContext);
  
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
      <button className='logout-button hoard-button' onClick={logout}>Logout</button>
      <div id="logo">
        <img id="imgLogo" src="hoardLogo.png"/>
      </div>
      <AccountsList></AccountsList>
      <CategoryList />
      <TransactionList />
      <Forecast></Forecast>
      <Investment></Investment>
    </div>
  );
}

export default Dashboard;

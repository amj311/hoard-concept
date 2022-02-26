import { useContext, useEffect, useState } from 'react';
import { authContext, globalContext } from '../App';
import api from '../core/api';
import './AccountsList.css';
import '../global.css';

export default function AccountsList() {
  const {userID} = useContext(authContext);
  const {accounts, setAccounts} = useContext(globalContext);
  let [showNew, setShowNew]= useState(false);
  const [startingBalance, setStartingBalance] = useState(0);

  async function createAccount() {
      let name = document.getElementById("newAccountName").value;

      try {
        await api.addAccount(userID, {name, currentBalance: startingBalance });
        const accounts = await api.getAccounts(userID);
        setAccounts(accounts);
      } catch (err) {
        alert(err);
      }
      
      setStartingBalance(0);
      document.getElementById("newAccountName").value = "";
  }

  async function removeAccount(acct) {
    try {
      await api.deleteAccount(acct.id);
      const accounts = await api.getAccounts(userID);
      setAccounts(accounts);
    } catch (err) {
      alert(err);
    }
  }

  function toggleNew() {
    setShowNew(!showNew)
  }

  return (
    <div className="accounts-list">
        <div className='header-with-button'>
            <h2>Accounts</h2>
            <button className="hoard-button button-in-header" onClick={toggleNew}>{showNew? '×' : '+'}</button>
        </div>
        { showNew ?
            <form className="newAccountContainer">
              <b>New Account</b>
              <br/>
              <br/>
                <label htmlFor='newAccountName'>Name: </label>
                <input type="text" id="newAccountName" />
                <br />
                <label htmlFor='newAccountBalance'>Starting balance: </label>
                <input id="newAccountBalance" type="number" step={0.01} min="0" value={startingBalance / 100} onChange={(event) => setStartingBalance(event.target.valueAsNumber * 100)} onWheel={(e) => e.target.blur()}></input>
                <br></br>
                <button className="hoard-button" onClick={createAccount}>Create</button>
            </form>
            :
            null
        }
        <div className="list">
            {accounts.map(acct=>(
                <div className="item" key={acct.id}>
                    <div style={{flexGrow:1}}>{acct.name}</div>
                    <div>${(acct.balance / 100).toLocaleString('en-US')}</div>
                    <button className="delete-button" id="delete-account-button" onClick={()=>removeAccount(acct)}>×</button>
                </div>
            ))}
        </div>
    </div>
  );
}

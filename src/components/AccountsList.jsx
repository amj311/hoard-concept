import { useContext, useEffect, useState } from 'react';
import { authContext, globalContext } from '../App';
import api from '../core/api';
import './AccountsList.css'

export default function AccountsList() {
  const {userID} = useContext(authContext);
  const {accounts, setAccounts} = useContext(globalContext);
  let [showNew, setShowNew]= useState(false);

  useEffect(() => {
    console.log('accounts');
    console.log(accounts);
  }, [accounts]);

  async function createAccount(data) {
      let name = document.getElementById("newAccountName").value;
      let balance = document.getElementById("newAccountBalance").value;

      try {
        await api.addAccount(userID, {name, currentBalance: balance });
        const accounts = await api.getAccounts(userID);
        setAccounts(accounts);
      } catch (err) {
        alert(err);
      }
      
      document.getElementById("newAccountId").value = "";
      document.getElementById("newAccountBalance").value = "";
  }

  function removeAccount(acct) {
    setAccounts(accounts.filter(a=>a!==acct))
  }

  function toggleNew() {
    setShowNew(!showNew)
  }

  return (
    <div className="accounts-list">
        <div>
            <h3>Accounts</h3>
            <button onClick={toggleNew}>{showNew? '✖' : '➕'}</button>
        </div>
        { showNew ?
            <div>
                <label htmlFor='newAccountName'>Name: </label>
                <input id="newAccountName" />
                <br />
                <label htmlFor='newAccountBalance'>Starting balance: </label>
                <input id="newAccountBalance" />
                <button onClick={createAccount}>Create</button>
            </div>
            :
            null
        }
        <div className="list">
            {accounts.map(acct=>(
                <div className="item" key={acct.id}>
                    <div style={{flexGrow:1}}>{acct.id}</div>
                    <div>${(acct.balance * 100).toLocaleString('en-US')}</div>
                    <button onClick={()=>removeAccount(acct)}>❌</button>
                </div>
            ))}

        </div>
    </div>
  );
}

import { useContext, useState } from 'react';
import { globalContext } from '../App';
// import './Forecast.css'

export default function Forecast() {

  let [accounts, setAccounts] = useContext(globalContext).accounts;
  let [showNew, setShowNew]= useState(false)

  function createAccount(data) {
      let id = document.getElementById("newAccountId").value;
      let balance = document.getElementById("newAccountBalance").value;
      setAccounts(accounts.concat([{id, balance}]))
      
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
            <h3>Accounts</h3><button onClick={toggleNew}>{showNew? '✖' : '➕'}</button>
        </div>
        { showNew ?
            <div>
                <input id="newAccountId" />
                <input id="newAccountBalance" />
                <button onClick={createAccount}>Create</button>
            </div>
            :
            null
        }
        <div className="list">
            { accounts.map(acct=>(
                <div className="item" key={acct.id}>
                    <div style={{flexGrow:1}}>{acct.id}</div>
                    <div>{acct.balance}</div>
                    <button onClick={()=>removeAccount(acct)}>❌</button>
                </div>
            ))}

        </div>
    </div>
  );
}

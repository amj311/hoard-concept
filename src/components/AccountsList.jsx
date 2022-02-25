import { useContext, useState } from 'react';
import { globalContext } from '../App';
import './AccountsList.css'

export default function AccountsList() {

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
            <h3 class="accountsHeader">Accounts</h3>
            <div id="acountsListButtonContainer">
              <button className="hoardButton" onClick={toggleNew}>{showNew? '×' : '+'}</button>
            </div>
        </div>
        { showNew ?
            <div class="newAccountContainer">
                <input id="newAccountId" placeholder='name'/>
                <input id="newAccountBalance" placeholder='balance'/>
                <button class="hoardButton" onClick={createAccount}>Create</button>
            </div>
            :
            null
        }
        <div className="list">
            { accounts.map(acct=>(
                <div className="item" key={acct.id}>
                    <div style={{flexGrow:1}}>{acct.id}</div>
                    <div>${acct.balance.toLocaleString('en-US')}</div>
                    <button className="deleteButton" id="delete-account-button" onClick={()=>removeAccount(acct)}>×</button>
                </div>
            ))}

        </div>
    </div>
  );
}

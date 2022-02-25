import React, {useState, useContext} from 'react';
import { globalContext } from '../App';
import { OneTimeSchedule, XPerMonthSchedule } from '../core/models';
import './Investment.css';

const Investment = () => {
    let [accounts] = useContext(globalContext).accounts;
    let [transactions] = useContext(globalContext).scheduled;
    var moneyAlreadyInBank = 0;
    var totalOneTimeIncome = 0;
    var totalOneTimeExpenses = 0;
    var totalMonthlyExpenses = 0;
    var totalMonthlyIncome = 0;

    accounts.forEach(account => moneyAlreadyInBank += account.balance );

    transactions.forEach(transaction =>  {
        if(transaction.schedule instanceof XPerMonthSchedule) {
            if(transaction.template.type == "Expense") {
                totalMonthlyExpenses += (transaction.template.amount * transaction.schedule.frequencyPerMonth)
            }
            else if (transaction.template.type == "Income") {
                totalMonthlyIncome += (transaction.template.amount * transaction.schedule.frequencyPerMonth)
            }
        }
        else if(transaction.schedule instanceof OneTimeSchedule) {
            if(transaction.template.type == "Expense") {
                totalOneTimeExpenses += transaction.template.amount
            }
            else if(transaction.template.type == "Income") {
                totalOneTimeIncome += transaction.template.amount
            }
            else {
                console.log('Unknown transaction type')
            }
        }
    });

    var OneTimeInvestmentRecommendation = (moneyAlreadyInBank - totalOneTimeExpenses + totalOneTimeIncome) * .8
    if(OneTimeInvestmentRecommendation < 0) { OneTimeInvestmentRecommendation = 0 }

    var MonthlyInvestmentRecommendation = (totalMonthlyIncome - totalMonthlyExpenses) * .8
    if(MonthlyInvestmentRecommendation < 0) { MonthlyInvestmentRecommendation = 0 }

  return (
    <div id="investment-containter">
        <h2 id="investment-header">Hoard Investment Recommendation</h2>
        <p class="investment-info">(After looking at your finances we have a recommendation for you)</p>
        <h3 class="recommendation-header">We recommend you make a one time investment soon of</h3>
            <h2 class="recommendation">${OneTimeInvestmentRecommendation}</h2>
        <h3 class="recommendation-header">We recommend you make a monthly investment of</h3>
            <h2 class="recommendation">${MonthlyInvestmentRecommendation}</h2>
    </div>
  )
};

export default Investment;


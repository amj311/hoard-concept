import { useContext, useEffect, useState } from 'react';
import { globalContext } from '../App';
import ForecastService from '../core/forecastService';
// import './Forecast.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Financial Forecast',
    },
  },
};

const colors = ['#00bbff', '#00dd44']

export default function Forecast() {

  let [accounts] = useContext(globalContext).accounts;
  let [transactions] = useContext(globalContext).scheduled;

  let [forecast, setForecast] = useState([]);
  let [chartData, setChartData] = useState(null); // {labels, datasets: {data, label, ...options} }

  useEffect(()=>{
    setForecast(
      ForecastService.computeForecast(accounts, transactions, new Date(), new Date(2023,0,1))
    )
  }, [accounts, transactions])

  
  useEffect(()=>{
    // console.log("new forecast:", forecast)
    if (!forecast || forecast.length === 0) return;
    let labels = [];
    let datasets = new Map(); // <accountId, account dataseries>
    labels.push("Today");
    accounts.forEach((account,i)=>{
      let color = colors[i%colors.length]
      datasets.set(account.id, {label: account.id, data: [account.balance], borderColor:color, backgroundColor:color})
    })
    for (let month of forecast) {
      labels.push(month.date.format("MM-YYYY"))
      //month.printReport()
      for (let [accountId,account] of month.snapshots[month.snapshots.length-1].balances) {
        datasets.get(accountId).data.push(account.balance)
      }
    }
    setChartData({labels,datasets: Array.from(datasets.values())})
    // console.log("data: ",{labels,datasets})
    // console.log("forecst finished, here's the transactions", transactions)
  }, [forecast])


  return (
    <div className="accounts-list">
      <h3>Forecast</h3>
      { chartData ?
        <Line options={chartOptions} data={chartData} />
      :
        null
      }
    </div>
  );
}

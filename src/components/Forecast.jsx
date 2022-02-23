import { useContext, useEffect, useState } from 'react';
import { globalContext } from '../App';
import ForecastService from '../core/forecastService';
import './Forecast.css'
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

const ForecastLength = {
  Week: 'Week',
  Month: 'Month',
  Quarter: 'Quarter',
  Year: 'Year',
  ThreeYears: '3 Year',
  FiveYears: '5 Year',
  TenYears: '10 Year',
  Custom: 'Custom',
};

export default function Forecast() {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  const [endDate, setEndDate] = useState(date);
  const [forecastLength, setForecastLength] = useState(ForecastLength.Year);

  let {accounts, transactions} = useContext(globalContext);

  let [forecast, setForecast] = useState([]);
  let [chartData, setChartData] = useState(null); // {labels, datasets: {data, label, ...options} }


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

  useEffect(() => {
    const now = new Date();
    console.log(now);
    let end = new Date();
    switch(forecastLength) {
      case ForecastLength.Day:
        end.setDate(now.getDate() + 1);
        break;
      case ForecastLength.Week:
        end.setDate(now.getDate() + 7);
        break;
      case ForecastLength.Month:
        end.setMonth(now.getMonth() + 1);
        break;
      case ForecastLength.Quarter:
        end.setMonth(now.getMonth() + 3);
        break;
      case ForecastLength.Year:
        end.setFullYear(now.getFullYear() + 1);
        break;
      case ForecastLength.ThreeYears:
        end.setFullYear(now.getFullYear() + 3);
        break;
      case ForecastLength.FiveYears:
        end.setFullYear(now.getFullYear() + 5);
        break;
      case ForecastLength.TenYears:
        end.setFullYear(now.getFullYear() + 10);
        break;
      default:
        return;
    }
    console.log(end);
    setEndDate(end);
  }, [forecastLength]);

  useEffect(()=>{
    setForecast(
      ForecastService.computeForecast(accounts, transactions, new Date(), endDate)
    );
  }, [accounts, transactions, endDate])

  
  useEffect(()=>{
    console.log("new forecast:", forecast)
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
      if (month.snapshots.length > 0) {
        for (let [accountId,account] of month.snapshots[month.snapshots.length-1].balances) {
          datasets.get(accountId).data.push(account.balance)
        }
      }
    }
    setChartData({labels,datasets: Array.from(datasets.values())})
    // console.log("data: ",{labels,datasets})
    // console.log("forecst finished, here's the transactions", transactions)
  }, [forecast])


  return (
    <div className="accounts-list">
      <h3>Forecast</h3>
      <div className='length-choices'>
        {Object.entries(ForecastLength).map(([k, v]) => {
          return (
            <label key={k}><input type="radio" name="length" value={v} checked={forecastLength === v} onChange={(event) => setForecastLength(event.target.value)}/><span>{v}</span></label>
          );
        })}
        {forecastLength === ForecastLength.Custom &&
          <input
            className='date-picker'
            type="date"
            value={dateToValue(endDate)}
            onChange={(event) => {
              const date = valueToDate(event.target.valueAsNumber);
              if (date) {
                setEndDate(date);
              }
            }}>
          </input>
        }
      </div>
      { chartData ?
        <Line options={chartOptions} data={chartData} />
      :
        null
      }
    </div>
  );
}

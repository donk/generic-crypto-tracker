import React, {useEffect, useState} from 'react';
import 'chart.js';
import {LineChart} from 'react-chartkick';


import axios from 'axios';
import moment from 'moment';



const CryptoChart = (props) => {
  const [chartData,setChartData] = useState({});
  const [delay,setDelay] = useState(1000);

  const chartOpts = {
    pointRadius: 0,
    pointHitRadius:5,
    backgroundColor:'rgba(255,255,255,0.3)',
    borderColor:'rgba(0,250,50,0.6)'
  }

  const getChart = () => {
    setDelay(60000);
    axios.get(`https://api.coingecko.com/api/v3/coins/${props.coin}/market_chart?vs_currency=usd&days=1`)
      .then((result) => {
        const formatted = result.data.prices.filter((price,index) => {
          return (index % 2 === 0 && index > result.data.prices.length - 200);
        })
        .map((price,index) => {
          price[0] = moment(price[0]).toDate();
          return price;
        });
        setChartData(formatted);
      }).catch((e) => {
        console.log(e.message);
        setDelay(5000);
      })
  }

  useEffect(() => {
    const timer = setTimeout(getChart,delay);

    return () => {
      clearTimeout(timer);
    }
  },[chartData])

  return(
    <div className={`collapsable ${props.collapsed ? '' : 'collapsed' }`}>
      <LineChart prefix="$" thousands="," 
        data={chartData} min={null} height={150}  
        round={4} zeros={true} dataset={chartOpts}
        
        />
    </div>
  )
}

export default CryptoChart;
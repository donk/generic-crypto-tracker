import React, { useCallback, useEffect, useState } from 'react';
import 'chart.js';
import { LineChart } from 'react-chartkick';
import axios from 'axios';
import moment from 'moment';

// Pulled this out so it doesn't need to be readded to memory every render
// You can add it back if you wanna make it customizable later,
// or you can just use Object.assign or spread to extend it
const CHART_OPTIONS = {
  pointRadius: 0,
  pointHitRadius: 5,
  backgroundColor: 'rgba(255,255,255,0.3)',
  borderColor: 'rgba(0,250,50,0.6)',
};

const CryptoChart = props => {
  const [chartData, setChartData] = useState({});
  const [delay, setDelay] = useState(2000);

  let mounted = true;

  // Async/Await
  const tick = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${props.coin}/market_chart?vs_currency=usd&days=1`
      );

      const formatted = data.prices
        .filter((_, index) => {
          return index % 2 === 0 && index > data.prices.length - 200;
        })
        .map(price => {
          price[0] = moment(price[0]).toDate();
          return price;
        });
      if (!mounted) return;
      setChartData(formatted);
    } catch (e) {
      if (!mounted) return;
      console.log(e.message);
      setDelay(15000);
    }
  }, [props.coin]);

  useEffect(() => {
    tick();
    const timer = setTimeout(tick, delay);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [chartData, delay, tick]);

  return (
    <div className={`collapsable ${props.collapsed ? 'collapsed' : ''}`}>
      <LineChart
        prefix="$"
        thousands=","
        data={chartData}
        min={null}
        height={150}
        round={4}
        zeros={true}
        dataset={CHART_OPTIONS}
      />
    </div>
  );
};

export default CryptoChart;

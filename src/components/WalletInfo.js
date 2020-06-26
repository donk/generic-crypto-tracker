import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NumberFormat from 'react-number-format';

import WalletHistory from './WalletHistory';

const Title = styled.div`
  text-transform: uppercase;
  text-align: left;
  margin-bottom: 5px;
  font-size: 1em;
  color: rgba(100, 100, 160, 1);

  div {
    color: rgba(255, 255, 255, 0.6);
    div {
      display: inline-block;
      font-size: 0.65em;
      margin-right: 10px;
    }
  }
`;

const Overview = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 0.8em;
  color: rgba(255, 255, 2552, 0.6);
`;

const Value = styled.div`
  font-size: 2em;
  color: white;
  margin-top: 5px;
`;

const Flexxy = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const OverviewCard = props => {
  return (
    <Overview>
      {props.title}
      <Value>
        {props.value}
        {props.children}
      </Value>
    </Overview>
  );
};

const WalletInfo = props => {
  const [addresses, setAddresses] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [totalCoins, setTotalCoins] = useState(0);
  const [usdTotal, setUsdTotal] = useState(0);
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log(loading, 'loading'); // Why I her

  const getTotals = async addresses => {
    try {
      let total = 0;
      addresses.forEach(address => {
        total += address.final_balance;
      });

      const prices = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      setUsdTotal((prices.data.bitcoin.usd * (total / 100000000)).toFixed(2));
      setTotalCoins(total / 100000000);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        setAddresses(props.wallet.split('|'));
        const { data } = await axios.get(`http://localhost:3001/wallet/${props.wallet}?confirmations=6`);
        if (data.error) throw Error(data.error);
        if (!mounted) return;
        getTotals(data.addresses);
        setTransactions(data.txs);
        setLoading(false);
      } catch (e) {
        if (!mounted) return;
        console.log('invalid', e.message);
        setInvalid(true);
      }
    };
    fetchData();
    return () => mounted = false;
  }, [props.wallet]);

  return (
    <>
      <Title>
        <span style={{ color: invalid ? 'red' : '' }}>BITCOIN ADDRESS {invalid ? '- INVALID' : ''}</span>
        <div>
          {addresses.map(address => {
            return <div key={address}>{address}</div>;
          })}
        </div>
      </Title>
      {!invalid && (
        <>
          <Flexxy>
            <OverviewCard title="BITCOIN HELD" value={totalCoins} />
            <OverviewCard title="USD VALUE">
              <NumberFormat
                fixedDecimalScale={true}
                value={usdTotal}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            </OverviewCard>
          </Flexxy>
          {props.children}
          <WalletHistory collapsed={props.collapsed} transactions={transactions} addresses={addresses} />
        </>
      )}
    </>
  );
};

export default WalletInfo;

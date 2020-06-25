import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NumberFormat from 'react-number-format';

import WalletHistory from './WalletHistory';

const Title = styled.div`
  text-transform:uppercase;
  text-align:left;
  margin-bottom:5px;
  font-size:1em;
  color:rgba(100,100,160,1);

  div{
    color:rgba(255,255,255,0.6);
    div{
      display:inline-block;
      font-size:0.65em;
      margin-right:10px;
    }
  }
`;

const Overview = styled.div`
  text-align:center;
  margin-top:20px;
  font-size:0.8em;
  color:rgba(255,255,2552,0.6);
`;

const Value = styled.div`
  font-size:2em;
  color:white;
  margin-top:5px;
`;

const Flexxy = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content:space-around;
`;


const OverviewCard = (props) => {
  return(
    <Overview>
      {props.title}
      <Value> 
        {props.value}
        {props.children}
      </Value>
    </Overview>
  )
}



const WalletInfo = (props) => {
  const [addresses,setAddresses] = useState([]);
  const [transactions,setTransactions] = useState([]);
  const [totalCoins,setTotalCoins] = useState(0);
  const [usdTotal,setUsdTotal] = useState(0);

  const getTotals = (addresses) => {
    let total = 0;
    addresses.forEach((address) => {
      total += address.final_balance;
    })
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd').then((prices) => {
      setUsdTotal((prices.data.bitcoin.usd * (total/100000000)).toFixed(2));
    })
    //satoooooshi
    setTotalCoins(total/100000000);
  }

  useEffect(() => {
    setAddresses(props.wallet.split('|'));
    axios.get(`http://localhost:3001/wallet/${props.wallet}?confirmations=6`)
    .then((result) => {
      console.log(result.data);
      getTotals(result.data.addresses);
      setTransactions(result.data.txs);
    });
  },[])

  return(
    <>
      <Title>
        BITCOIN WALLET
        <div>
          {addresses.map((address) => {
            return <div key={address}>{address}</div>
          })}
        </div>
      </Title>
      <Flexxy>
        <OverviewCard title="BITCOIN HELD" value={totalCoins} />
        <OverviewCard title="USD VALUE">
        <NumberFormat fixedDecimalScale={true} value={usdTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        </OverviewCard>
      </Flexxy>
      <WalletHistory collapsed={props.collapsed} transactions={transactions} addresses={addresses}/>
    </>
  )
}

export default WalletInfo;
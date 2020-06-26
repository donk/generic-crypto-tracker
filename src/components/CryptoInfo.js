import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import BeatLoader from "react-spinners/BeatLoader";
import NumberFormat from 'react-number-format';

import InfoItem from './InfoItem';

const Title = styled.div`
  text-transform:uppercase;
  text-align:left;
  margin-bottom:5px;
  font-size:0.9em;
  color:rgba(100,100,160,1);
`;

const CurPrice = styled.div`
  position:absolute;
  right:10px;
  top:10px;
  font-size:1.3em;
  font-weight:bold;
`;

const Thumb = styled.img`
  height:1.8em;
`;

const Symbol = styled.span`
  text-transform:uppercase;
  font-size:2em;
  padding:0 2px;
  font-weight:bold;
`;

const InfoFrame = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content:space-around;
  margin-bottom:10px;
`;

const formatCurrency = (num) => {
  if (!num) return;
  return num.toFixed(6).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1');
}

const CryptoInfo = (props) => {
  const [curPrice, setCurPrice] = useState ("");
  const [cryptoData,setCryptoData] = useState({change_24:{}});
  const [delay,setDelay] = useState(1000);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    setDelay(60000);
    const timer = setInterval(() => {
      axios.get(`https://api.coingecko.com/api/v3/coins/${props.coin}?tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`)
      .then((result) => {
        console.log(result.data);
        const data = result.data;
        const formattedInfo = {
          thumb: data.image.thumb,
          ath: data.market_data.ath.usd,
          change_24: {
            value: formatCurrency(data.market_data.price_change_24h_in_currency.usd),
            percent: formatCurrency(data.market_data.price_change_percentage_24h_in_currency.usd),
            high: formatCurrency(data.market_data.high_24h.usd),
            low: formatCurrency(data.market_data.low_24h.usd)
          },
          links:{
            homepage: data.links.homepage[0],
            forum: data.links.official_forum_url[0],
            reddit: data.links.subreddit_url,
            facebook: data.links.facebook_username,
            twitter: data.links.twitter_screen_name,
            github: data.links.repos_url.github[0]
          },
          cap: data.market_data.market_cap.usd,
          cur_price: formatCurrency(data.market_data.current_price.usd),
          symbol: data.symbol
        }
        setCryptoData(formattedInfo);
        setCurPrice(formattedInfo.cur_price);
        setLoading(false);
      }).catch((e) => {
        console.log(e.message);
        setDelay(100000);
      })
    },delay);

    return () => {
      setDelay(5000);
      clearInterval(timer);
    };
  },[curPrice])


  //TODO: Maybe make loading a provider, or rethink this
  return(
    <>
      <Title>
        <Thumb src={cryptoData.thumb} /> 
        <Symbol> {cryptoData.symbol} </Symbol> 
        {props.coin} 
      </Title> 
      <CurPrice>
      <NumberFormat value={curPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        <BeatLoader
          size={10}
          color={"white"}
          loading={loading}
        />
      </CurPrice>
      <InfoFrame>
        <InfoItem loading={loading} title="24H CHANGE" price={cryptoData.change_24.value} percent={cryptoData.change_24.percent}  split="|"/>
        <InfoItem loading={loading} title="24H HIGH" price={cryptoData.change_24.high} />
        <InfoItem loading={loading} title="24H LOW" price={cryptoData.change_24.low} />
        <InfoItem loading={loading} title="ALL TIME HIGH" price={cryptoData.ath} />
        <InfoItem loading={loading} title="MARKET CAP" price={cryptoData.cap} />
      </InfoFrame>
    </>
  )
}

export default CryptoInfo;
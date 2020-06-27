import React, { useCallback, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';
import NumberFormat from 'react-number-format';

import InfoItem from './InfoItem';

const Title = styled.div`
  text-transform: uppercase;
  text-align: left;
  margin-bottom: 5px;
  font-size: 0.9em;
  color: rgba(100, 100, 160, 1);
`;

const CurPrice = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 1.3em;
  font-weight: bold;
`;

const Thumb = styled.img`
  height: 1.8em;
`;

const Symbol = styled.span`
  text-transform: uppercase;
  font-size: 2em;
  padding: 0 2px;
  font-weight: bold;
`;

const InfoFrame = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const formatCurrency = num => {
  if (!num) return;
  // Lil Bit That JS has for currency
  // Use -> new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)
  // if you want to include the $ sign
  // You could probably use the one above in place ofo the react-number-format library
  return new Intl.NumberFormat().format(num);
};

const CryptoInfo = props => {
  const [curPrice, setCurPrice] = useState('');
  const [cryptoData, setCryptoData] = useState({ change_24: {} });
  const [loading, setLoading] = useState(true);

  const refreshInterval = 30000;

  const mounted = useRef(true);

  const tick = useCallback(async () => {
    try {
      console.log('tick!', props.coin);
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${props.coin}?tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`
      );

      const { image, market_data, links, symbol } = data;
      const formattedInfo = {
        thumb: image.thumb,
        ath: market_data.ath.usd,
        change_24: {
          value: formatCurrency(market_data.price_change_24h_in_currency.usd),
          percent: formatCurrency(market_data.price_change_percentage_24h_in_currency.usd),
          high: formatCurrency(market_data.high_24h.usd),
          low: formatCurrency(market_data.low_24h.usd),
        },
        links: {
          homepage: links.homepage[0],
          forum: links.official_forum_url[0],
          reddit: links.subreddit_url,
          facebook: links.facebook_username,
          twitter: links.twitter_screen_name,
          github: links.repos_url.github[0],
        },
        cap: market_data.market_cap.usd,
        cur_price: formatCurrency(market_data.current_price.usd),
        symbol,
      };
      if (!mounted.current) return;
      setCryptoData(formattedInfo);
      setCurPrice(formattedInfo.cur_price);
      setLoading(false);
    } catch (e) {
      if (!mounted.current) return;
      console.log(e.message);
    }
  }, [props.coin]);

  useEffect(() => {
    tick();
    const timer = setInterval(tick, refreshInterval);
    return () => {
      mounted.current = false;
      clearInterval(timer);
    };
  }, [tick]);

  //TODO: Maybe make loading a provider, or rethink this
  return (
    <>
      <Title>
        <Thumb src={cryptoData.thumb} />
        <Symbol> {cryptoData.symbol} </Symbol>
        {props.coin}
      </Title>
      <CurPrice>
        <NumberFormat value={curPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        <BeatLoader size={10} color={'white'} loading={loading} />
      </CurPrice>
      <InfoFrame>
        <InfoItem
          loading={loading}
          title="24H CHANGE"
          price={cryptoData.change_24.value}
          percent={cryptoData.change_24.percent}
          split="|"
        />
        <InfoItem loading={loading} title="24H HIGH" price={cryptoData.change_24.high} />
        <InfoItem loading={loading} title="24H LOW" price={cryptoData.change_24.low} />
        <InfoItem loading={loading} title="ALL TIME HIGH" price={cryptoData.ath} />
        <InfoItem loading={loading} title="MARKET CAP" price={cryptoData.cap} />
      </InfoFrame>
    </>
  );
};

export default CryptoInfo;

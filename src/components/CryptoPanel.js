import React from 'react';

import CryptoInfo from './CryptoInfo'
import CryptoChart from './CryptoChart';


const CryptoCard = (props) => {
  return(
    <>
      { props.coin &&
        <>
          <CryptoInfo coin={props.coin}/>
          <CryptoChart coin={props.coin}/>
        </>
      }
    </>
  )
}

export default CryptoCard;
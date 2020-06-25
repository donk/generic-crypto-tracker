import React from 'react';

import CryptoInfo from './CryptoInfo'
import CryptoChart from './CryptoChart';

import WalletInfo from './WalletInfo';


const CryptoCard = (props) => {
  return(
    <>
      { props.coin &&
        <>
          <CryptoInfo coin={props.coin}/>
          <CryptoChart coin={props.coin}/>
        </>
      }
      { props.wallet &&
        <>
          <WalletInfo wallet={props.wallet} />
        </>
      }
    </>
  )
}

export default CryptoCard;
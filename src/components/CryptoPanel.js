import React, {useState} from 'react';

import CryptoInfo from './CryptoInfo'
import CryptoChart from './CryptoChart';

import WalletInfo from './WalletInfo';


const CryptoCard = (props) => {
  const [collapsed,setCollapsed] = useState(false);

  const doClick = () => {
    console.log(collapsed);
    setCollapsed(!collapsed);
  }

  return(
    <div onClick={doClick}>
      { props.coin &&
        <>
          <CryptoInfo  coin={props.coin}/>
          <CryptoChart collapsed={collapsed} coin={props.coin}/>
        </>
      }
      { props.wallet &&
        <>
          <WalletInfo collapsed={collapsed} wallet={props.wallet} />
        </>
      }
    </div>
  )
}

export default CryptoCard;
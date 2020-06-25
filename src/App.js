import React, {useState,useEffect} from 'react';
import './App.css';

import Card from './components/Card';
import CryptoPanel from './components/CryptoPanel';

const defaultTrackers = {
  coins:[
    {
      value:'bitcoin',
      hidden:true
    },{
      value:'ethereum',
      hidden:false
    }
  ],
  wallets:[
    {
      value:'3PLLdazCQE4EoNx3CkV6qZ4nxTUqBDBdiB',
      hidden:true
    },{
      value:'3NbqHs4mf3JXJN3owsr8A9Z1r1z4Dgnm9t',
      hidden:true
    }
  ]
}

const App = () => {
  const localCoin = JSON.parse(localStorage.getItem('coin1'));
  const localWallet = JSON.parse(localStorage.getItem('wallet1'));

  const [trackedCoins,setTrackedCoins] = useState(
    localCoin || defaultTrackers.coins
  )
  const [trackedWallets,setTrackedWallets] = useState(
    localWallet || defaultTrackers.wallets
  )

  let addTracker = (type,value) => {
    let tmp = {value:value,hidden:false};
    if (type === "coins"){
      localStorage.setItem('coin1',JSON.stringify([...trackedWallets,tmp]))
      setTrackedCoins([...trackedCoins,tmp]);
    }else{
      localStorage.setItem('wallet1',JSON.stringify([...trackedWallets,tmp]))
      setTrackedWallets([...trackedWallets,tmp]);
    }
  }


  return (
    <div className="App">
      <div className="Content">
        <div className="Navigation">
          <div onClick={() => addTracker('coins','dogecoin')} >
            Do the thing {trackedCoins.length};
          </div>
        </div>
        <div className="Cards">
          {trackedCoins.map((v,i) => {
            return(
            <Card key={v.value}>
              <CryptoPanel hidden={v.hidden} coin={v.value} />
            </Card>
            )
          })}

          {trackedWallets.map((v,i) => {
            return(
            <Card key={v.value}>
              <CryptoPanel hidden={v.hidden} wallet={v.value} />
            </Card>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

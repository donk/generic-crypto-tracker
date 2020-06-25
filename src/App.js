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
  ],
  last:0
}

const def = {
  coins:[],
  wallets:[]
}

const App = () => {
  const localc = JSON.parse(localStorage.getItem('coins1'));
  const localw = JSON.parse(localStorage.getItem('wallets1'))
  const [coins,setCoins] = useState(localc || def.coins);
  const [wallets,setWallets] = useState(localw || def.wallets);

  let addTracker = (type,value) => {
    let tmp = {value:value,hidden:false};
    if (type === "coins"){
      localStorage.setItem('coins1',JSON.stringify([...coins,tmp]));
      return setCoins([...coins,tmp])
    }else{
      localStorage.setItem('wallets1',JSON.stringify([...wallets,tmp]));
      return setWallets([...wallets,tmp]);
    }
  }


  return (
    <div className="App">
      <div className="Content">
        <div className="Navigation">
          <div onClick={() => addTracker('coins','dogecoin')} >
            Do the thing {coins.length};
          </div>
          <div onClick={() => addTracker('wallets','3PLLdazCQE4EoNx3CkV6qZ4nxTUqBDBdiB')} >
            Do the thing {wallets.length};
          </div>
        </div>
        <div className="Cards">
          {coins.map((v,i) => {
            return(
            <Card key={v.value}>
              <CryptoPanel hidden={v.hidden} coin={v.value} />
            </Card>
            )
          })}

          {wallets.map((v,i) => {
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

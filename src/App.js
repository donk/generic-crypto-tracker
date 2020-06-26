import React, {useState,useEffect} from 'react';
import './App.css';
import Select from 'react-select';
import axios from 'axios';

import list from './components/CoinList.json';

import Card from './components/Card';
import CryptoPanel from './components/CryptoPanel';


const defaultTracker = {
  coins:[{
    value:'bitcoin',
    hidden:true
  },{
    value:'ethereum',
    hidden:false
  }],
  wallets:[ {
    value:'3PLLdazCQE4EoNx3CkV6qZ4nxTUqBDBdiB',
    hidden:true
  },{
    value:'3NbqHs4mf3JXJN3owsr8A9Z1r1z4Dgnm9t',
    hidden:true
  }]
}

const localStores={
  coin:'coins6',
  wallet:'wallets6',
  all:'all1'
}

const App = () => {
  const localc = JSON.parse(localStorage.getItem(localStores.coin));
  const localw = JSON.parse(localStorage.getItem(localStores.wallet));
  const locala = JSON.parse(localStorage.getItem(localStores.all));

  const [coins,setCoins] = useState(localc || defaultTracker.coins);
  const [wallets,setWallets] = useState(localw || defaultTracker.wallets);
  const [coinSel,setCoinSel] = useState('');
  const [allCoins,setAllCoins] = useState(locala || null)

  let addTracker = (type,value) => {
    const tmp = {value:value,hidden:false};
    setCoinSel(null);
    if (type === "coins"){
      localStorage.setItem(localStores.coin,JSON.stringify([...coins,tmp]));
      return setCoins([...coins,tmp])
    }else{
      localStorage.setItem(localStores.wallet,JSON.stringify([...wallets,tmp]));
      return setWallets([...wallets,tmp]);
    }
  }

  const updateCollapse = (type,id) => {
    if (type === "coins"){
      let tmp = coins;
      tmp[id].hidden = !tmp[id].hidden;
      localStorage.setItem(localStores.coin,JSON.stringify(tmp));
      return setCoins(tmp);
    }else{
      let tmp = wallets;
      tmp[id].hidden = !tmp[id].hidden;
      localStorage.setItem(localStores.wallet,JSON.stringify(tmp));
      return setWallets(tmp);
    }
  }

  const changeCoin = (value) => {
    setCoinSel(value);
  }


  // Pull all trackable coins. DISABLED - 7000+ entries slows things down
  // Let's just use a top ~150 list for now.
  useEffect(() => {
    setAllCoins(list);
    /*if (allCoins === null){
      axios.get('https://api.coingecko.com/api/v3/coins/list')
        .then((result) => {
          const formatted = result.data.map((coin) => {
            return {label:coin.name,value:coin.id};
          })
          localStorage.setItem(localStores.all,JSON.stringify(formatted));
          setAllCoins(formatted);
        }).catch((e) => {
          console.log(e.message);
        })
    }*/
  },[]);

  return (
    <div className="App">
      <div className="Content">
        <div className="Navigation">
          <div className="item">
            <div className="flexxy">
              <Select options={allCoins} onChange={changeCoin} value={coinSel} placeholder="Select Coin" />
              <button onClick={()=>addTracker('coins',coinSel.value)}>Track Coin</button>
            </div>
          </div>
          <div className="item">
            Area for adding wallets
          </div>
        </div>
        <div className="Cards">
          {coins.map((v,i) => {
            return(
            <Card key={v.value}>
              <CryptoPanel toggleCollapse={()=>updateCollapse('coins',i)} hidden={v.hidden} coin={v.value} />
            </Card>
            )
          })}

          {wallets.map((v,i) => {
            return(
            <Card key={v.value}>
              <CryptoPanel toggleCollapse={()=>updateCollapse('wallets',i)} hidden={v.hidden} wallet={v.value} />
            </Card>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

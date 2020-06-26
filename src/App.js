import React, {useState,useEffect} from 'react';
import './App.css';

import list from './components/CoinList.json';

import Card from './components/Card';
import CryptoPanel from './components/CryptoPanel';
import AddAddress from './components/AddAddress';
import AddCoin from './components/AddCoin';
import QuickNav from './components/QuickNav';


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
  coin:'coins9',
  wallet:'wallets9',
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


  // TODO: Clean these up; Merge into one function 
  const addTracker = (type,value) => {
    if (!value || value === "") return;
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

  const addAddress = (address) => {
    if (!address || address === "") return;
    let tmp = {value:address,hidden:false};
    localStorage.setItem(localStores.wallet,JSON.stringify([...wallets,tmp]));
    return setWallets([...wallets,tmp]);
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

  const removeCard = (type,id) => {
    if (type === "coins"){
      let tmp = coins;
      tmp.splice(id,1);
      localStorage.setItem(localStores.coin,JSON.stringify(tmp));
      return setCoins([...tmp]);
    }else{
      let tmp = wallets;
      tmp.splice(id,1);
      localStorage.setItem(localStores.wallet,JSON.stringify(tmp));
      return setWallets([...tmp]);
    }
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


  //TODO: Clean the AddAddress/AddCoin components up
  return (
    <div className="App">
    <QuickNav coins={coins} wallets={wallets} />
      <div className="Content">
        <div className="Navigation">
          <div className="item">
            <AddCoin 
              coinSel={coinSel} 
              changeCoin={changeCoin} 
              addTracker={addTracker}
              allCoins={allCoins}
            />
          </div>
          <div className="item">
            <AddAddress addAddress={addAddress}/>
          </div>
        </div>
        <div className="Cards">
          {coins.map((v,i) => {
            return(
            <Card key={v.value}>
              <CryptoPanel
                toggleCollapse={()=>updateCollapse('coins',i)}
                deleteCard={()=>{removeCard('coins',i)}}
                hidden={v.hidden} 
                coin={v.value} 
              />
            </Card>
            )
          })}

          {wallets.map((v,i) => {
            return(
            <Card key={v.value}>
              <CryptoPanel
                toggleCollapse={()=>updateCollapse('wallets',i)}
                deleteCard={()=>{removeCard('wallets',i)}}
                hidden={v.hidden} 
                wallet={v.value} 
              />
            </Card>
            )
          })}

          {!coins.length && !wallets.length && 
            <h1 style={{color:'rgba(205,235,255,0.6)',textAlign:'center'}}>Add a tracker or wallet above!</h1>
          }
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react'; // Usually we use linters to space this out more
import './App.css';

import useLocalStorage from './hooks/LocalStorage';

// Moved to constants folder, uppercase
import COIN_LIST from './constants/CoinList.json';

import Card from './components/Card';
import CryptoPanel from './components/CryptoPanel';
import AddAddress from './components/AddAddress';
import AddCoin from './components/AddCoin';
import QuickNav from './components/QuickNav';

const DEFAULTS = {
  coins: [
    {
      value: 'bitcoin',
      hidden: true,
    },
    {
      value: 'ethereum',
      hidden: false,
    },
  ],
  wallets: [
    {
      value: '3PLLdazCQE4EoNx3CkV6qZ4nxTUqBDBdiB',
      hidden: true,
    },
    {
      value: '3NbqHs4mf3JXJN3owsr8A9Z1r1z4Dgnm9t',
      hidden: true,
    },
  ],
};

const localStores = {
  coin: 'coins9',
  wallet: 'wallets9',
  all: 'all1',
};

// This Could Be in a utility, but it's a helper to replace an item in array at index
const updateArray = (arr, item, index) => {
  return [...arr.slice(0, index), { ...arr[index], ...item }, ...arr.slice(index + 1)];
};

const App = () => {
  const [coins, setCoins] = useLocalStorage(localStores.coin, DEFAULTS.coins);
  const [wallets, setWallets] = useLocalStorage(localStores.wallet, DEFAULTS.wallets);
  const [allCoins, setAllCoins] = useLocalStorage(localStores.all);
  const [selectedCoin, setSelectedCoin] = useState(''); // Try and use the full name here ex: selectedCoin, setSelectedCoin

  // TODO: Clean these up; Merge into one function
  const addTracker = (type, value) => {
    if (!value) return; // !'' actually returns true so no need to check if empty string
    const update = { value, hidden: false };
    setSelectedCoin(null);
    if (type === 'coins') {
      return setCoins([...coins, update]);
    } else {
      return setWallets([...wallets, update]);
    }
  };

  const addAddress = value => {
    if (!value) return; // Same here !''
    // try and use a better name here
    const newWallet = { value, hidden: false }; // const > let
    return setWallets([...wallets, newWallet]);
  };

  const updateCollapse = (type, index) => {
    if (type === 'coins') {
      const update = updateArray(coins, { hidden: !coins[index].hidden }, index);
      return setCoins(update);
    } else {
      const update = updateArray(wallets, { hidden: !wallets[index].hidden }, index);
      return setWallets(update);
    }
  };

  const removeCard = (type, index) => {
    // Same issue here with x = objOrArr
    if (type === 'coins') {
      const update = coins.filter((_, i) => i !== index);
      return setCoins([...update]);
    } else {
      const update = wallets.filter((_, i) => i !== index);
      return setWallets([...update]);
    }
  };

  // Pull all trackable coins. DISABLED - 7000+ entries slows things down
  // Let's just use a top ~150 list for now.
  useEffect(() => {
    setAllCoins(COIN_LIST);
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
  }, []);


  //TODO: Clean the AddAddress/AddCoin components up
  return (
    <div className="App">
      <QuickNav coins={coins} wallets={wallets} />
      <div className="Content">
        <div className="Navigation">
          <div className="item">
            <AddCoin coinSel={selectedCoin} changeCoin={setSelectedCoin} addTracker={addTracker} allCoins={allCoins} />
          </div>
          <div className="item">
            <AddAddress addAddress={addAddress} />
          </div>
        </div>
        <div className="Cards">
          {coins.map((v, i) => {
            return (
              <Card key={v.value}>
                <CryptoPanel
                  toggleCollapse={() => updateCollapse('coins', i)}
                  deleteCard={() => removeCard('coins', i)}
                  hidden={v.hidden}
                  coin={v.value}
                />
              </Card>
            );
          })}

          {wallets.map((v, i) => {
            return (
              <Card key={v.value}>
                <CryptoPanel
                  toggleCollapse={() => updateCollapse('wallets', i)}
                  deleteCard={() => removeCard('wallets', i)}
                  hidden={v.hidden}
                  wallet={v.value}
                />
              </Card>
            );
          })}

          {!coins.length && !wallets.length && (
            <h1 style={{ color: 'rgba(205,235,255,0.6)', textAlign: 'center' }}>Add a tracker or wallet above!</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

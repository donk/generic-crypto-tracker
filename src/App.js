import React, { useState, useEffect } from 'react'; // Usually we use linters to space this out more
import './App.css';

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
  // This would be a good use case to make your own useLocalStorage hook
  // Might rename these to use camelCase (ex: localC, but pref localCoin or similar)
  const localc = JSON.parse(localStorage.getItem(localStores.coin));
  const localw = JSON.parse(localStorage.getItem(localStores.wallet));
  const locala = JSON.parse(localStorage.getItem(localStores.all));

  const [coins, setCoins] = useState(localc || DEFAULTS.coins);
  const [wallets, setWallets] = useState(localw || DEFAULTS.wallets);
  const [coinSel, setCoinSel] = useState(''); // Try and use the full name here ex: selectedCoin, setSelectedCoin
  const [allCoins, setAllCoins] = useState(locala || null);

  // TODO: Clean these up; Merge into one function
  const addTracker = (type, value) => {
    if (!value) return; // !'' actually returns true so no need to check if empty string

    const update = { value, hidden: false };
    setCoinSel(null);
    if (type === 'coins') {
      // could also be part of your localStorage hook
      localStorage.setItem(localStores.coin, JSON.stringify([...coins, update]));
      return setCoins([...coins, update]);
    } else {
      localStorage.setItem(localStores.wallet, JSON.stringify([...wallets, update]));
      return setWallets([...wallets, update]);
    }
  };

  const addAddress = value => {
    if (!value) return; // Same here !''

    // try and use a better name here
    const update = { value, hidden: false }; // const > let
    localStorage.setItem(localStores.wallet, JSON.stringify([...wallets, update]));
    return setWallets([...wallets, update]);
  };

  const updateCollapse = (type, index) => {
    // This lil bit would be bad news
    // setting temp directly to coins/wallets means where
    // you're changing hidden would modify the state value as well
    // since it's a direct reference
    // Avoid this -> const thing = existingObjectOrArray
    // Do this -> const thing = { ...existingObject }; or const thing = [...existingArray]

    if (type === 'coins') {
      const update = updateArray(coins, { hidden: !coins[index].hidden }, index);
      localStorage.setItem(localStores.coin, JSON.stringify(update));
      return setCoins(update);
    } else {
      const update = updateArray(wallets, { hidden: !wallets[index].hidden }, index);
      localStorage.setItem(localStores.wallet, JSON.stringify(update));
      return setWallets(update);
    }
  };

  // You can probably not have this at all since you're just calling it directly
  const changeCoin = value => {
    setCoinSel(value);
  };

  const removeCard = (type, index) => {
    // Same issue here with x = objOrArr
    if (type === 'coins') {
      const update = coins.filter((_, i) => i !== index);
      localStorage.setItem(localStores.coin, JSON.stringify(update));
      return setCoins([...update]);
    } else {
      const update = wallets.filter((_, i) => i !== index);
      localStorage.setItem(localStores.wallet, JSON.stringify(update));
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

  console.log(coins);

  //TODO: Clean the AddAddress/AddCoin components up
  return (
    <div className="App">
      <QuickNav coins={coins} wallets={wallets} />
      <div className="Content">
        <div className="Navigation">
          <div className="item">
            <AddCoin coinSel={coinSel} changeCoin={changeCoin} addTracker={addTracker} allCoins={allCoins} />
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

import React from 'react';
import './App.css';

import Card from './components/Card';
import CryptoPanel from './components/CryptoPanel';


function App() {
  return (
    <div className="App">
      <Card>
        <CryptoPanel coin="bitcoin" />
      </Card>
      <Card>
        <CryptoPanel coin="ethereum" />
      </Card>
      <Card>
        <CryptoPanel coin="ripple" />
      </Card>
    </div>
  );
}

export default App;

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
        <CryptoPanel wallet="3PLLdazCQE4EoNx3CkV6qZ4nxTUqBDBdiB|39Jb9RroYYv8Z23kKgPSeMmpHFSKuweF66" />
      </Card>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';

import Card from './components/Card';
import CryptoPanel from './components/CryptoPanel';


function App() {
  return (
    <div className="App">
      <div className="Content">
        <Card>
          <CryptoPanel coin="bitcoin" />
        </Card>
        <Card>
          <CryptoPanel coin="ethereum" />
        </Card>
        <Card>
          <CryptoPanel wallet="3PLLdazCQE4EoNx3CkV6qZ4nxTUqBDBdiB|3CT4cRL55Y1uDq3bqjWw3dyZvgUfXwyXyE" />
        </Card>
        <Card>
          <CryptoPanel wallet="3NbqHs4mf3JXJN3owsr8A9Z1r1z4Dgnm9t" />
        </Card>
      </div>
    </div>
  );
}

export default App;

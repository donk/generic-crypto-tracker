import React, {useState} from 'react';
import Select from 'react-select';

const AddCoin = (props) => {
  return(
    <>
      <div className="label">TRACK CURRENCIES</div>
      <div className="flexxy">
        <Select classNamePrefix="select" className="select" options={props.allCoins} onChange={props.changeCoin} value={props.coinSel} placeholder="Select Coin" />
        <button onClick={()=>props.addTracker('coins',props.coinSel.value)}>TRACK COIN</button>
      </div>
    </>
  )
}

export default AddCoin;
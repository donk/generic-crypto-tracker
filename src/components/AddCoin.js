import React from 'react';
import Select from 'react-select';

const AddCoin = props => {
  const onAdd = () => {
    props.addTracker('coins', props.coinSel.value);
  };

  return (
    <>
      <div className="label">TRACK CURRENCIES</div>
      <div className="flexxy">
        <Select
          classNamePrefix="select"
          className="select"
          options={props.allCoins}
          onChange={props.changeCoin}
          value={props.coinSel}
          placeholder="Select A Coin"
        />
        <button onClick={onAdd}>TRACK COIN</button>
      </div>
    </>
  );
};

export default AddCoin;

import React, { useState } from 'react';

const AddAddress = props => {
  const [address, setAddress] = useState('');

  const onChange = e => {
    setAddress(e.target.value);
  };

  const onAdd = () => {
    setAddress('');
    props.addAddress(address);
  };

  return (
    <>
      <div className="label">TRACK BITCOIN ADDRESS</div>
      <div className="flexxy addr">
        <input value={address} onChange={onChange} style={{ flexGrow: '1', padding: '10px 0' }} type="text" />
        <button onClick={onAdd}>TRACK ADDRESS</button>
      </div>
    </>
  );
};

export default AddAddress;

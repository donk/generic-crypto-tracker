import React, {useState} from 'react';


const AddAddress = (props) => {
  const [address,setAddress] = useState('');

  const doChange = (e) => {
    setAddress(e.target.value);
  }
  
  return (
    <>
      <div className="label">TRACK BITCOIN ADDRESS</div>
      <div className="flexxy addr">
        <input value={address} onChange={doChange} style={{flexGrow:'1',padding:'10px 0'}} type="text" />
        <button onClick={()=>{props.addAddress(address);setAddress('')}}>TRACK ADDRESS</button>
      </div>
    </>
  )
}

export default AddAddress;
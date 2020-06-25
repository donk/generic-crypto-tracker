import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const Transactions = styled.table`
  margin-top:20px;
  width:100%;
  border-collapse: collapse;
  thead div{
    margin-bottom:10px;
  }
  tbody{
    max-height:40px;
    font-size:0.8em;

    tr{
      border-bottom:#ccc 1px solid;
    }

    td{
      padding:5px 0;
    }
  }
`;

const AddressLink = (props) => {
  return (
    <>
      <div style={{color:props.color}}>{props.value}</div>
    </>
  )
}

const HistoryItem = (props) => {
  return(
    <tr>
      <td>{props.tx.inputs.map((v,i) =>{
        return (
          <AddressLink key={v.prev_out.script+i} 
          value={v.prev_out.addr} color={props.addresses.indexOf(v.prev_out.addr) < 0 ? 'white' : 'rgba(100,100,160,1)'} />
        )
      })}</td>
      <td>=&gt;</td>
      <td>{props.tx.out.map((v,i) => {
        return (
          <AddressLink key={v.script+i}
            value={v.addr} color={props.addresses.indexOf(v.addr) < 0 ? 'white' : 'rgba(100,100,160,1)'} />
        )
      })}</td>
    </tr>
  )
}


const WalletHistory = (props) => {

  return(
    <Transactions>
      <thead>
        <h3>Transactions</h3>
      </thead>
      <tbody>
        {props.transactions.map((tx,i) => {
          return <HistoryItem key={i} tx={tx} addresses={props.addresses}/>
        })}
      </tbody>
    </Transactions>
  )
};

export default WalletHistory;
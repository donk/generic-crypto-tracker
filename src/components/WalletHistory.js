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
    max-height:400px;
    font-size:0.7em;
    display:block;
    overflow-y:auto;
    margin-top:10px;
    tr{
      border-bottom:#ccc 1px solid;
      display:table;
      width:100%;
    }

    td{
      table-layout:fixed;
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
    <div className={`collapsable ${props.collapsed ? '' : 'collapsed' }`}>
      <Transactions>
        <thead>
        Transactions
        </thead>
        <tbody>
          {props.transactions.map((tx,i) => {
            return <HistoryItem key={i} tx={tx} addresses={props.addresses}/>
          })}
        </tbody>
      </Transactions>
      </div>
  )
};

export default WalletHistory;
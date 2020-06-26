import React from 'react';
import styled from 'styled-components';

const QuickNav = (props) => {

  const Floater = styled.div`
    position:fixed;
    right:0;
    top:50%;
    transform:translateY(-50%);
    background-color:#333;
    padding:10px 20px;
    border-top-left-radius:10px;
    border-bottom-left-radius:10px;
    color:white;
    box-shadow:2px 2px 10px rgba(0,0,0,0.3);
    display:none;
  `;

  return(
    <Floater>
      {props.coins.map((v) => {
        console.log(v);
        return (
          <div>sdf</div>
        )
      })}

      {props.wallets.map((v) => {
        console.log(v);
        return (
          <div>{v.value}</div>
        )
      })}
    </Floater>
  )
}

export default QuickNav;
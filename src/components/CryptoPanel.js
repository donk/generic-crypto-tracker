import React from 'react';
import styled from 'styled-components';

import CryptoInfo from './CryptoInfo';
import CryptoChart from './CryptoChart';

import WalletInfo from './WalletInfo';

const Expand = styled.div`
  margin: 10px 0;
  border: 3px rgba(0, 0, 0, 0.2) solid;
  padding: 5px 30px;
  font-size: 0.8em;
  text-align: center;
  text-transform: uppercase;
  border-radius: 4px;
  transition: background-color 0.4s;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const Delete = styled.div`
  text-align: right;
  font-size: 0.8em;
  div {
    display: inline-block;
    color: rgba(200, 100, 100, 1);
    cursor: pointer;
    transition: color 0.3s;
    :hover {
      color: rgba(255, 50, 50, 1);
    }
  }
`;

const CryptoCard = props => {
  return (
    <div>
      {props.coin && (
        <>
          <CryptoInfo coin={props.coin} />
          <div>
            <Expand onClick={props.toggleCollapse}>{props.hidden ? 'Show Chart' : 'Hide Chart'}</Expand>
          </div>
          <CryptoChart collapsed={props.hidden} coin={props.coin} />
        </>
      )}

      {props.wallet && (
        <>
          <WalletInfo collapsed={props.hidden} wallet={props.wallet}>
            <Expand onClick={props.toggleCollapse}>{props.hidden ? 'Show Transactions' : 'Hide Transactions'}</Expand>
          </WalletInfo>
        </>
      )}
      <Delete>
        <div onClick={props.deleteCard}>REMOVE</div>
      </Delete>
    </div>
  );
};

export default CryptoCard;

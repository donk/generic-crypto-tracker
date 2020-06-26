import React from 'react';
import styled from 'styled-components';

const Floater = styled.div`
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: #333;
  padding: 10px 20px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  color: white;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  display: none;
`;

// Don't make styled components inside a component
const QuickNav = props => (
  <Floater>
    {props.coins.map((v, i) => {
      console.log(v);
      return <div key={i}>sdf</div>;
    })}

    {props.wallets.map((v, i) => {
      console.log(v);
      return <div key={i}>{v.value}</div>;
    })}
  </Floater>
);

export default QuickNav;

import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color:#333;
  padding:10px 20px;
  border:rgba(255,255,255,0.4) 1px solid;
  border-radius:10px;
  color:white;
  position:relative;
`;

const Card = (props) => {
  return(
    <CardContainer>
      {props.children}
    </CardContainer>
  )
}

export default Card;
import React from 'react';
import styled from 'styled-components';

//
const CardContainer = styled.div`
  background-color: #333;
  padding: 10px 20px;
  border-radius: 10px;
  color: white;
  position: relative;
  margin: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;

const Card = props => {
  // No need to really use props.children, just pass em through
  return <CardContainer style={{ width: props.width }} {...props} />;
};

export default Card;

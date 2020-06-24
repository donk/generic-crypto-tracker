import React from 'react';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

  const Info = styled.div`
    text-align:center;
    font-size:0.85em;
    margin:5px 10px;
    .title{
      font-size:0.7em;
      color:rgba(255,255,255,0.5);
    }
  `;

const InfoItem = (props) => {
  return(
    <Info>
      <div className="title">{props.title}</div>
      { props.price && 
        <NumberFormat fixedDecimalScale={true} value={props.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
      }

      { props.split && <span> {props.split} </span>}
      
      {
        props.percent &&
        <span>{props.percent}%</span>
      }
    </Info>
  )
}

export default InfoItem;
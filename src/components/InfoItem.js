import React from 'react';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import ScaleLoader from 'react-spinners/ScaleLoader';

const Info = styled.div`
  text-align: center;
  font-size: 1em;
  margin: 5px 10px;
  .title {
    font-size: 0.7em;
    margin-bottom: 5px;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const InfoItem = props => {
  return (
    <Info>
      <div className="title">{props.title}</div>

      <ScaleLoader height={15} color={'white'} loading={props.loading} />

      {props.price && <NumberFormat value={props.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />}
      {props.split && props.percent && (
        <>
          <span> {props.split} </span>
          <span>{props.percent}%</span>
        </>
      )}
    </Info>
  );
};

export default InfoItem;

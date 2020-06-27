import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Transactions = styled.div`
  width: 100%;
  border-collapse: collapse;
  overflow-y: auto;
`;

const Row = styled.div`
  display: flex;
  padding: 5px 5px;
  border-bottom: #ccc 1px solid;
  background-color: #2a2a2a;
`;

const Col = styled.div`
  font-size: 0.8em;
  padding: 0 10px;
  flex-grow: ${props => (props.grow ? '1' : '0')};
  text-align: ${props => (props.grow ? 'center' : 'left')};
`;

const Label = styled.div`
  margin-bottom: 5px;
  color: rgba(255, 255, 255, 0.6);
`;

const AddressLink = props => {
  return <div style={{ color: props.color }}>{props.value}</div>;
};

const HistoryItem = props => {
  const [fromTotal, setFromTotal] = useState(0);
  const [toTotal, setToTotal] = useState(0);

  const time = moment(props.tx.time * 1000).format('MMM Mo YYYY h:mm:ss a');

  useEffect(() => {
    let from = 0;
    props.tx.inputs.forEach(v => {
      from += v.prev_out.value;
    });

    let to = 0;
    props.tx.out.forEach(v => {
      to += v.value;
    });

    setFromTotal(from / 100000000);
    setToTotal(to / 100000000);
  }, [props.tx]);

  return (
    <Row>
      <Col>
        <Label>Date</Label>
        {time}
      </Col>
      <Col>
        <Label>Sending Addresses</Label>
        {props.tx.inputs.map((v, i) => (
          <AddressLink
            key={v.prev_out.script + i}
            value={v.prev_out.addr}
            color={props.addresses.indexOf(v.prev_out.addr) < 0 ? 'white' : 'rgb(168, 168, 225)'}
          />
        ))}
      </Col>
      <Col grow>
        <Label>BTC Sent</Label>
        {fromTotal}
      </Col>
      <Col>
        <Label>Receiving Addresses</Label>
        {props.tx.out.map((v, i) => (
          <AddressLink
            key={v.script + i}
            value={v.addr}
            color={props.addresses.indexOf(v.addr) < 0 ? 'white' : 'rgb(168, 168, 225)'}
          />
        ))}
      </Col>
    </Row>
  );
};

// Stuff like this here where you're doing className ternary or style
// is an ideal case for styled-components
const WalletHistory = props => (
  <div
    style={{ maxHeight: '400px', overflowY: 'auto', marginTop: '15px' }}
    className={`collapsable ${props.collapsed ? 'collapsed' : ''}`}
  >
    <Transactions>
      {props.transactions.map((tx, i) => (
        <HistoryItem key={i} tx={tx} addresses={props.addresses} />
      ))}
    </Transactions>
  </div>
);

export default WalletHistory;

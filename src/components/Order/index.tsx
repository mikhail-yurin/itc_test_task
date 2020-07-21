import React from 'react';
import StyledOrder from '../../styles/itemStyle';
// UI
import Status from '../Status'
// Types
import { StatusName } from '../../types/IStatus';
import IOrder from '../../types/IOrder';

const Order = (props: IOrder) => {
  const {
    _id,
    fullname,
    ordertime,
    deliverytime,
    size,
    workspace,
    status,
  } = props;

  return (
    <StyledOrder>
      <td>{fullname}</td>
      <td>{workspace}</td>
      <td>{size.name}</td>
      <td>{ordertime}</td>
      <td>{deliverytime}</td>
      {Object.values(StatusName).includes(status.name)
        ? (<td><Status status={status.name} id={_id} /></td>)
        : (<td>{status}</td>)}
    </StyledOrder>
  );
};

export default Order;

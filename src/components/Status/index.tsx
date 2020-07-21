import React from 'react';
import { inject, observer } from 'mobx-react';
// Types
import { StatusName } from '../../types/IStatus';
import { IOrderStore } from '../../store/order';
// Styles
import { StyledSelect } from '../../styles/selectorStyle';

interface IProps {
  id: string,
  status: StatusName,
  OrderStore?: IOrderStore,
}

const Order = inject('OrderStore')(observer((props: IProps) => {
  const { status, id, OrderStore } = props;
  const {
    pending,
    updateOrderAction,
  } = OrderStore;

  const onChange = (e: React.BaseSyntheticEvent) => {
    if (status !== e.currentTarget.value) {
      updateOrderAction(id, e.currentTarget.value);
    }
  }

  const availableStatuses = [status];
  switch (status) {
    case StatusName.new:
      availableStatuses.push(StatusName.accepted);
      availableStatuses.push(StatusName.cancelled);
      break;

    case StatusName.accepted:
      availableStatuses.push(StatusName.issued);
      availableStatuses.push(StatusName.cancelled);
      break;

    default:
      break;
  }

  return (
    <StyledSelect name="status" onChange={onChange} disabled={pending === `update_${id}`}>
      {availableStatuses.map((status) => (
        <option value={status} key={status}>{status}</option>
      ))}
    </StyledSelect>
  );
}));

export default Order;

import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { StyledList, StyledTitle, StyledHeader } from '../../styles/listStyle';
// Types
import IOrder from '../../types/IOrder';
import { IOrderStore } from '../../store/order';
// UI
import Order from '../Order';

interface IProps {
  OrderStore?: IOrderStore
}

const List = inject('OrderStore')(observer((props: IProps) => {
  const { OrderStore } = props;
  const {
    getOrderListAction,
    orderList,
  } = OrderStore;

  useEffect(() => {
    getOrderListAction();
  }, [])

  return (
    <StyledList>
      <tbody>
        <StyledTitle>
          <td colSpan={6}>
            Список заказов
            </td>
        </StyledTitle>
        <StyledHeader>
          <td>ФИО</td>
          <td>Рабочее место</td>
          <td>Размер</td>
          <td>Дата заказа</td>
          <td>Дата досатвки</td>
          <td>Статус</td>
        </StyledHeader>
        {orderList && orderList.map((order: IOrder): JSX.Element => (
          <Order
            key={order._id}
            _id={order._id}
            fullname={order.fullname}
            ordertime={order.ordertime}
            deliverytime={123}
            size={order.size}
            workspace={order.workspace}
            status={order.status}
          />
        ))}
      </tbody>
    </StyledList>
  );
}));

export default List;

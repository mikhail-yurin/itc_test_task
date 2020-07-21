import { observable, action, toJS } from 'mobx';
import axios from 'axios';
import { apiUrl } from '../config';
import IOrder from '../types/IOrder';
import { getStatusId } from '../utils';

const instance = axios.create({
  baseURL: apiUrl,
  headers: { 'Content-Type': 'application/json' },
});

export interface IOrderStore {
  pending: string | null;
  orderList: Array<IOrder> | undefined;
  getOrderListAction: Function;
  updateOrderAction: Function;
  addOrderAction: Function;
}

class OrderStore implements IOrderStore {
  @observable pending = null;
  @observable.ref orderList;

  @action
  getOrderListAction = async () => {
    this.pending = 'orders';
    instance.get('/orders')
      .then((response) => {
        this.orderList = response.data;
        this.pending = null;
      })
      .catch((error) => {
        this.pending = null;
        throw error;
      });
  };

  @action
  updateOrderAction = async (id: string, status: string) => {
    this.pending = `update_${id}`;
    instance.post('/orders/update', {
      _id: id,
      status: {
        _id: getStatusId(status),
        name: status
      }
    })
      .then(() => {
        // todo: add error handler
        this.pending = null;
        this.getOrderListAction();
      })
      .catch((error) => {
        this.pending = null;
        throw error;
      });
  };

  @action
  addOrderAction = async (order: IOrder) => {
    this.pending = 'new';
    const { fullname, workspace, size } = order;

    instance.post('/orders/new', {
      fullname,
      workspace,
      size,
    })
      .then((response) => {
        this.pending = null;
        if (response.status === 200) {
          alert('Ваш заказ принят');
        } else {
          alert('Ошибка при обработке заказа');
        }
      })
      .catch((error) => {
        alert('Ошибка при обработке заказа');
        this.pending = null;
        throw error;
      });
  };
}

export default new OrderStore();

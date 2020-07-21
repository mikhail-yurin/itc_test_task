import { observable, action, toJS } from 'mobx';
import axios from 'axios';
import { apiUrl } from '../config';
import { ISizeAmount } from './ISize';;

const instance = axios.create({
  baseURL: apiUrl,
  headers: { 'Content-Type': 'application/json' },
});

export interface ISizeStore {
  pending: string | null;
  sizesList: Array<ISizeAmount> | undefined;
  getSizesListAction: Function;
  updateSizeAction: Function;
}

class SizeStore implements ISizeStore {
  @observable pending = null;
  @observable.ref sizesList;

  @action
  getSizesListAction = async () => {
    this.pending = 'sizes';
    instance.get('/sizes')
      .then((response) => {
        this.sizesList = response.data;
        this.pending = null;
      })
      .catch((error) => {
        this.pending = null;
        throw error;
      });
  };

  @action
  updateSizeAction = async (id: string, name: string, total: number) => {
    this.pending = `update_${id}`;
    instance.post('/sizes/update', {
      _id: id,
      name,
      total,
    })
      .then(() => {
        // todo: add error handler
        this.pending = null;
        this.getSizesListAction();
      })
      .catch((error) => {
        this.pending = null;
        throw error;
      });
  };
}

export default new SizeStore();

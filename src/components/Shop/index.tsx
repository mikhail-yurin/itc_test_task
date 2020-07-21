import React, { useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';
// UI
import { Menu, Dropdown, Button, Input } from 'antd';
import 'antd/es/dropdown/style/css';
import 'antd/es/input/style/css';
import { DownOutlined } from '@ant-design/icons';
import { StyledOption } from '../../styles/selectorStyle';
// Types
import ISize, { ISizeAmount, SizeName } from '../../types/ISize';
import { IOrderStore } from '../../store/order';
import { ISizeStore } from '../../store/size';
// Styles
import StyledForm from './style';

interface IProps {
  OrderStore?: IOrderStore,
  SizeStore?: ISizeStore,
}

const SizeAmount = inject('OrderStore', 'SizeStore')(observer((props: IProps) => {
  const { OrderStore, SizeStore } = props;

  const {
    pending: sizePending,
    getSizesListAction,
    sizesList,
  } = SizeStore;

  const {
    pending: orderPending,
    addOrderAction,
  } = OrderStore;

  const nameRef = useRef(null);
  const workPlaceRef = useRef(null);

  const [size, setSize] = useState<ISize | undefined>(undefined);

  if (!sizesList && sizePending !== 'sizes') {
    getSizesListAction();
  }

  const availableSizes = sizesList?.filter((size: ISizeAmount) => size.total - size.reserved > 0);

  const onSelect = ({ key }) => {
    const [name, _id] = key.split('/');
    setSize({
      _id,
      name,
    });
  };

  const onSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const fullname = nameRef.current.state.value;
    const workplace = workPlaceRef.current.state.value;

    if (fullname && workplace && size) {
      addOrderAction({
        fullname,
        workplace,
        size,
      });

      nameRef.current.state.value = '';
      workPlaceRef.current.state.value = '';
      setSize(undefined);
    } else {
      alert('Заполните все поля');
    }
  };

  return !sizesList || sizePending ? (<div>Загрузка доступных товаров...</div>) : (
    <StyledForm>
      <label>ФИО</label>
      <Input placeholder="Введите данные" ref={nameRef} />
      <label>Рабочее место</label>
      <Input placeholder="Введите данные" ref={workPlaceRef} />
      <label>Размер</label>
      {availableSizes?.length > 0 ? (
        <Dropdown
          trigger={['click']}
          overlay={(
            <Menu onClick={onSelect}>
              {availableSizes.map((size: ISizeAmount) => (
                <Menu.Item key={`${size.name}/${size._id}`} >
                  <StyledOption>
                    <div>{size.name}</div>
                    <div>{size.total - size.reserved} шт.</div>
                  </StyledOption>
                </Menu.Item>
              ))}
            </Menu>
          )}
          disabled={orderPending === 'new' || !availableSizes}
        >
          <Button>
            {size?.name || 'Выберите значение'} <DownOutlined />
          </Button>
        </Dropdown>
      ) : (<div>Нет товаров доступных для заказа</div>)}
      <br />
      <Button onClick={onSubmit} disabled={orderPending === 'new' || !availableSizes} loading={orderPending === 'new'}>
        Оформить заказ
      </Button>
    </StyledForm>
  );
}));

export default SizeAmount;

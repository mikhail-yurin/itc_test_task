import React, { useRef } from 'react';
import { inject, observer } from 'mobx-react';
import StyledSizeAmount from '../../styles/itemStyle';
import StyledInput from './style';
// Types
import { ISizeAmount } from '../../types/ISize';
import { ISizeStore } from '../../store/size';

interface IProps extends ISizeAmount {
  SizeStore?: ISizeStore,
}

const SizeAmount = inject('SizeStore')(observer((props: IProps) => {
  const {
    _id,
    name,
    reserved,
    total,
    SizeStore,
  } = props;

  const {
    pending,
    updateSizeAction,
  } = SizeStore;

  const amountRef = useRef(null);

  const onSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    if (/^\d+$/g.test(amountRef.current.value)) {
      updateSizeAction(_id, name, parseInt(amountRef.current.value, 10));
      amountRef.current.value = '';
    } else {
      alert('Введенное количество должно быть целым числом');
    }
  };

  return (
    <StyledSizeAmount>
      <td>{name}</td>
      <td>{reserved}</td>
      <td>{total}</td>
      <td>
        <form>
          <StyledInput ref={amountRef} type="text" />
          <input type="submit" value="Добавить" onClick={onSubmit} disabled={pending === `update_${_id}`} />
        </form>
      </td>
    </StyledSizeAmount>
  );
}));

export default SizeAmount;

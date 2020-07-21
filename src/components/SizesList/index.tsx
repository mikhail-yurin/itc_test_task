import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { StyledList, StyledTitle, StyledHeader } from '../../styles/listStyle';
// Types
import { ISizeStore } from '../../store/size';
// UI
import Size from '../Size';
import { ISizeAmount } from '../../types/ISize';

interface IProps {
  SizeStore?: ISizeStore,
}

const List = inject('SizeStore')(observer((props: IProps) => {
  const { SizeStore } = props;
  const {
    pending,
    getSizesListAction,
    sizesList,
  } = SizeStore;

  if (!sizesList && pending !== 'sizes') {
    getSizesListAction();
  }

  useEffect(() => {
    getSizesListAction();
  }, [])

  return (
    <StyledList>
      <tbody>
        <StyledTitle>
          <td colSpan={4}>
            Добавление футболок на склад
          </td>
        </StyledTitle>
        <StyledHeader>
          <td>Размер</td>
          <td>Зарезервировано</td>
          <td>Всего</td>
          <td>Добавить футболок</td>
        </StyledHeader>
        {sizesList && sizesList.map((sizeAmount: ISizeAmount): JSX.Element => (
          <Size
            key={sizeAmount._id}
            _id={sizeAmount._id}
            name={sizeAmount.name}
            reserved={sizeAmount.reserved}
            total={sizeAmount.total}
          />
        ))}
      </tbody>
    </StyledList>
  );
}));

export default List;

import React from 'react';
import { Link } from 'react-router-dom';
// Styles
import { Menu, Icon } from './style';
// Icons
// @ts-ignore
import Orders from '../../assets/open-menu.svg';
// @ts-ignore
import Sizes from '../../assets/adjust.svg';
// @ts-ignore
import Shop from '../../assets/shopping-cart.svg';

const Order = () => (
  <Menu>
    <Link to='/'>
      <Icon src={Orders} alt="Orders" />
    </Link>
    <Link to='/sizes'>
      <Icon src={Sizes} alt="Sizes" />
    </Link>
    <Link to='/shop'>
      <Icon src={Shop} alt="Shop" />
    </Link>
  </Menu>
);

export default Order;

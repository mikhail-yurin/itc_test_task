import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// UI
import Menu from './components/Menu';
import OrderList from './components/OrderList';
import SizesList from './components/SizesList';
import Shop from './components/Shop';
// Store
import OrderStore from './store/order';
import SizeStore from './store/size';
// Styles
import Main from './style';

const stores = {
  OrderStore,
  SizeStore,
};

const App = () => (
  <BrowserRouter>
    <Provider {...stores}>
      <Main>
        <Menu />

        <Switch>
          <Route exact path="/" render={() => (<OrderList />)} />
          <Route path="/sizes" render={() => (<SizesList />)} />
          <Route path="/shop" render={() => (<Shop />)} />
        </Switch>
      </Main>
    </Provider>
  </BrowserRouter>
);

const app = document.createElement('div');
app.setAttribute('id', 'app');
document.body.appendChild(app);

document.body.style.height = `${window.innerHeight}px`;
document.body.style.margin = '0';
app.style.height = `${window.innerHeight}px`;

ReactDOM.render(<App />, document.getElementById('app'));

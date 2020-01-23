import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import Login from '../pages/login';
import Register from '../pages/register';
import Profile from '../pages/profile';
import NotMatch from '../pages/notMatch';
import Home from '../pages/home';
import { Provider } from 'unistore/react';
import { store } from '../store/store';
import Product from '../pages/productDetails';
import MyBag from '../pages/myBag';
import Checkout from '../pages/checkout';
import Search from '../pages/searchResult';
import Grouping from '../pages/grouping';

const Mainroute = () =>
{
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/me" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/product/:product" component={Product} />
          <Route path="/search/:search" component={Search} />
          <Route path="/department/:departmentID" component={Grouping} />
          <Route path="/category/:categoryID" component={Grouping} />
          <Route path="/mybag" component={MyBag} />
          <Route path="/checkout" component={Checkout} />
          {/* <Route path='/order' component={Order} /> */}
          {/* <Route path='/department/product/:product' component={Category} /> */}
          <Route component={NotMatch} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default Mainroute;

import React from 'react';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Login from '../pages/login'
import Register from '../pages/register'
import Profile from '../pages/profile'
import NotMatch from '../pages/notMatch'
import Home from '../pages/home'
import { Provider } from 'unistore/react';
import { store } from '../store/store';


const Mainroute = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path='/profile' component={Profile} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    {/* <Route path='/order' component={Order} /> */}
                    {/* <Route path='/mybag' component={} /> */}
                    {/* <Route path='/product' component={Articles} /> */}
                    {/* <Route path='/department/product/:product' component={Category} /> */}
                    <Route component={NotMatch} />
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

export default Mainroute;
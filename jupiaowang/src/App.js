import React, { Component } from 'react';
import {Switch, Route, HashRouter } from 'react-router-dom'
import Login from './main/login'
import Registration from './main/registration'
import Forget from './main/forget'
import HomePage from './main/home'
import ShopCart from './main/shopcart'
import './App.css';


class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route path='/registration' component={Registration}/>
                    <Route path='/forget' component={Forget}/>
                    <Route path='/home/:name' component={HomePage}/>
                    <Route path='/shopcart' component={ShopCart}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default App;

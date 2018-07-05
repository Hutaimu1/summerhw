import React, { Component } from 'react';
import {Switch, Route, HashRouter } from 'react-router-dom'
import Login from './main/login'
import Registration from './main/registration'
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
                    <Route path='/home' component={HomePage}/>
                    <Route path='/shopcart' component={ShopCart}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default App;

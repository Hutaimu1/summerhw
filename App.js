import React, { Component } from 'react';
import {Switch, Route, HashRouter } from 'react-router-dom'
import WrappedNormalLoginForm from './main/login'
import homepage from './main/home'
import shopCart from './main/shopcart'
import './App.css';


class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={WrappedNormalLoginForm}/>
                    <Route path='/home' component={homepage}/>
                    <Route path='/myCart' component={shopCart}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default App;

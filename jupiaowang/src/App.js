import React, { Component } from 'react';
import {Switch, Route, HashRouter } from 'react-router-dom'
import WrappedNormalLoginForm from './main/login'
import './App.css';


class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={WrappedNormalLoginForm}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default App;

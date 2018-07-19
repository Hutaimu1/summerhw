import React, {Component} from 'react';
import {Switch, Route, HashRouter} from 'react-router-dom'
import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import Login from "./main/login";
import Registration from "./main/registration";
import Forget from "./main/forget";
import HomePage from "./main/home";
import AdminPage from "./main/admin";
import './App.css';




class App extends Component {
    render() {
        return (
            <LocaleProvider locale={zh_CN}>
                <HashRouter>
                    <Switch>
                        <Route exact path='/' component={Login}/>
                        <Route path='/registration' component={Registration}/>
                        <Route path='/forget' component={Forget}/>
                        <Route path='/home/:userName' component={HomePage}/>
                        <Route path='/admin/:userName' component={AdminPage}/>
                    </Switch>
                </HashRouter>
            </LocaleProvider>
        );
    }
}

export default App;

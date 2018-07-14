import {Layout, Menu, Icon, Popconfirm, message} from 'antd';
import React from 'react';
import {Route, NavLink , Switch} from 'react-router-dom'
import ShopCart  from "../Components/shoppingCart"
import MovieTicket from "../Components/movieTicket"
import TrainTicket from "../Components/trainTicket"
import OrderToBeResolved from "../Components/orderToBeResolved"
import HistoryOrder from '../Components/historyOrder'
import ViewMovie from '../Components/viewMovie'

const {Header, Content, Footer, Sider} = Layout;

const SubMenu = Menu.SubMenu;

class homepage extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    logoutConfirm = () =>{
        message.success('登出成功!');
        this.props.history.push('/');
    };

    render() {
        let userName = this.props.match.params.userName;
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <Menu theme="dark" mode="inline" selectedKeys={[this.props.location.pathname]} defaultOpenKeys={["sub1","sub2","sub3"]}>
                        <SubMenu key="sub1" title={<span><Icon type="user"/><span>用户中心</span></span>}>
                            <Menu.Item key={"/home/" + userName + "/user"}>用户信息</Menu.Item>
                            <Menu.Item key={"/home/" + userName + "/collection"}>我的收藏</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="video-camera"/><span>票品</span></span>}>
                            <Menu.Item key={"/home/" + userName + "/trainTicket"}><NavLink to={{ pathname: '/home/'+ userName + '/trainTicket'}}>火车票</NavLink></Menu.Item>
                            <Menu.Item key={"/home/" + userName + "/movieTicket"}><NavLink to={{ pathname: '/home/'+ userName + '/movieTicket'}}>电影票</NavLink></Menu.Item>
                            <Menu.Item key={"/home/" + userName + "/flightTicket"}>飞机票</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="shopping-cart"/><span>购买</span></span>}>
                            <Menu.Item key={"/home/" + userName + "/shoppingCart"}><NavLink to={{ pathname: '/home/'+ userName + '/shoppingCart'}}>我的购物车</NavLink></Menu.Item>
                            <Menu.Item key={"/home/" + userName + "/orderToBeResolved"}><NavLink to={{ pathname: '/home/'+ userName + '/orderToBeResolved'}}>待处理订单</NavLink></Menu.Item>
                            <Menu.Item key={"/home/" + userName + "/historyOrder"}><NavLink to={{ pathname: '/home/'+ userName + '/historyOrder'}}>历史订单</NavLink></Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#000', padding: 0}}>
                        <Icon
                            className="icon"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                            style={{cursor: 'pointer'}}
                        />
                        <span className="head-font">亲爱的用户{userName},聚票网欢迎您!</span>
                        <Popconfirm placement="bottomRight" title="你确定要退出么?"
                                    onConfirm={this.logoutConfirm}
                                    okText="是" cancelText="否">
                            <Icon
                                className="icon"
                                type="home"
                                style={{float:"right"}}
                            />
                        </Popconfirm>
                    </Header>
                    <Content style={{margin: '0 16px'}}>
                        <div style={{padding: 24, background: '#fff', minHeight: 780}}>
                            <Switch>
                                <Route path= "/home/:userName/trainTicket" component={TrainTicket} />
                                <Route path= "/home/:userName/movieTicket" component={MovieTicket} />
                                <Route path= "/home/:userName/shoppingCart" component={ShopCart} />
                                <Route path= "/home/:userName/orderToBeResolved" component={OrderToBeResolved} />
                                <Route path= "/home/:userName/historyOrder" component={HistoryOrder} />
                                <Route path= "/home/:userName/viewMovie/:movieId" component={ViewMovie} />
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Ant Design ©2018 Created by SJTU
                    </Footer>
                </Layout>
            </Layout>
        );
    }

}

export default homepage;

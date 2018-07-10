import {Layout, Menu, Icon, Popconfirm, message,} from 'antd';
import React from 'react';
import ShopCart from '../BigComponrnts/shopCart'
import TrainTicket from '../BigComponrnts/trainTicket'
import  OrderToBeResolved from '../BigComponrnts/orderToBeResolved'
const {Header, Content, Footer, Sider} = Layout;

const SubMenu = Menu.SubMenu;

class homepage extends React.Component {
    state = {
        collapsed: false,
        selectValue:'3'
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

    handleClick = (e) => {
        this.setState({
            selectValue:e.key
        })
    };

    getComponents() {
        switch (this.state.selectValue) {
            case '3':
                return <TrainTicket name={this.props.match.params.name}/>;
            case '6':
                return <ShopCart name={this.props.match.params.name}/>;
            case '7':
                return <OrderToBeResolved name={this.props.match.params.name}/>;
            default:
                return <div>{this.state.selectValue}</div>;
        }
    }


    render() {
        let name = this.props.match.params.name;
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']} defaultOpenKeys={['sub2']} onClick={this.handleClick}>
                        <SubMenu key="sub1" title={<span><Icon type="user"/><span>用户中心</span></span>}>
                            <Menu.Item key="1">用户信息</Menu.Item>
                            <Menu.Item key="2">我的收藏</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="video-camera"/><span>票品</span></span>}>
                            <Menu.Item key="3">火车票</Menu.Item>
                            <Menu.Item key="4">高铁票</Menu.Item>
                            <Menu.Item key="5">飞机票</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="shopping-cart"/><span>购买</span></span>}>
                            <Menu.Item key="6">我的购物车</Menu.Item>
                            <Menu.Item key="7">待处理订单</Menu.Item>
                            <Menu.Item key="8">历史订单</Menu.Item>
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
                        <span className="head-font">亲爱的用户{name},聚票网欢迎您!</span>
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
                            {this.getComponents()}
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

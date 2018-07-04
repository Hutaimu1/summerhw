import { Layout, Menu, Icon } from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import '../css/home.css'
const { Header, Content, Footer, Sider } = Layout;

const SubMenu = Menu.SubMenu;

class homepage extends React.Component{
    state = {
        collapsed: false,
        mode: 'inline',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span className="nav-text">用户中心</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span className="nav-text">票品</span>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="shopping-cart"/><span>购物车</span></span>}>
                            <Menu.Item key="3"><Link to="/myCart">我的购物车</Link></Menu.Item>
                            <Menu.Item key="4">确认下单</Menu.Item>
                        </SubMenu>

                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#000', padding: 0 }}>
                        <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                                style={{cursor: 'pointer'}}
                            />
                        </span>
                        <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>Ticket Management System</span>
                        <span style={{color:'#fff', float:'right', paddingRight:'1%'}}>
                        </span>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by SJTU
                    </Footer>
                </Layout>
            </Layout>
        );
    }

}

export default homepage;

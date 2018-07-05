import {Layout, Menu, Icon, Popconfirm, message} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';

const {Header, Content, Footer, Sider} = Layout;

const SubMenu = Menu.SubMenu;

class homepage extends React.Component {
    state = {
        collapsed: false,
        mode: 'inline',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    logoutConfirm = () =>{
        message.info('登出成功!');
        this.props.history.push('/');
    };

    render() {
        let name = this.props.match.params.name;
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
                        <Menu.Item key="1">
                            <Icon type="user"/>
                            <span className="nav-text">用户中心</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera"/>
                            <span className="nav-text">票品</span>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="shopping-cart"/><span>购物车</span></span>}>
                            <Menu.Item key="3"><Link to="/shopcart">我的购物车</Link></Menu.Item>
                            <Menu.Item key="4">确认下单</Menu.Item>
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

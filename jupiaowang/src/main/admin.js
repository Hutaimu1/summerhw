import {Layout, Menu, Icon, Popconfirm, message} from 'antd';
import React from 'react';
import {Route, NavLink, Switch} from 'react-router-dom'
import userManagement from "../Components/userManagement";


const {Header, Content, Footer, Sider} = Layout;

const SubMenu = Menu.SubMenu;

class adminPage extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    logoutConfirm = () => {
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
                    <Menu theme="dark" mode="inline" selectedKeys={[this.props.location.pathname]}
                          defaultOpenKeys={["sub1", "sub2", "sub3"]}>
                        <SubMenu key="sub1" title={<span><Icon type="user-add"/><span>用户与订单管理</span></span>}>
                            <Menu.Item key={`/admin/${userName}/userManagement`}><NavLink
                                to={{pathname: `/admin/${userName}/userManagement`}}>用户管理</NavLink></Menu.Item>
                            <Menu.Item key={ `/admin/${userName}/collection`}>订单管理</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="video-camera"/><span>票品管理</span></span>}>
                            <Menu.Item key={ `/admin/${userName}/trainTicket`}><NavLink
                                to={{pathname: `/admin/${userName}/trainTicket`}}>火车票</NavLink></Menu.Item>
                            <Menu.Item key={"/admin/" + userName + "/movieTicket"}><NavLink
                                to={{pathname: `/admin/${userName}/movieTicket`}}>电影票</NavLink></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="area-chart"/><span>报表统计</span></span>}>
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
                        <span className="head-font">您以管理员{userName}的身份登陆!</span>
                        <Popconfirm placement="bottomRight" title="你确定要退出么?"
                                    onConfirm={this.logoutConfirm}
                                    okText="是" cancelText="否">
                            <Icon
                                className="icon"
                                type="logout"
                                style={{float: "right"}}
                            />
                        </Popconfirm>
                    </Header>
                    <Content style={{margin: '0 16px'}}>
                        <div style={{padding: 24, background: '#fff', minHeight: 816}}>
                            <Switch>
                                <Route path="/admin/:userName/userManagement" component={userManagement}/>
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

export default adminPage;
import React from 'react';
import {List, Icon, Switch, message, Popconfirm, Form, Input} from 'antd';
import $ from "jquery";

const listData = [];
for (let i = 0; i < 24; i++) {
    listData.push({
        href: "http://ant.design",
        userName: "longer150721",
        isFreeze: 0,
        content: ["275868482@qq.com", "13305806767", "275868482"],
        edit: false
    });
}

const IconText = ({type, text}) => (
    <div style={{position: "relative"}}>
        <div style={{position: "absolute", width: "100px", bottom: "-8px", fontWeight: "bold"}}>
            <Icon type={type} style={{marginRight: 8}}/>
            {text}
        </div>
    </div>
);

class userManagement extends React.Component {
    state = {
        dataSource: listData,
        pageSize: 8,
        chooseUser: []
    };

    componentDidMount() {
        $.ajax({
            type: "post",
            url: "/bookstoreApp/getAllUser",
            async: true,
            success: function (data) {
                this.setState({
                    dataSource: JSON.parse(data),
                })
            }.bind(this)
        });
    }

    showTotal = (total) => {
        return `共搜索到${total}名用户`;
    };

    onShowSizeChange = (current, pageSize) => {
        this.setState({
            pageSize: pageSize
        });
    };

    haveValue = (value) => {
        return (value !== "" && value !== undefined && value !== false);
    };

    checkQQ = (item, rule, value, callback) => {
        let reg = /^[0-9]+$/;
        if (item.content[2] === value) {
            callback();
        }
        else if(value && !reg.test(value)) {
            callback('输入的QQ号不符合规范!')
        }
        else if (this.haveValue(value)) {
            $.ajax({
                type: "post",
                url: "bookstoreApp/checkQQ",
                data: {qq: value},
                async: false,
                success: function (data) {
                    if (JSON.parse(data)) {
                        callback("该QQ号已被注册!");
                    }
                    else {
                        callback()
                    }
                }
            });

        }
        else {
            callback("请输入QQ!")
        }

    };

    checkPhoneNumber = (item, rule, value, callback) => {
        if (item.content[1] === value) {
            callback();
        }
        else if (this.haveValue(value)) {
            $.ajax({
                type: "post",
                url: "bookstoreApp/checkPhoneNumber",
                data: {phone: value},
                async: false,
                success: function (data) {
                    if (JSON.parse(data)) {
                        callback("该手机号已被注册!");
                    }
                    else {
                        callback()
                    }
                }
            });
        }
        else {
            callback("请输入手机号码!")
        }
    };

    checkEmail = (item, rule, value, callback) => {
        if (item.content[0] === value) {
            callback();
        }
        else if (this.haveValue(value)) {
            $.ajax({
                type: "post",
                url: "bookstoreApp/checkEmail",
                data: {email: value},
                async: false,
                success: function (data) {
                    if (JSON.parse(data)) {
                        callback("该邮箱地址已被注册!");
                    }
                    else {
                        callback();
                    }
                }
            });
        }
        else {
            callback("请输入邮箱!")
        }

    };

    changeFreeze = (item) => {
        let dataSource = this.state.dataSource;
        $.ajax({
            type: "post",
            url: "/bookstoreApp/changeFreeze",
            async: true,
            data: {userName: item.userName},
            success: function (data) {
                dataSource[dataSource.indexOf(item)].isFreeze = JSON.parse(data);
                this.setState({
                    dataSource: dataSource
                });
                if (JSON.parse(data)) {
                    message.success("用户冻结成功!")
                }
                else {
                    message.success("用户解冻成功!")
                }
            }.bind(this)
        });
    };

    changeUserMessage = (item) => {
        let {chooseUser, dataSource} = this.state;
        let {getFieldValue, getFieldError, validateFields} = this.props.form;
        if (!item.edit) {
            chooseUser.push(item.userName);
            dataSource[dataSource.indexOf(item)].edit = true;
            this.setState({
                chooseUser: chooseUser,
                dataSource: dataSource
            })
        }
        else {
            validateFields([item.userName + 'email', item.userName + 'phoneNumber', item.userName + 'qq']);
            let email = getFieldValue(item.userName + 'email');
            let phoneNumber = getFieldValue(item.userName + 'phoneNumber');
            let qq = getFieldValue(item.userName + 'qq');
            if (getFieldError(item.userName + 'email') === undefined && getFieldError(item.userName + 'phoneNumber') === undefined && getFieldError(item.userName + 'qq') === undefined
                && this.haveValue(email) && this.haveValue(phoneNumber) && this.haveValue(qq)) {
                $.ajax({
                    type: "post",
                    url: "/bookstoreApp/editUserMessage",
                    async: true,
                    data: {userName: item.userName, email: email, phone: phoneNumber, qq: qq},
                    success: function (data) {
                        if (JSON.parse(data)) {
                            message.success("用户信息已修改!")
                        }
                    }
                });
                chooseUser.splice(chooseUser.indexOf(item.userName), 1);
                dataSource[dataSource.indexOf(item)].edit = false;
                dataSource[dataSource.indexOf(item)].content[0] = email;
                dataSource[dataSource.indexOf(item)].content[1] = phoneNumber;
                dataSource[dataSource.indexOf(item)].content[2] = qq;
                this.setState({
                    chooseUser: chooseUser,
                    dataSource: dataSource
                })
            }
            else {
                message.warning("请检查用户信息的正确性!")
            }
        }
    };

    cancel = (item) => {
        let {chooseUser, dataSource} = this.state;
        chooseUser.splice(chooseUser.indexOf(item.userName), 1);
        dataSource[dataSource.indexOf(item)].edit = false;
        this.setState({
            chooseUser: chooseUser,
            dataSource: dataSource
        })
    };

    resetPassword = (item) => {
        if (item.isFreeze === 0) {
            $.ajax({
                type: "post",
                url: "/bookstoreApp/resetPassword",
                async: true,
                data: {userName: item.userName},
                success: function (data) {
                    if (JSON.parse(data)) {
                        message.success("已将用户密码重置为初始密码(123456)!")
                    }
                }
            });
        }
        else {
            message.error("用户已经被冻结,请解除冻结状态后在进行操作!")
        }
    };

    edit = (item, index) => {
        if (this.state.chooseUser.indexOf(item.userName) > -1) {
            return <div style={{position: "relative"}}>
                <Input style={{position: "absolute", width: "200px", bottom: "-53px"}}
                       placeholder={item.content[index]}/>
            </div>;
        }
        else {
            return <div style={{position: "relative"}}>
                <p style={{position: "absolute", width: "200px", bottom: "-70px"}}>{item.content[index]}</p>
            </div>
        }
    };



    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="user-list">
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        pageSize: this.state.pageSize,
                        pageSizeOptions: ['8', '16', '24'],
                        onShowSizeChange: this.onShowSizeChange,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: this.showTotal,
                        total: this.state.dataSource.length
                    }}
                    dataSource={this.state.dataSource}
                    grid={{column: 2}}
                    renderItem={item => (
                        <List.Item
                            key={item.userName}
                            actions={[<Popconfirm title={item.edit === false ? "您确定要更改该用户的信息么?":"此修改不可逆,确认修改?"} okText="是" cancelText="否"
                                                  onConfirm={() => this.changeUserMessage(item)} onCancel={item.edit === false ? null:() => this.cancel(item)}>
                                    <Switch checkedChildren="修改用户信息" unCheckedChildren="保存用户信息"
                                        checked={item.edit === false}
                                        style={{backgroundColor: "#1890ff"}} disabled={item.isFreeze === 1}/>
                                </Popconfirm>,
                                <Popconfirm title={item.isFreeze === 0 === false ? "您确定要冻结该用户么?":"您确定要解除该用户的冻结状态么?"} okText="是" cancelText="否"
                                            onConfirm={() => this.changeFreeze(item)}>
                                <Switch checkedChildren="冻结用户" unCheckedChildren="解冻用户" checked={item.isFreeze === 0}/>
                                </Popconfirm>,
                                <Popconfirm title={"此操作不可恢复,确定重置用户名为" + [item.userName] + "的密码吗?"}
                                            onConfirm={() => this.resetPassword(item)}>
                                    <a><IconText type="sync" text="重置密码"/></a>
                                </Popconfirm>]}
                            extra={<img width={270} height={205} alt="logo"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>}
                        >
                            <List.Item.Meta
                                title={<a href={item.href} style={{fontSize: "20px"}}>{item.userName}</a>}
                            />
                            <Form className="manage-form">
                                <Form.Item
                                    label="邮箱"
                                >
                                    {getFieldDecorator(item.userName + 'email', {
                                        rules: [{type: 'email', message: '输入的电子邮箱地址不符合规范!'}, {
                                            validator: this.checkEmail.bind(this, item)
                                        }],
                                    })(
                                        this.edit(item, 0)
                                    )}
                                </Form.Item>
                                <Form.Item
                                    label="手机"
                                >
                                    {getFieldDecorator(item.userName + 'phoneNumber', {
                                        rules: [{len: 11, message: '请输入正确的11位手机号码!'}, {
                                            validator: this.checkPhoneNumber.bind(this, item)
                                        }],
                                    })(
                                        this.edit(item, 1)
                                    )}
                                </Form.Item>
                                <Form.Item
                                    label="QQ"
                                >
                                    {getFieldDecorator(item.userName + 'qq', {
                                        rules: [{validator: this.checkQQ.bind(this, item)}],
                                    })(
                                        this.edit(item, 2)
                                    )}
                                </Form.Item>
                            </Form>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

const userManagementForm = Form.create()(userManagement);

export default userManagementForm;
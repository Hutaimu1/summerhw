import React from 'react';
import {Form, Input, Button, Radio} from 'antd';
import $ from "jquery";
import {message} from "antd/lib/index";


class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.initState()
        }
    }

    initState = () => {
        return {
            expression: '获取邮箱验证码',
            validate: '',
            validateInput: '',
            confirmDirty: false,
        };
    };

    haveValue = (value) => {
        return (value !== "" && value !== undefined);
    };

    renderCode = () => {
        let email = this.props.form.getFieldValue('email');
        if(this.haveValue(email)){
            $.ajax({
                type : "post",
                url : "bookstoreApp/mailValidate",
                data : {email:email,type:"重置密码"},
                async : true,
                success : function(data){
                    this.setState({//设置更新状态
                        expression: "发送成功,点击重新发送",
                        validate: JSON.parse(data)
                    });
                }.bind(this)
            });
            this.setState({//设置更新状态
                expression: "邮件发送中...",
            });
        }
        else{
            this.setState({//设置更新状态
                expression: "请先输入邮箱后重新获取",
            });
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let userName = this.props.form.getFieldValue('userName');
        let password = this.props.form.getFieldValue('password');
        let confirm = this.props.form.getFieldValue('confirm');
        let email = this.props.form.getFieldValue('email');
        let captcha = this.props.form.getFieldValue('captcha');
        if (this.haveValue(userName) && this.haveValue(password) && this.haveValue(email) && this.haveValue(confirm) && this.haveValue(captcha)) {
            $.post("/bookstoreApp/forgetPassword", {
                userName: userName,
                password: password,
            }, function (data) {
                if (JSON.parse(data)) {
                    message.info('密码重置成功,返回登录界面!');
                    this.props.history.push('/');
                }
            }.bind(this));
        }
        this.props.form.validateFields((err, values) => {
        });
    };

    checkCaptacha = (rule, value, callback) => {
        let thisInput = value;
        let validateCode = this.state.validate;
        if (this.haveValue(thisInput) && thisInput!== validateCode.toString()) {
            callback('验证码错误!');
        }
        callback()
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    checkUserName = (rule, value, callback) => {
        let reg = /^[A-Za-z]+$/;
        if (value && !reg.test(value[0])) {
            callback('用户名必须以字母开头!');
        }
        if (this.haveValue(value)) {
            $.ajax({
                type : "post",
                url : "bookstoreApp/checkUserName",
                data : {userName:value},
                async : false,
                success : function(data){
                    if (!JSON.parse(data)) {
                        callback("该用户名不存在!");
                    }
                }
            });
        }
        callback();
    };

    checkBindEmail = (rule, value, callback) => {
        let userName = this.props.form.getFieldValue('userName');
        if (!this.haveValue(userName)){
            callback("请先输入用户名!");
        }
        if (this.haveValue(value)) {
            $.ajax({
                type : "post",
                url : "bookstoreApp/checkBindEmail",
                data : {userName:userName,email:value} ,
                async : false,
                success : function(data){
                    if (!JSON.parse(data)) {
                        callback("该邮箱号与输入的用户名不匹配!");
                    }
                }
            });
        }
        callback()
    };

    AnalyzePasswordSecurityLevel = (e) => {
        const value = e.target.value;
        let securityLevelFlag = 0;
        let securityLevelFlagArray = [0, 0, 0, 0];
        for (let i = 0; i < value.length; i++) {
            let asciiNumber = value.substr(i, 1).charCodeAt();
            if (asciiNumber >= 48 && asciiNumber <= 57) {
                securityLevelFlagArray[0] = 1;  //digital
            }
            else if (asciiNumber >= 97 && asciiNumber <= 122) {
                securityLevelFlagArray[1] = 1;  //lowercase
            }
            else if (asciiNumber >= 65 && asciiNumber <= 90) {
                securityLevelFlagArray[2] = 1;  //uppercase
            }
            else {
                securityLevelFlagArray[3] = 1;  //specialcase
            }
        }
        for (let i = 0; i < securityLevelFlagArray.length; i++) {
            if (securityLevelFlagArray[i] === 1) {
                securityLevelFlag++;
            }
        }
        this.setState({//设置更新状态
            securityLevelFlag: securityLevelFlag.toString(),
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('请确保两次输入的密码相同!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div className="forget-form">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label="用户名"
                        hasFeedback
                    >
                        {getFieldDecorator('userName', {
                            rules: [{required: true, message: '请输入用户名!', whitespace: true}, {
                                validator: this.checkUserName
                            }],
                        })(
                            <Input placeholder="请输入您的用户名"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="电子邮箱"
                        hasFeedback
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: '输入的电子邮箱地址不符合规范!',
                            }, {
                                required: true, message: '请输入电子邮箱地址!',
                            }, {
                                validator: this.checkBindEmail
                            }],
                        })(
                            <Input placeholder="请输入您注册时绑定的电子邮箱地址"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="验证码">
                        {getFieldDecorator('captcha', {
                            rules: [{required: true, message: '验证码不能为空!'}, {
                                validator: this.checkCaptacha
                            }],
                        })(
                            <Input className="forget-form-input-captcha" placeholder="请输入您邮箱中的8位验证码"/>
                        )}
                        <Button type="primary"
                                onClick={this.renderCode}
                                className="forget-form-button-captcha">
                            {this.state.expression}</Button>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="密码"
                        hasFeedback
                        validateStatus={this.state.validateStatus}
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: '请输入密码!',
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input type="password" onChange={this.AnalyzePasswordSecurityLevel} placeholder="请重置密码"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="密码安全性"
                    >
                        <Radio.Group disabled value={this.state.securityLevelFlag}>
                            <Radio.Button value="1">低</Radio.Button>
                            <Radio.Button value="2">中</Radio.Button>
                            <Radio.Button value="3">高</Radio.Button>
                            <Radio.Button value="4">极高</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="确认密码"
                        hasFeedback
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: '请再次输入密码!',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} placeholder="请再次输入密码"/>
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="forget-form-button-left">重置密码</Button>
                        <Button type="primary" className="forget-form-button-right"
                                onClick={() => this.props.history.push('/')}>返回主页</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const RegistrationForm = Form.create()(Registration);

export default RegistrationForm;
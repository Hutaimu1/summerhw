import React from 'react';
import {Form, Input, Tooltip, Icon, Select, Checkbox, Button, Radio} from 'antd';
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
        let result;
        $.ajaxSetup(
            {
                async: false
            });
        $.post("/bookstoreApp/mailValidate", {email:email}, function (data) {
            result = JSON.parse(data);
        });
        this.setState({//设置更新状态
            expression: "点击重新获取验证码",
            validate: result
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let userName = this.props.form.getFieldValue('userName');
        let password = this.props.form.getFieldValue('password');
        let email = this.props.form.getFieldValue('email');
        let qq = this.props.form.getFieldValue('qq');
        let phone = this.props.form.getFieldValue('phone');
        let captcha = this.props.form.getFieldValue('captcha');
        if (this.haveValue(userName) && this.haveValue(password) && this.haveValue(email) && this.haveValue(qq) && this.haveValue(phone) && this.haveValue(captcha)) {
            $.post("/bookstoreApp/registerUser", {
                userName: userName,
                password: password,
                email: email,
                qq: qq,
                phone: phone
            }, function (data) {
                if (JSON.parse(data)) {
                    message.info('注册成功!');
                }
            });
        }
        this.props.form.validateFields((err, values) => {
        });
    };

    checkCaptacha = (rule, value, callback) => {
        let thisInput = value;
        let validateCode = this.state.validate;
        if (this.haveValue(thisInput) && thisInput.toLowerCase() !== validateCode.toString().toLowerCase()) {
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
            $.ajaxSetup(
                {
                    async: false
                });
            $.post("/bookstoreApp/checkUserName", {userName: value}, function (data) {
                if (JSON.parse(data)) {
                    callback("该用户名已被占用!");
                }
            });
        }
        callback();
    };

    checkQQ = (rule, value, callback) => {
        let reg = /^[0-9]+$/;
        if (value && !reg.test(value)) {
            callback('输入的QQ号不符合规范!')
        }
        if (this.haveValue(value)) {
            $.ajaxSetup(
                {
                    async: false
                });
            $.post("/bookstoreApp/checkQQ", {qq: value}, function (data) {
                if (JSON.parse(data)) {
                    callback("该QQ已被注册!");
                }
            });
        }
        callback()
    };

    checkPhoneNumber = (rule, value, callback) => {
        if (this.haveValue(value)) {
            $.ajaxSetup(
                {
                    async: false
                });
            $.post("/bookstoreApp/checkPhoneNumber", {phone: value}, function (data) {
                if (JSON.parse(data)) {
                    callback("该手机号已被注册!");
                }
            });
        }
        callback()
    };

    checkEmail = (rule, value, callback) => {
        if (this.haveValue(value)) {
            $.ajaxSetup(
                {
                    async: false
                });
            $.post("/bookstoreApp/checkEmail", {email: value}, function (data) {
                if (JSON.parse(data)) {
                    callback("该邮箱号已被注册!");
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
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{width: 70}}>
                <Select.Option value="86">+86</Select.Option>
                <Select.Option value="852">+852</Select.Option>
                <Select.Option value="853">+853</Select.Option>
                <Select.Option value="886">+886</Select.Option>
            </Select>
        );

        return (
            <div className="registration-form">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label={(
                            <span>
              用户名&nbsp;
                                <Tooltip title="你将使用此处填写的用户名进行登录">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                        )}
                        hasFeedback
                    >
                        {getFieldDecorator('userName', {
                            rules: [{required: true, message: '请输入用户名!', whitespace: true}, {
                                validator: this.checkUserName
                            }],
                        })(
                            <Input/>
                        )}
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
                            <Input type="password" onChange={this.AnalyzePasswordSecurityLevel}/>
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
                            <Input type="password" onBlur={this.handleConfirmBlur}/>
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
                                validator: this.checkEmail
                            }],
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="QQ"
                        hasFeedback
                    >
                        {getFieldDecorator('qq', {
                            rules: [{
                                required: true, message: '请输入QQ号!',
                            }, {
                                validator: this.checkQQ
                            }],
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="手机号码"
                        hasFeedback
                    >
                        {getFieldDecorator('phone', {
                            rules: [{required: true, message: '请输入手机号码!'}, {
                                len: 11, message: '请输入正确的11位手机号码!'
                            }, {
                                validator: this.checkPhoneNumber
                            }],
                        })(
                            <Input addonBefore={prefixSelector} style={{width: '100%'}}/>
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
                            <Input className="registration-form-input-captcha" placeholder="请输入验证码"/>
                        )}
                        <Button type="primary"
                                onClick={this.renderCode}
                                className="registration-form-button-captcha">
                            {this.state.expression}</Button>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>注册即代表阅读并同意<a href="">服务条款</a></Checkbox>
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="registration-form-button">注册并登陆</Button>
                        <Button type="primary" htmlType="submit" className="registration-form-button"
                                onClick={() => this.props.history.push('/')}>返回主页</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const RegistrationForm = Form.create()(Registration);

export default RegistrationForm;
import React from 'react';
import {Form, Icon, Input, Button, message} from 'antd';
import $ from 'jquery';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.initState()
        }
    }

    initState = () => {
        return {
            expression: '获取验证码',
            validate: '',
            validateInput: ''
        };
    };

    haveValue = (value) =>{
        return (value !== "" && value !== undefined);
    };

    renderCode = () => {
        //定义expression和result，expression是字符串，result可能是字符串也可能是数字
        let expression = '', result;

        result = 0;//计算类型则result为数字，初始化为0
        //获取随机的两个两位数
        let Calpre = Math.round(Math.random() * 100);
        let Calafter = Math.round(Math.random() * 100);

        let codeCal = ['-', '+', 'x'];//运算符
        let i = Math.round(Math.random() * 2);//获得随机运算符

        switch (codeCal[i]) {//判断运算符并计算
            case '-':
                expression = Calpre + '-' + Calafter;
                result = Calpre - Calafter;
                break;
            case '+':
                expression = Calpre + '+' + Calafter;
                result = Calpre + Calafter;
                break;
            case 'x':
                expression = Calpre + 'x' + Calafter;
                result = Calpre * Calafter;
                break;
            default:
                break;
        }

        this.setState({//设置更新状态
            expression: expression,
            validate: result
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let userName = this.props.form.getFieldValue('userName');
        let password = this.props.form.getFieldValue('password');
        let captcha = this.props.form.getFieldValue('captcha');
        if (this.haveValue(userName) && this.haveValue(password) && this.haveValue(captcha)){
            $.post("/bookstoreApp/login", {userName: userName, password: password}, function (data) {
                if (JSON.parse(data)[0]) {
                    if (JSON.parse(data)[1]) {
                        message.info('您的账号已被冻结,请联系管理员!');
                    }
                    else {
                        if (JSON.parse(data)[2]) {
                            message.info('以管理员身份登陆成功!');
                        }
                        else {
                            message.info('以用户身份登陆成功!');
                        }
                    }
                }
                else {
                    message.info('用户名密码错误!');
                }
            });
        }
        this.props.form.validateFields((err, values) => {});
    };

    checkCaptacha = (rule, value, callback) => {
        let thisInput = value;
        let validateCode = this.state.validate;
        if (this.haveValue(thisInput) && thisInput.toLowerCase() !== validateCode.toString().toLowerCase()) {
            callback('验证码错误!');
        }
        callback()
    };

    checkUserName = (rule, value, callback) => {
        let reg = /^[A-Za-z]+$/;
        if (value && !reg.test(value[0])) {
            callback('用户名必须以字母开头!')
        }
        callback()
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: '用户名不能为空!'}, {
                            validator: this.checkUserName
                        }],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="用户名"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '密码不能为空!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="密码"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('captcha', {
                        rules: [{required: true, message: '验证码不能为空!'}, {
                            validator: this.checkCaptacha
                        }],
                    })(
                        <Input  prefix={<Icon type="qrcode" style={{color: 'rgba(0,0,0,.25)'}}/>} className="login-form-input-captcha" placeholder="请输入验证码" />
                    )}
                    <Button type="primary"
                            onClick={this.renderCode}
                            className="login-form-button-captcha">
                        {this.state.expression}</Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    <a href="">忘记密码?</a>
                    <a className="login-form-register"
                       onClick={() => this.props.history.push('/registration')}>新用户注册!</a>
                </Form.Item>
            </Form>
        );
    }
}

const LoginForm = Form.create()(Login);

export default LoginForm;
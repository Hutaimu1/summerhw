import React from 'react';
import {Form, Icon, Input, Button} from 'antd';
import Captcha from "../component/captcha_login";

class Login extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
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
                <Captcha size="4"/>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    <a href="">忘记密码?</a>
                    <a className="login-form-register" onClick={() => this.props.history.push('/registration')}>新用户注册!</a>
                </Form.Item>
            </Form>
        );
    }
}

const LoginForm = Form.create()(Login);

export default LoginForm;
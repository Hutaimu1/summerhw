import React from 'react';
import {Form, Input, Tooltip, Icon, Select, Checkbox, Button, Radio} from 'antd';

class Registration extends React.Component {
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
            validateInput: '',
            confirmDirty: false,
        };
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

    validate = (rule, value, callback) => {
        let thisInput = value;
        let validateCode = this.state.validate;
        if (thisInput === undefined || thisInput === '') {
            callback('验证码错误!');
            return
        }
        if (thisInput !== '' && thisInput.toLowerCase() !== validateCode.toString().toLowerCase()) {
            callback('验证码错误!');
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
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
        callback()
    };

    checkQQ = (rule, value, callback) => {
        let reg = /^[0-9]+$/;
        if (value && !reg.test(value)) {
            callback('输入的QQ号不符合规范!')
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
                        {getFieldDecorator('username', {
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
                        <Radio.Group disabled value = {this.state.securityLevelFlag}>
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
                                validator: this.validate
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
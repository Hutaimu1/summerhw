import React from 'react';
import {Form, Input, Button} from 'antd';

const FormItem = Form.Item;

class Captcha extends React.Component {
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
        if (thisInput.toLowerCase() !== validateCode.toString().toLowerCase() && thisInput !== '') {
            callback('验证码错误!');
        }
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
        return (
            <FormItem
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
            </FormItem>
        );
    }
}

const CaptchaForm = Form.create()(Captcha);

export default CaptchaForm;




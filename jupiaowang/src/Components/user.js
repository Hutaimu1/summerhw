import React from 'react'
import {message,Button,Form,Input,Select} from 'antd'
import $ from "jquery";

let myMessage = {password:"htm123280520",email:"2057572565@qq.com",QQ:"2057572565",telPhone:"13262625692"};

class user extends React.Component{

    state = {
        isEdit:false,
        expression: '获取邮箱验证码',
        validate: '',
        emailAble:false,
        userMessage:myMessage,
        imageData:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532024014474&di=5fc176a004c12c1b7e30c9b632ab533c&imgtype=0&src=http%3A%2F%2Fnewsimg.5054399.com%2Fuploads%2Fuserup%2F1303%2F2109332V203.jpg',
    };

    componentDidMount(){
        let userName = this.props.match.params.userName;
        let result ={};
        $.ajax({
            type: "post",
            url: "bookstoreApp/getUserMessage",
            data: {userName: userName},
            async: true,
            success: function (data) {
                result = JSON.parse(data);

                this.setState({
                    userMessage:result,
                    imageData:result.image === ""?this.state.imageData:result.image
                });
            }.bind(this),
        });
    }

    handleEdit = () =>{
      this.setState({
          isEdit:!this.state.isEdit
      })
    };

    handleModify = () => {
        let result = {};
        let userName = this.props.match.params.userName;
        let password = this.props.form.getFieldValue('password');
        let email = this.props.form.getFieldValue('email');
        let phone = this.props.form.getFieldValue('phone');
        let QQ = this.props.form.getFieldValue('qq');
        result.password = password;
        result.email = email;
        result.telPhone = phone;
        result.QQ = QQ;
        if(password === this.state.userMessage.password && email === this.state.userMessage.email && phone === this.state.userMessage.telPhone && QQ === this.state.userMessage.QQ) {
            message.warning("您并未修改个人信息");
            this.setState({
                isEdit:!this.state.isEdit
            });
        }
        else {
            this.setState({
                userMessage: result,
                isEdit: !this.state.isEdit
            });
            $.post("/bookstoreApp/editUserMessage", {
                userName: userName,
                password: password,
                email: email,
                phone: phone,
                qq: QQ
            }, function (data) {
                if (JSON.parse(data)) {
                    message.success('修改个人信息成功!');
                }
                else {
                    message.success('修改个人信息成功，由于您修改了密码，请重新登录');
                    this.props.history.push('/');
                }
            }.bind(this));
        }
    };

    setValidateStatus = (index) => {
        const {isFieldTouched, getFieldError} = this.props.form;
        if (isFieldTouched(index) && getFieldError(index)){
            return 'error'
        }
        else if(!isFieldTouched(index)){
            return ''
        }
        else{
            return 'success'
        }
    };

    haveValue = (value) => {
        return (value !== "" && value !== undefined && value !== false);
    };

    isPasswordModify(){
      let password = this.props.form.getFieldValue('password');
      return (password !== this.state.userMessage.password);
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if(!this.haveValue(value)){
            callback('请输入密码!');
        }
        else if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if(!this.haveValue(value)){
            callback('请再次输入密码!');
        }
        else if (value && value !== form.getFieldValue('password')) {
            callback('请确保两次输入的密码相同!');
        } else {
            callback();
        }
    };

    checkEmail = (rule, value, callback) => {
        if(!this.haveValue(value)){
            callback('请输入电子邮箱!');
        }
        if (this.haveValue(value) && value !== this.state.userMessage.email) {
            $.ajax({
                type: "post",
                url: "bookstoreApp/checkEmail",
                data: {email: value},
                async: false,
                success: function (data) {
                    if (JSON.parse(data)) {
                        callback("该邮箱地址已被注册!");
                    }
                }
            });
        }
        callback()
    };

    checkPhoneNumber = (rule, value, callback) => {
        if(!this.haveValue(value)){
            callback('请输入手机号!');
        }
        if (this.haveValue(value)) {
            if (this.haveValue(value) && value !== this.state.userMessage.telPhone) {
                $.ajax({
                    type: "post",
                    url: "bookstoreApp/checkPhoneNumber",
                    data: {phone: value},
                    async: false,
                    success: function (data) {
                        if (JSON.parse(data)) {
                            callback("该手机号已被注册!");
                        }
                    }
                });
            }
        }
        callback()
    };

    handleMailChange = (value) => {
        let options;
        if (!value || value.indexOf('@') >= 0) {
            options = [];
        } else {
            options = ['126.com', '163.com', 'qq.com', 'sina.com'].map((domain) => {
                const email = `${value}@${domain}`;
                return <Select.Option key={email}>{email}</Select.Option>;
            });
        }
        this.setState({options});
    };

    checkQQ = (rule, value, callback) => {
        let reg = /^[0-9]+$/;
        if(!this.haveValue(value)){
            callback('请输入QQ号!');
        }
        else if (value && !reg.test(value)) {
            callback('输入的QQ号不符合规范!')
        }
        if (this.haveValue(value) && value !== this.state.userMessage.QQ) {
            if (this.haveValue(value)) {
                $.ajax({
                    type: "post",
                    url: "bookstoreApp/checkQQ",
                    data: {qq: value},
                    async: false,
                    success: function (data) {
                        if (JSON.parse(data)) {
                            callback("该QQ号已被注册!");
                        }
                    }
                });
            }
        }
        callback()
    };

    checkCaptacha = (rule, value, callback) => {
        let thisInput = value;
        let validateCode = this.state.validate;
        if (this.haveValue(thisInput) && thisInput.toLowerCase() !== validateCode.toString().toLowerCase()) {
            callback('验证码错误!');
        }
        callback()
    };

    renderCode = () => {
        let email = this.props.form.getFieldValue('email');
        if (this.haveValue(email)) {
            $.ajax({
                type: "post",
                url: "bookstoreApp/mailValidate",
                data: {email: email, type: "邮箱更改"},
                async: true,
                success: function (data) {
                    this.setState({//设置更新状态
                        expression: "发送成功,点击重新发送",
                        validate: JSON.parse(data),
                        emailAble:false
                    });
                }.bind(this)
            });
            this.setState({//设置更新状态
                expression: "邮件发送中...",
                emailAble:true
            });
        }
        else {
            this.setState({//设置更新状态
                expression: "请先输入邮箱后重新获取",
            });
        }
    };

    enableClick = () =>{
        let password = this.props.form.getFieldValue('password');
        let confirm = this.props.form.getFieldValue('confirm');
        let email = this.props.form.getFieldValue('email');
        let phone = this.props.form.getFieldValue('phone');
        let QQ = this.props.form.getFieldValue('qq');
        let captcha = this.props.form.getFieldValue('captcha');
        if(!this.haveValue(password) || !this.haveValue(email) || !this.haveValue(phone) || !this.haveValue(QQ)){
            return true;
        }
        else if((password !== this.state.userMessage.password) && (password !== confirm)){
            return true;
        }

        else if(email !== this.state.userMessage.email &&(!this.haveValue(captcha)|| (this.haveValue(captcha) && (captcha!==this.state.validate)))){
            return true;
        }
        return false;
    };

    repeat(str , n){
        return new Array(n+1).join(str);
    }

    hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field])
    };

    handlePath = () =>{
        let userName = this.props.match.params.userName;
        $('.upload').change(function(){
            let oFReader = new FileReader();
            let file = document.getElementById('input-image').files[0];
            if(file.type.substring(0,5) !== 'image'){
                message.error('请上传一个图片!');
            }
            else if(file.size >= 1024 * 1024){
                message.error('上传头像的大小要小于1MB!');
            }
            else if(file.type.substring(0,5) === 'image' && file.size < 1024 * 1024){
                oFReader.readAsDataURL(file);
                oFReader.onloadend = function(oFRevent){
                    let src = oFRevent.target.result;
                    $('img').attr('src',src);
                    $.ajax({
                        type: "post",
                        url: "bookstoreApp/uploadImage",
                        data: {userName: userName,url:src},
                        async: true,
                        success: function (data) {
                            if(JSON.parse(data)){
                                message.success('上传头像成功!');
                                this.setState({
                                    imageData:src
                                })
                            }
                        }.bind(this),
                    });
                };
            }
        })
    };


    render(){
        let userName = this.props.match.params.userName;
        const {isEdit,userMessage } = this.state;
        const {getFieldDecorator,getFieldsError} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span:8},
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
            <div style={{fontWeight: "bold", marginLeft: "10px"}}>
                <div className="user-left">
                    <img src={this.state.imageData} alt="" className={"image-size"}/>
                    <input id="input-image" className="upload" type="file" value="" placeholder="请上传头像" onClick={() => this.handlePath()}/>
                </div>
                <div className="user-right">
                    <Form>
                        <Form.Item
                            style={{height:'39.2px'}}
                            validateStatus={this.setValidateStatus("userName")}
                            {...formItemLayout}
                            label='用户名'
                        >
                            {getFieldDecorator('userName', {
                            })(
                                <span>{userName}</span>
                            )}
                        </Form.Item>
                        <Form.Item
                            style={{height:'39.2px'}}
                            validateStatus={this.setValidateStatus("password")}
                            {...formItemLayout}
                            label='密码'
                        >
                            {getFieldDecorator('password', {
                                initialValue:userMessage.password,
                                rules: [{
                                    validator: this.validateToNextPassword,
                                }],
                            })(
                                isEdit?<Input  type="password"/>:<span>{this.repeat('*',userMessage.password.length)}</span>
                            )}
                        </Form.Item>
                        {isEdit?
                            <Form.Item
                                style={{height:'39.2px'}}
                                validateStatus={this.setValidateStatus("confirm")}
                                {...formItemLayout}
                                label='确认密码'
                            >
                                {getFieldDecorator('confirm', {
                                    rules: [ {
                                        validator: this.compareToFirstPassword,
                                    }],
                                })(
                                    <Input type="password" onBlur={this.handleConfirmBlur} placeholder="请确认密码" disabled={this.props.form.getFieldValue('password')===userMessage.password}/>
                                )}
                            </Form.Item>:null}
                        <Form.Item
                            style={{height:'39.2px'}}
                            validateStatus={this.setValidateStatus("qq")}
                            {...formItemLayout}
                            label='QQ'
                        >
                            {getFieldDecorator('qq', {
                                initialValue:userMessage.QQ,
                                rules: [{
                                    validator: this.checkQQ
                                }],
                            })(
                                isEdit?<Input placeholder={userMessage.QQ}/>:<span>{userMessage.QQ}</span>
                            )}
                        </Form.Item>
                        <Form.Item
                            style={{height:'39.2px'}}
                            validateStatus={this.setValidateStatus("phone")}
                            {...formItemLayout}
                            label='手机号码'
                        >
                            {getFieldDecorator('phone', {
                                initialValue:userMessage.telPhone,
                                rules: [{
                                    len: 11, message: '请输入正确的11位手机号码!'
                                }, {
                                    validator: this.checkPhoneNumber
                                }],
                            })(
                                isEdit?<Input addonBefore={prefixSelector} style={{width: '100%'}} placeholder={userMessage.telPhone}/>:<span>{userMessage.telPhone}</span>
                            )}
                        </Form.Item>
                        <Form.Item
                            validateStatus={this.setValidateStatus("email")}
                            {...formItemLayout}
                            label='电子邮箱'
                        >
                            {getFieldDecorator('email', {
                                initialValue:userMessage.email,
                                rules: [{
                                    type: 'email', message: '输入的电子邮箱地址不符合规范!',
                                }, {
                                    message: '请输入您的电子邮箱地址!',
                                }, {
                                    validator: this.checkEmail
                                }],
                            })(
                                isEdit?<Select
                                    mode="combobox"
                                    onChange={this.handleMailChange}
                                    filterOption={false}
                                    placeholder={userMessage.email}
                                >
                                    {this.state.options}
                                </Select>:<span>{userMessage.email}</span>
                            )}
                        </Form.Item>
                        {isEdit?<Form.Item
                            validateStatus={this.setValidateStatus("captcha")}
                            {...formItemLayout}
                            label="验证码">
                            {getFieldDecorator('captcha', {
                                rules: [ {required:this.props.form.getFieldValue('email') !== userMessage.email && this.haveValue(this.props.form.getFieldValue('email')),
                                message:'验证码不能为空'},{
                                    validator: this.checkCaptacha
                                }],
                            })(
                                <Input className="registration-form-input-captcha" placeholder="请输入验证码" disabled={this.props.form.getFieldValue('email') === userMessage.email || !this.haveValue(this.props.form.getFieldValue('email'))}/>
                            )}
                            <Button type="primary"
                                    onClick={this.renderCode}
                                    className="registration-form-button-captcha"
                                    disabled={this.props.form.getFieldValue('email') === userMessage.email || !this.haveValue(this.props.form.getFieldValue('email'))}>
                                {this.state.expression}</Button>
                        </Form.Item>:null}
                        <Form.Item {...tailFormItemLayout}>
                            {isEdit?
                                <Button type="primary" className="edit-form-button-right"
                                            onClick={() => this.handleModify()} disabled={this.enableClick() || this.hasErrors(getFieldsError())}>确定</Button>
                                :<Button type="primary" htmlType="submit" className="edit-form-button-left"
                                            onClick={() => this.handleEdit()}>编辑</Button>}
                        </Form.Item>

                    </Form>
                </div>
            </div>
        )
    }
}

const UserForm = Form.create()(user);

export default UserForm;

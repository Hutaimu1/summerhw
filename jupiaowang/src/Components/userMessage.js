import React from 'react'
import {message,Button,Form,Input,Select,Modal,Upload,Icon,Popconfirm} from 'antd'
import $ from "jquery";

let myMessage = {userName:'',password:"123456",content:["2057572565@qq.com","13262625692","2057572565"]};

class user extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            expression: '获取邮箱验证码',
            validate: '',
            userMessage: myMessage,
            previewVisible: false,
            previewImage: "",
            fileList: [],
        };
    };

    componentDidMount(){
        let userName = this.props.match.params.userName;
        let result ={};
        let list = [];
        $.ajax({
            type: "post",
            url: "bookstoreApp/getUserMessage",
            data: {userName: userName},
            async: true,
            success: function (data) {
                result = JSON.parse(data);
                this.setState({
                    userMessage:result,
                });
                if(result.image.length !== 0){
                    list.push({
                        name:result.content[3],
                        status:result.content[4],
                        uid:parseInt(result.content[5],0),
                        thumbUrl:result.image
                    });
                    this.setState({
                        fileList:list,
                        previewImage:result.image
                    });
                }
            }.bind(this),
        });
    }

    handleModify = () => {
        let result = {};
        let content = [];
        let userName = this.props.match.params.userName;
        let password = this.props.form.getFieldValue('password');
        let email = this.props.form.getFieldValue('email');
        let phone = this.props.form.getFieldValue('phone');
        let QQ = this.props.form.getFieldValue('qq');
        result.userName = userName;
        result.password = password;
        content.push(email);
        content.push(phone);
        content.push(QQ);
        result.content = content;
        if(password === this.state.userMessage.password && email === this.state.userMessage.content[0] && phone === this.state.userMessage.content[1] && QQ === this.state.userMessage.content[2]) {
            message.warning("您并未修改个人信息");
            this.setState({
                expression:'获取邮箱验证码'
            });
        }
        else {
            $.post("/bookstoreApp/editUserMessage", {
                userName: userName,
                password: password,
                email: email,
                phone: phone,
                qq: QQ
            }, function (data) {
                if (JSON.parse(data)) {
                    this.setState({
                        userMessage: result,
                        expression:'获取邮箱验证码',
                        validate:''
                    });
                    message.success('修改个人信息成功!');
                }
                else {
                    this.setState({
                        userMessage: result
                    });
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

    resetEdit = () =>{
        let password = this.state.userMessage.password;
        let email =this.state.userMessage.content[0];
        let phone = this.state.userMessage.content[1];
        let qq = this.state.userMessage.content[2];
        this.props.form.setFieldsValue({"password":password,"email":email,"phone":phone,"qq":qq,"confirm":null});
        this.setState({
            expression:"获取邮箱验证码",
            validate:''
        });
        this.props.form.setFieldsValue({"captcha":null});
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
        if(!this.haveValue(value) && this.props.form.getFieldValue('password') !== this.state.userMessage.password){
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
        if (this.haveValue(value) && value !== this.state.userMessage.content[0]) {
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
            if (this.haveValue(value) && value !== this.state.userMessage.content[1]) {
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
        if (this.haveValue(value) && value !== this.state.userMessage.content[2]) {
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

    checkCaptcha = (rule, value, callback) => {
        let validateCode = this.state.validate;
        if(this.state.expression === "发送成功,点击重新发送" && !this.haveValue(value)){
            callback("请输入验证码!")
        }
        if (this.state.expression === "发送成功,点击重新发送" && this.haveValue(value) && value.toLowerCase() !== validateCode.toString().toLowerCase()) {
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
                data: {email: email, type: "个人信息更改"},
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
        let content = this.state.userMessage.content;
        if(!this.haveValue(password) || !this.haveValue(email) || !this.haveValue(phone) || !this.haveValue(QQ)){
            return true;
        }
        else if((password !== this.state.userMessage.password) && (password !== confirm)){
            return true;
        }
        else if((password !== this.state.userMessage.password || phone !== content[1] || email !== content[0] || QQ !== content[2])
            && !this.haveValue(captcha)){
            return true;
        }
        return false;
    };

    emailButtonDisabled = () => {
        let password = this.props.form.getFieldValue('password');
        let confirm = this.props.form.getFieldValue('confirm');
        let email = this.props.form.getFieldValue('email');
        let phone = this.props.form.getFieldValue('phone');
        let QQ = this.props.form.getFieldValue('qq');
        let expression = this.state.expression;
        let content = this.state.userMessage.content;
        if(!this.haveValue(password) || !this.haveValue(email) || !this.haveValue(phone) || !this.haveValue(QQ)){
            return true;
        }
        else if(password === this.state.userMessage.password && phone === content[1] && email === content[0] && QQ === content[2]){
            return true;
        }
        else if(password !== this.state.userMessage.password && password !==confirm){
            return true;
        }
        else if(expression === "邮件发送中..."){
            return true;
        }
        return false;
    };

    repeat = (str , n) =>{
        return new Array(n+1).join(str);
    };

    hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field])
    };

    beforeUpload = (file) =>{
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('请确保上传图片的大小小于2MB!');
        }
        return isLt2M;
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = (file) => {
        this.setState({
            previewImage: file.thumbUrl || file.url,
            previewVisible: true,
        });
    };

    handleChange = ({fileList}) => {
        let userName = this.props.match.params.userName;
        if (fileList.length !== 0) {
            this.setState({fileList});
            if(fileList[0].status === "done"){
                message.success("上传头像成功!");
            }
            else if(fileList[0].status ===undefined){
                this.setState({
                    fileList:[]
                })
            }
            else if(fileList[0].status === "error"){
                message.error("上传头像失败,请选择其他图片!");
                /* this.setState({
                     fileList:[]
                 })*/
            }
        }
        else if(fileList.length === 0){
            $.ajax({
                type: "post",
                url: "bookstoreApp/deleteImage",
                data: {userName: userName},
                async: true,
                success: function (data) {
                    if(JSON.parse(data)){
                        message.success('删除头像成功!');
                        this.setState({
                            previewImage:'',
                            fileList:fileList
                        })
                    }
                    else {
                        message.error('删除头像失败!')
                    }
                }.bind(this)
            })
        }
    };

    handleData = (file) =>{
        let userName = this.props.match.params.userName;
        return {userName:userName};
    };

    render(){
        let userName = this.props.match.params.userName;
        const { previewVisible, previewImage, fileList,userMessage } = this.state;
        const {getFieldDecorator,getFieldsError,getFieldError} = this.props.form;

        const uploadButton = (
            <div className="upload-button">
                <Icon type="user" />
                <div className="ant-upload-text">上传头像</div>
            </div>
        );

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
            <div style={{marginTop:"20px",marginLeft:"10px",position:'relative'}}>
                <div className="user">
                    <div className="message-header">
                        <div className="message-left">
                            <Upload
                                action="/bookstoreApp/uploadImage"
                                listType="picture-card"
                                fileList={fileList}
                                accept='image/*'
                                beforeUpload={this.beforeUpload}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                                data={this.handleData}
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="myImage" style={{ width: "100%" }} src={previewImage} />
                            </Modal>
                        </div>
                        <div className="message-right">
                            <br style={{height:"10px"}}/>
                            <div className="user-name">
                                <p className="user-name1">用户名:{userName}</p>
                            </div>
                            <div className="user-message1">
                                <a style={{color:'black'}}>我的收藏</a>
                            </div>
                            <div className="user-message2">
                                <a style={{color:'black'}}>我的订单</a>
                            </div>
                            <div className="user-message3">
                                <a style={{color:'black'}}>重置密码</a>
                            </div>
                            <div className="user-message4">
                                <a style={{color:'black'}}>To Be Continued</a>
                            </div>
                        </div>
                    </div>
                    <div className="message-body-edit">
                        <Form>
                            <Form.Item
                                validateStatus={this.setValidateStatus("password")}
                                {...formItemLayout}
                                label={<span style={{fontSize:"17px",fontWeight:'bold'}}>密码</span>}
                            >
                                {getFieldDecorator('password', {
                                    initialValue:userMessage.password,
                                    rules: [{
                                        validator: this.validateToNextPassword,
                                    }],
                                })(
                                    <Input  type="password"/>
                                )}
                            </Form.Item>
                            <Form.Item
                                validateStatus={this.setValidateStatus("confirm")}
                                {...formItemLayout}
                                label={<span style={{fontSize:"17px",fontWeight:'bold'}}>确认密码</span>}
                            >
                                {getFieldDecorator('confirm', {
                                    rules: [ {
                                        validator: this.compareToFirstPassword,
                                    }],
                                })(
                                    <Input type="password" onBlur={this.handleConfirmBlur} placeholder="请确认密码" disabled={this.props.form.getFieldValue('password')===userMessage.password}/>
                                )}
                            </Form.Item>
                            <Form.Item
                                validateStatus={this.setValidateStatus("qq")}
                                {...formItemLayout}
                                label={<span style={{fontSize:"17px",fontWeight:'bold'}}>QQ</span>}
                            >
                                {getFieldDecorator('qq', {
                                    initialValue:userMessage.content[2],
                                    rules: [{
                                        validator: this.checkQQ
                                    }],
                                })(
                                    <Input placeholder={userMessage.content[2]}/>
                                )}
                            </Form.Item>
                            <Form.Item
                                validateStatus={this.setValidateStatus("phone")}
                                {...formItemLayout}
                                label={<span style={{fontSize:"17px",fontWeight:'bold'}}>手机号码</span>}
                            >
                                {getFieldDecorator('phone', {
                                    initialValue:userMessage.content[1],
                                    rules: [{
                                        len: 11, message: '请输入正确的11位手机号码!'
                                    }, {
                                        validator: this.checkPhoneNumber
                                    }],
                                })(
                                    <Input addonBefore={prefixSelector} style={{width: '100%'}} placeholder={userMessage.content[1]}/>
                                )}
                            </Form.Item>
                            <Form.Item
                                validateStatus={this.setValidateStatus("email")}
                                {...formItemLayout}
                                label={<span style={{fontSize:"17px",fontWeight:'bold'}}>电子邮箱</span>}
                            >
                                {getFieldDecorator('email', {
                                    initialValue:userMessage.content[0],
                                    rules: [{
                                        type: 'email', message: '输入的电子邮箱地址不符合规范!',
                                    }, {
                                        message: '请输入您的电子邮箱地址!',
                                    }, {
                                        validator: this.checkEmail
                                    }],
                                })(
                                    <Select
                                        mode="combobox"
                                        onChange={this.handleMailChange}
                                        filterOption={false}
                                        placeholder={userMessage.content[0]}
                                    >
                                        {this.state.options}
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item
                                validateStatus={this.setValidateStatus("captcha")}
                                {...formItemLayout}
                                label={<span style={{fontSize:"17px",fontWeight:'bold'}}>验证码</span>}>
                                {getFieldDecorator('captcha', {
                                    rules: [{
                                        validator: this.checkCaptcha
                                    }],
                                })(
                                    <Input className="edit-form-input-captcha" placeholder="请输入验证码" disabled={this.emailButtonDisabled() || this.state.expression==="获取邮箱验证码"}/>
                                )}
                                <Button type="primary"
                                        onClick={this.renderCode}
                                        className="edit-form-button-captcha"
                                        disabled={this.emailButtonDisabled() || getFieldError('phone') || getFieldError('email') || getFieldError('qq') || getFieldError('password')}>
                                    {this.state.expression}</Button>
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Popconfirm placement="topRight" title={<div style={{width:'150px'}}>您确定提交吗?</div>} onConfirm={() => this.handleModify()}>
                                    <Button type="primary" className="confirm-form-button" disabled={this.enableClick() || this.hasErrors(getFieldsError())}>提交</Button>
                                </Popconfirm>
                                <Popconfirm placement="topRight" title={<div style={{width:'150px'}}>您确定重新编辑吗?</div>} onConfirm={() => this.resetEdit()}>
                                    <Button type="primary" className="delete-form-button">重新编辑</Button>
                                </Popconfirm>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

const UserForm = Form.create()(user);

export default UserForm;

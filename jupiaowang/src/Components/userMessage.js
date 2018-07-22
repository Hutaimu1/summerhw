import React from 'react'
import {message,Button,Form,Input,Select,Modal,Upload,Icon,Popconfirm} from 'antd'
import $ from "jquery";

let myMessage = {userName:'hutaimu',password:"htm123280520",content:["2057572565@qq.com","13262625692","2057572565"]};
class user extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEdit: false,
            expression: '获取邮箱验证码',
            validate: '',
            userMessage: myMessage,
            previewVisible: false,
            previewImage: '',
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
                if(result.image !== ""){
                    list.push({
                        name:result.content[3],
                        status:result.content[4],
                        uid:parseInt(result.content[5],0),
                        thumbUrl:result.image
                    });
                    this.setState({
                       fileList:list
                    })
                }
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
                isEdit:!this.state.isEdit
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
                        isEdit: !this.state.isEdit
                    });
                    message.success('修改个人信息成功!');
                }
                else {
                    this.setState({
                        userMessage: result,
                        isEdit: !this.state.isEdit
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
        let content = this.state.userMessage.content;
        if(!this.haveValue(password) || !this.haveValue(email) || !this.haveValue(phone) || !this.haveValue(QQ)){
            return true;
        }
        else if((password !== this.state.userMessage.password) && (password !== confirm)){
            return true;
        }
        else if((password !== this.state.userMessage.password || phone !== content[1] || email !== content[0] || QQ !== content[2]) && !this.haveValue(captcha)){
            return true;
        }
        else if(this.haveValue(captcha) && (captcha!==this.state.validate)){
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

    repeat(str , n){
        return new Array(n+1).join(str);
    }

    hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field])
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    handleChange = ({fileList}) => {
        let userName = this.props.match.params.userName;
        this.setState({fileList});
        if (fileList.length !== 0 && fileList[0].status === 'done') {
            $.ajax({
                type: "post",
                url: "bookstoreApp/uploadImage",
                data: {userName: userName,base64Str:fileList[0].thumbUrl},
                async: true,
                success: function (data) {
                    if(JSON.parse(data)){
                        message.success('上传头像成功!');
                        this.setState({
                            fileList:fileList
                        })
                    }
                    else{
                        message.error('上传头像失败!');
                        this.setState({
                            fileList:[]
                        })
                    }
                }.bind(this)
            })
        }
        else if(fileList.length !== 0 && fileList[0].status === 'error'){
            message.error('上传头像失败!请选择其他图片');
            this.setState({
                fileList:[]
            })
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
                            imageData:'',
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

    render(){
        let userName = this.props.match.params.userName;
        const { previewVisible, previewImage, fileList,isEdit,userMessage } = this.state;
        const {getFieldDecorator,getFieldsError,getFieldError} = this.props.form;

        const uploadButton = (
            <div>
                <Icon type="plus" />
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
            <div style={{ marginLeft: "10px"}}>
                <div className="user-left">
                    <Form>
                        <Form.Item
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
                            validateStatus={this.setValidateStatus("qq")}
                            {...formItemLayout}
                            label='QQ'
                        >
                            {getFieldDecorator('qq', {
                                initialValue:userMessage.content[2],
                                rules: [{
                                    validator: this.checkQQ
                                }],
                            })(
                                isEdit?<Input placeholder={userMessage.content[2]}/>:<span>{userMessage.content[2]}</span>
                            )}
                        </Form.Item>
                        <Form.Item
                            validateStatus={this.setValidateStatus("phone")}
                            {...formItemLayout}
                            label='手机号码'
                        >
                            {getFieldDecorator('phone', {
                                initialValue:userMessage.content[1],
                                rules: [{
                                    len: 11, message: '请输入正确的11位手机号码!'
                                }, {
                                    validator: this.checkPhoneNumber
                                }],
                            })(
                                isEdit?<Input addonBefore={prefixSelector} style={{width: '100%'}} placeholder={userMessage.content[1]}/>:<span>{userMessage.content[1]}</span>
                            )}
                        </Form.Item>
                        <Form.Item
                            validateStatus={this.setValidateStatus("email")}
                            {...formItemLayout}
                            label='电子邮箱'
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
                                isEdit?<Select
                                    mode="combobox"
                                    onChange={this.handleMailChange}
                                    filterOption={false}
                                    placeholder={userMessage.content[0]}
                                >
                                    {this.state.options}
                                </Select>:<span>{userMessage.content[0]}</span>
                            )}
                        </Form.Item>
                        {isEdit?<Form.Item
                            validateStatus={this.setValidateStatus("captcha")}
                            {...formItemLayout}
                            label="验证码">
                            {getFieldDecorator('captcha', {
                                rules: [ {required:this.state.expression === '发送成功,点击重新发送',
                                message:'验证码不能为空'},{
                                    validator: this.checkCaptacha
                                }],
                            })(
                                <Input className="registration-form-input-captcha" placeholder="请输入验证码" disabled={this.emailButtonDisabled() || this.state.expression==="获取邮箱验证码"}/>
                            )}
                            <Button type="primary"
                                    onClick={this.renderCode}
                                    className="registration-form-button-captcha"
                                    disabled={this.emailButtonDisabled() || getFieldError('phone') || getFieldError('email') || getFieldError('qq') || getFieldError('password')}>
                                {this.state.expression}</Button>
                        </Form.Item>:null}
                        {(isEdit)?
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" className="confirm-form-button"
                                        onClick={() => this.handleModify()} disabled={this.enableClick() || this.hasErrors(getFieldsError())}>确定</Button>
                                <Popconfirm placement="topRight" title="您确定取消编辑吗?" onConfirm={()=>this.setState({isEdit:!this.state.isEdit})}>
                                    <Button type="primary" className="delete-form-button">取消编辑</Button>
                                </Popconfirm>
                            </Form.Item>
                             :<Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" className="edit-form-button"
                                        onClick={() => this.handleEdit()}>编辑</Button>
                            </Form.Item>}
                    </Form>
                </div>
                <div className="user-right">
                    <Upload
                        action="//jsonplaceholder.typicode.com/posts/"
                        listType="picture-card"
                        fileList={fileList}
                        accept='image/*'
                        onPreview={this.handlePreview}
                        onChange={(fileList) =>this.handleChange(fileList)}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </div>
            </div>
        )
    }
}

const UserForm = Form.create()(user);

export default UserForm;

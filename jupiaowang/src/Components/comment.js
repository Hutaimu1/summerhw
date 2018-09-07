import React from 'react'
import {message,Menu,List,Avatar,Input,Button,Tooltip,Popconfirm,Form} from 'antd'
import $ from "jquery";
import moment from "moment/moment";

const data = [
    {commentId:0,userName:"hutaimu",date:"2018-09-05 10:10:10",content:"侯哲宇真帅",url:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"},
    {commentId:1,userName:"htm123",date:"2018-09-05 10:10:10",content:"侯哲宇真帅",url:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
];

class comment extends React.Component{
    constructor() {
        super();
        this.state = {
            current: "全部评论",
            data: [],
            data_copy:[],
            isMyComment:false,
            isEdit:false,
            addComment:false
        }
    }

    componentDidMount() {
        let ticketId = this.props.ticketId;
        let type = this.props.type;
        $.ajax({
            type: "post",
            url: "/bookstoreApp/getComment",
            data:{ticketId:ticketId,type:type},
            async: true,
            success: function (data) {
                this.setState({
                    data: JSON.parse(data),
                    data_copy:JSON.parse(data)
                });
            }.bind(this)
        });

    }

    handleClick = (e) => {
        this.setState({
            current:e.key
        });
        if( e.key === '全部评论'){
            this.showAllComment();
        }
        else if(e.key === '我的评论'){
            this.showMyComment();
        }
    };

    showAllComment = () =>{
        this.setState({
            isMyComment:false,
            isEdit:false,
            addComment:false,
            data_copy:this.state.data
        })
    };

    showMyComment = () =>{
        let userName = this.props.userName;
        let tempData = [];
        this.state.data.forEach((comment) =>{
            if(comment.userName === userName){
                tempData.push(comment)
            }
        });
        this.setState({
            isMyComment:true,
            data_copy:tempData
        })
    };

    editComment = () =>{
        this.setState({
            isEdit:true
        })
    };

    confirmComment = () =>{
        let userName = this.props.userName;
        let content = this.props.form.getFieldValue('content');
        let ticketId = this.props.ticketId;
        let type = this.props.type;
        if(this.state.data_copy[0].content === content){
            message.warning("您并未修改评论!")
        }
        else{
            let dataTemp = this.state.data;
            let dataCopyTemp = this.state.data_copy;
            let time = moment().format('YYYY-MM-DD HH:mm:ss');
            dataCopyTemp[0].content = content;
            dataCopyTemp[0].date = time;
            dataTemp.forEach((data) =>{
                if(data.userName === userName){
                    data.content = content;
                    data.date = time
                }
            });
            $.ajax({
                type: "post",
                url: "/bookstoreApp/modifyComment",
                data:{userName:userName,content:content,date: time,ticketId:ticketId,type:type},
                async: true,
                traditional: true,
                success: function (data) {
                    if(JSON.parse(data)){
                        this.setState({
                            data:dataTemp,
                            data_copy:dataCopyTemp
                        });
                        message.success("修改评论成功!");
                    }
                    else{
                        message.error("修改评论失败!");
                    }
                }.bind(this)
            });
        }
        this.setState({
            isEdit:false
        })
    };

    deleteComment = () => {
        let userName = this.props.userName;
        let ticketId = this.props.ticketId;
        let type = this.props.type;
        let dataTemp = this.state.data;
        dataTemp.forEach((data,index) =>{
            if(data.userName === userName){
                dataTemp.splice(index,1);
            }
        });
        $.ajax({
            type: "post",
            url: "/bookstoreApp/deleteComment",
            data:{userName:userName,ticketId:ticketId,type:type},
            async: true,
            success: function (data) {
                if(JSON.parse(data)){
                    this.setState({
                        data:dataTemp,
                        data_copy:[]
                    });
                    message.success("删除评论成功!");
                }
                else{
                    message.error("删除评论失败!");
                }
            }.bind(this)
        });
    };

    addComment = () =>{
        this.setState({
            addComment:true
        })
    };

    submitComment = () =>{
        let userName = this.props.userName;
        let content = this.props.form.getFieldValue('addComment');
        let time = moment().format('YYYY-MM-DD HH:mm:ss');
        let ticketId = this.props.ticketId;
        let type = this.props.type;
        $.ajax({
            type: "post",
            url: "/bookstoreApp/submitComment",
            data:{userName:userName,content:content,date: time,ticketId:ticketId,type:type},
            async: true,
            success: function (data) {
                if(JSON.parse(data) === false){
                    message.error("添加评论失败!");
                }
                else{
                    let myComment = [];
                    myComment.push({
                        "commentId":parseInt(JSON.parse(data)[0],10),
                        "userName":userName,
                        "content":content,
                        "date":time,
                        "url":JSON.parse(data)[1]
                    });
                    let allComment = this.state.data;
                    allComment.push(myComment[0]);
                    this.setState({
                        data_copy:myComment,
                        data:allComment,
                        addComment:false
                    });
                    message.success("添加评论成功!");
                }
            }.bind(this)
        });
    };

    render(){
        const {isMyComment,isEdit,data_copy,addComment} = this.state;

        const {getFieldDecorator} = this.props.form;

        const editButton = (
            [<Tooltip placement="topLeft" title={<div style={{width:"56px"}}>编辑评论</div>} arrowPointAtCenter>
                <Button type="default" shape="circle" icon="edit" onClick={()=> this.editComment()}/>
            </Tooltip>,
                <Popconfirm title={<div style={{width:"150px"}}>您确定要将该评论删除吗？</div>} onConfirm={() => this.deleteComment()}>
                    <Button type="default" shape="circle" icon="delete" disabled={isEdit}/>
                </Popconfirm>,]
        );

        const confirmButton = (
            [<Tooltip placement="topLeft" title={<div style={{width:"28px"}}>确定</div>} arrowPointAtCenter>
                <Button type="default" shape="circle" icon="upload" onClick={()=> this.confirmComment()} disabled={ this.props.form.getFieldValue('content')=== ""}/>
            </Tooltip>,
                <Popconfirm title={<div style={{width:"150px"}}>您确定要将该评论删除吗？</div>} onConfirm={() => this.deleteComment()}>
                    <Button type="default" shape="circle" icon="delete" disabled={isEdit}/>
                </Popconfirm>]
        );

        return(
            <div style={{float:"left",width:"90%"}}>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="全部评论">
                        <a style={{color:'black'}}>全部评论</a>
                    </Menu.Item>
                    <Menu.Item key="我的评论">
                        <a style={{color:'black'}}>我的评论</a>
                    </Menu.Item>
                </Menu>
                <div className="demo-infinite-container">
                    {(isMyComment&& data_copy.length === 0)?
                        <Form>
                            {addComment?
                                <div>
                                    <Form.Item>
                                        {getFieldDecorator("addComment", {
                                            rules: [{required: true, message:'评论不能为空!'}],
                                            initialValue:"",
                                        })(
                                            <Input/>
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Popconfirm title={<div style={{width:"150px"}}>您确定发表该评论吗？</div>} onConfirm={() => this.submitComment()}>
                                            <Button type="primary" icon="upload" disabled={ this.props.form.getFieldValue('addComment')=== ""}>发表评论</Button>
                                        </Popconfirm>
                                    </Form.Item>
                                </div>
                                :<Form.Item>
                                    <Button type="primary" onClick={()=>this.addComment()}>添加评论</Button>
                                </Form.Item>}
                        </Form>
                        :<List
                            dataSource={data_copy}
                            renderItem={item => (
                                <List.Item key={item.commentId} actions={ isMyComment?(isEdit?confirmButton:editButton):null}>
                                    <List.Item.Meta
                                        avatar={<Avatar src= {item.url}/>}
                                        title={item.userName + "    " + item.date}
                                        description={(isEdit&&isMyComment)?
                                            <Form.Item>
                                                {getFieldDecorator("content", {
                                                    rules: [{required: true, message:'评论不能为空!'}],
                                                    initialValue:item.content,
                                                })(
                                                    <Input  placeholder={item.content}/>
                                                )}
                                            </Form.Item>
                                            :item.content}
                                    />
                                </List.Item>
                            )}
                        >
                        </List>}
                </div>
            </div>
        )
    }
}

const CommentForm = Form.create()(comment);

export default CommentForm;
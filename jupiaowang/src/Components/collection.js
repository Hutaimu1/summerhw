import React from 'react'
import {message,Icon,Popconfirm,Card,Rate,Tooltip,Pagination} from 'antd'
import $ from "jquery";

const data = [{
    id:0,
    src:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2519070834.webp",
    place:"上海",
    title:"我不是药神",
    rate:4.5,
},{
    id:1,
    src:"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2525528688.webp",
    place:"上海",
    title:"动物世界",
    rate:3.5,
},{
    id:2,
    src:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2522820714.webp",
    place:"上海",
    title:"新大头儿子和小头爸爸3：俄罗斯奇遇记",
    rate:5,
},{
    id:3,
    src:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2522069454.webp",
    place:"上海",
    title:"侏罗纪世界2",
    rate:3.5,
}];

class collection extends React.Component{
    constructor(){
        super();
        this.state = {
            data:data,
            current:1,
            pageSize:6,
        };
    }

    componentDidMount() {
        let userName = this.props.match.params.userName;
        $.ajax({
            type: "post",
            url: "bookstoreApp/getCollection",
            data: {userName: userName},
            async: true,
            success: function (data) {
                this.setState({
                    data:JSON.parse(data)
                });
            }.bind(this)
        });
    }

    deleteFromCollection = (id) =>{
        let userName = this.props.match.params.userName;
        let data1 = this.state.data;
        let result = [];
        data1.forEach((collection,index) =>{
            if(collection.id !== id){
                result.push(collection);
            }
        });
        $.ajax({
            type: "post",
            url: "bookstoreApp/deleteFromCollection",
            data: {userName: userName,ticketId:id},
            async: true,
            success: function (data) {
                if(JSON.parse(data)){
                    this.setState({
                        data:result
                    });
                    message.success("票品从收藏中删除成功!");
                }
                else {
                    message.error("票品从收藏中删除失败!")
                }
            }.bind(this)
        });
    };

    onShowSizeChange = (current, pageSize) =>{
        this.setState({
            pageSize:pageSize
        });
    };

    onPageChange = (page) =>{
        this.setState({
            current:page
        })
    };

    shareToQQ = (id) =>{};

    getCollection = () =>{
        let result=[];
        this.state.data.forEach((card, index) => {
            if (index >= (this.state.current - 1) * this.state.pageSize && index < this.state.current * this.state.pageSize) {
                result.push(<Card
                    key={card.id}
                    hoverable
                    className="movie-card"
                    cover={<img style={{height:"300px"}} alt={card.title} src={card.src} />}
                    actions={[
                        <Icon type="eye" onClick={() => this.props.history.push('/home/' + this.props.match.params.userName + "/viewMovie/" + card.id)} />,
                        <Popconfirm title={<div style={{width:"150px"}}>您确定要将该票品从收藏中删除吗？</div>} onConfirm={() => this.deleteFromCollection(card.id)}>
                            <Icon type="delete"/>
                        </Popconfirm>,
                        <Tooltip placement="topLeft" title={<div style={{width:"70px"}}>分享到QQ</div>} arrowPointAtCenter>
                            <Icon type="qq" onClick={()=> this.shareToQQ(card.id)}/>
                        </Tooltip>
                    ]}
                >
                    <Card.Meta
                        title={<span style={{fontWeight: "bold"}}>{card.title}</span>}
                        description={<span><Rate allowHalf defaultValue={card.rate} disabled/><span style={{color: "#ff5741"}}>评分:{card.rate * 2}</span></span>}
                    />
                </Card>)

            }
        });
        return result;
    };

    render(){
        let userName = this.props.match.params.userName;
        return(
            <div>
                <h1>{userName}的收藏</h1>
                <div style={{overflow: "hidden"}}>
                    {this.getCollection()}
                </div>
                <div>
                    <Pagination showQuickJumper showSizeChanger pageSizeOptions={['6','12','18']} onShowSizeChange={this.onShowSizeChange} current={this.state.current} defaultPageSize={this.state.pageSize} total={this.state.data.length} onChange={this.onPageChange} style={{float:"right",marginRight:"50px"}} />
                </div>
            </div>
        );
    }
}

export default collection;
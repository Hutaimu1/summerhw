import React from 'react';
import {Card, Icon, Rate, Divider, Pagination} from 'antd';
import $ from "jquery";

class movieTicket extends React.Component {
    state = {
        current:1,
        pageSize:6,
        data:[],
        place:"上海"
    };

    componentDidMount(){
        let result =[];
        $.ajax({
            type: "post",
            url: "bookstoreApp/getMovieTicket",
            data: {place: this.state.place},
            async: true,
            success: function (data) {
                result = JSON.parse(data);
                this.setState({
                    data:result,
                });
            }.bind(this)
        });
    }

    onPageChange = (page) =>{
        this.setState({
            current:page
        })
    };

    onShowSizeChange = (current, pageSize) =>{
        this.setState({
            pageSize:pageSize
        });
    };

    getMovie = () =>{
        let result=[];
        this.state.data.forEach((card, index) => {
            if (index >= (this.state.current - 1) * this.state.pageSize && index < this.state.current * this.state.pageSize) {
                result.push(<Card
                    key={card.id}
                    hoverable
                    className="movieCard"
                    cover={<img style={{height:"300px"}} alt={card.title} src={card.src} />}
                    actions={[<Icon type="star-o" />, <Icon type="shopping-cart" />, <Icon type="rocket" />]}
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

    render() {
        return (
            <div style={{fontWeight: "bold", overflow: "hidden"}}>
                <h1 className="movieHead">电影票 - 上海</h1>
                <a>[切换城市]</a>
                <Divider orientation="left" style={{fontWeight: "bold",fontSize:"20px"}}>正在上映</Divider>
                <div style={{overflow: "hidden"}}>
                {this.getMovie()}
                </div>
                <div>
                <Pagination showQuickJumper showSizeChanger pageSizeOptions={['6','12','18']} onShowSizeChange={this.onShowSizeChange} current={this.state.current} defaultPageSize={this.state.pageSize} total={this.state.data.length} onChange={this.onPageChange} style={{float:"right",marginRight:"50px"}} />
                </div>
            </div>
        );
    }
}

export default movieTicket;
import React from 'react';
import {Card, Icon, Rate, Divider, Pagination} from 'antd';
let data = [{
    key:0,
    src:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2519070834.webp",
    title:"我不是药神",
    rate:4.5
},{
    key:1,
    src:"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2525528688.webp",
    title:"动物世界",
    rate:3.5
},{
    key:2,
    src:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2522820714.webp",
    title:"新大头儿子和小头爸爸3：俄罗斯奇遇记",
    rate:5
},{
    key:3,
    src:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2522069454.webp",
    title:"侏罗纪世界2",
    rate:3.5
},{
    key:4,
    src:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2522880251.webp",
    title:"超人总动员2",
    rate:4
},{
    key:5,
    src:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2524134770.webp",
    title:"金蝉脱壳2:冥府",
    rate:1.5
},{
    key:6,
    src:"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2526892057.webp",
    title:"您一定不要错过",
    rate:2.5
},{
    key:7,
    src:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2525770523.webp",
    title:"阿飞正传",
    rate:4
},{
    key:8,
    src:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2525716036.webp",
    title:"生存家族",
    rate:4
},{
    key:9,
    src:"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2523437699.webp",
    title:"猛虫过江",
    rate:2
}];

class movieTicket extends React.Component {
    state = {
        current:1,
        pageSize:6,
        data:data
    };

    onPageChange = (page, pageSize) =>{
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
                    key={card.key}
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
import React from 'react';
import GoodsTable from '../components/GoodsTable'
import {Row,Col,Button,InputNumber,Icon } from 'antd'
/*let dataSource = [{
    id: 1,
    ticketName: '无问西东',
    type:'电影',
    price: 32,
    src:'../static/images/yourName.png',
    amount: 1,
    cked:true
}, {
    id: 2,
    ticketName: '你的名字',
    type: '电影',
    price:20,
    image:'../static/images/yourName.png',
    amount:2,
    cked:true
},{
    id:3,
    ticketName:'林俊杰',
    type:'演唱会',
    price:150,
    image:'../static/images/yourName.png',
    amount:1,
    cked:false
}];

const columns = [{
    title: '票名',
    dataIndex: 'ticketName',
    key: 'ticketName',
}, {
    title: '图片',
    dataIndex: 'image',
    key: 'image',
}, {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
},{
    title:'数量',
    dataIndex:'amount',
    key:'amount',
}];

class shopCart extends React.Component {
    constructor() {
        super();
        let count = 0;
        let price = 0;

        dataSource.forEach(tickets => {
            if (tickets.cked) {
                count++;
                price += tickets.price * tickets.amount;
            }
        });
        this.state = {
            dataSource: dataSource,
            selectedCount: count,
            totalPrice: price,
            isSelectedAll: false
        };
        this.changeSelectAllFlag = this.changeSelectAllFlag.bind(this);
        this.changeTicketsCheckedFlag = this.changeTicketsCheckedFlag.bind(this);
        this.removeAll = this.removeAll.bind(this);
        this.removeChecked = this.removeChecked.bind(this);
        this.deleteTickets = this.deleteTickets.bind(this);
        this.setTicketCount = this.setTicketCount.bind(this);
    }

    updateCount(dataSource) {
        let count = 0;
        dataSource.forEach(tickets => {
            if (tickets.cked) {
                count++;
            }
        });
        return count;
    }

    updatePrice(dataSource) {
        let price = 0;
        dataSource.forEach(tickets => {
            if (tickets.cked) {
                price += tickets.price * tickets.amount;
            }
        });
        return price;
    }

    updateSelectAllFlag(dataSource) {
        for (let i = 0; i < dataSource.length; ++i) {
            if (!dataSource[i].cked) {
                return false;
            }
        }
        return true;
    }

    removeAll() {
        this.setState({
            dataSource: [],
            selectedCount: 0,
            totalPrice: 0,
            isSelectedAll: false
        })
    }

    removeChecked() {
        this.setState((preState) => ({
            dataSource: preState.dataSource.filter(tickets => {
                return !tickets.cked
            }),
            selectedCount: 0,
            totalPrice: 0,
            isSelectedAll: false
        }));
    }

    deleteTickets(id) {
        this.setState((preState) => {
            for (let i = 0; i < preState.dataSource.length; ++i) {
                if (id.toString() === preState.dataSource[i].id.toString()) {
                    preState.dataSource.splice(i, 1);
                    break;
                }
            }
            return {
                dataSource: preState.dataSource,
                selectedCount: this.updateCount(preState.dataSource),
                totalPrice: this.updatePrice(preState.dataSource),
                isSelectedAll: this.updateSelectAllFlag(preState.dataSource)
            }
        })
    }

    setTicketCount(id, count) {
        this.setState((preState) => {
            for (let i = 0; i < preState.dataSource.length; ++i) {
                if (id.toString() === preState.dataSource[i].id.toString()) {
                    preState.dataSource.count = count;
                }
            }
            return {
                dataSource: preState.dataSource,
                selectedCount: this.updateCount(preState.dataSource),
                totalPrice: this.updatePrice(preState.dataSource),
                isSelectedAll: this.updateSelectAllFlag(preState.dataSource)
            }
        })
    }

    changeTicketsCheckedFlag(id) {
        this.setState((preState) => {
            preState.dataSource.forEach(tickets => {
                if (id.toString() === tickets.id.toString()) {
                    tickets.cked = !tickets.cked;
                }
            });
            return {
                dataSource: preState.dataSource,
                selectedCount: this.updateCount(preState.dataSource),
                totalPrice: this.updatePrice(preState.dataSource),
                isSelectedAll: this.updateSelectAllFlag(preState.dataSource),
            }
        })
    }

    changeSelectAllFlag(event) {
        if (event.currentTarget.cked) {
            this.setState((preState) => {
                let price = 0;
                let count = 0;
                preState.dataSource.forEach(tickets => {
                    tickets.cked = true;
                });
                preState.dataSource.forEach(tickets => {
                    if (tickets.cked) {
                        ++count;
                        price += tickets.price * tickets.amount;
                    }
                });
                return {
                    dataSource: preState.dataSource,
                    selectedCount: count,
                    totalPrice: price,
                    isSelectAll: true
                }
            });
        }
        else {
            this.setState((preState) => {
                preState.dataSource.forEach(tickets => {
                    tickets.cked = false;
                });
                return {
                    dataSource: preState.dataSource,
                    selectedCount: 0,
                    totalPrice: 0,
                    isSelectAll: false
                }
            });
        }
    }

    render() {
        return (
                <div className="form-horizontal">
                    <div className="form-group">
                    </div>
                    <div className="form-group">
                        <div style={{display: "table", width: "100%"}}>
                            <div style={{display: "table-row", width: "100%"}}>
                                <div style={{display: "table-cell", fontSize: "30px", textAlign: "left", width: "10%"}}>
                                    购物车
                                </div>
                                <div style={{display: "table-cell", textAlign: "right", width: "70%"}}>
                                    选中：{this.state.selectedCount} 个 总价：{this.state.totalPrice} 元
                                </div>
                                <div style={{display: "table-cell", textAlign: "right", width: "20%"}}>
                                    <button className="btn btn-danger btn-sm" style={{margin: "auto 10px"}}
                                            onClick={this.removeAll}><i className="fa fa-trash"> 清空购物车</i></button>
                                    <button className="btn btn-warning btn-sm" onClick={this.removeChecked}><i
                                        className="fa fa-times"> 删除选中</i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <TicketsTable setTicketsCount={this.setTicketCount} changeTicketsCheckFlag={this.changeTicketsCheckedFlag}
                                    deleteTickets={this.deleteTickets} TicketsList={this.state.dataSource}
                                    thead={
                                        <tr>
                                            <td>
                                                <span>全选</span>
                                                <input type="checkbox" checked={this.state.isSelectAll}
                                                       onChange={this.changeSelectAllFlag}/>
                                            </td>
                                            <td>商品图片</td>
                                            <td>商品名称</td>
                                            <td>单价</td>
                                            <td>数量</td>
                                            <td>总价</td>
                                            <td>操作</td>
                                        </tr>
                                    }/>
                        </div>
            </div>
        );
    }
}

export default shopCart
*/

let goodsArray = [
    {id : 1 , src : "../static/images/yourName.jpg" , name : "商品1" , price : 45 , count : 9 , checked : false} ,
    {id : 2 , src : "../static/images/yourName.jpg" , name : "商品2" , price : 46, count : 1 , checked : false} ,
    {id : 3 , src : "../static/images/yourName.jpg" , name : "商品3" , price : 35, count : 8 , checked : true} ,
    {id : 4 , src : "../static/images/yourName.jpg" , name : "商品4" , price : 86 , count : 1 , checked : false} ,
    {id : 5 , src : "../static/images/yourName.jpg" , name : "商品5" , price : 4 , count : 3 , checked : false} ,
    {id : 6 , src : "../static/images/yourName.jpg" , name : "商品6" , price : 53 , count : 6 , checked : false} ,
    {id : 7 , src : "../static/images/yourName.jpg" , name : "商品7" , price : 66 , count : 1 , checked : false} ,
    {id : 8 , src : "../static/images/yourName.jpg" , name : "商品8" , price : 15 , count : 5 , checked : false} ,
    {id : 9 , src : "../static/images/yourName.jpg" , name : "商品9" , price : 6 , count : 8 , checked : false} ,
];

export default class shopCart extends React.Component {
    constructor() {
        super();
        let count = 0;
        let price = 0;
        goodsArray.forEach(goods =>{
            if(goods.checked)
            {
                ++count;
                price += goods.price * goods.count;
            }
        });
        this.state = {
            goodsArray : goodsArray ,
            selectedCount : count ,
            totalPrice : price ,
            isSelectAll : false
        };
        this.changeGoodsCheckFlag = this.changeGoodsCheckFlag.bind(this);
        this.changeSelectAllFlag = this.changeSelectAllFlag.bind(this);
        this.deleteGoods = this.deleteGoods.bind(this);
        this.removeAll = this.removeAll.bind(this);
        this.removeChecked = this.removeChecked.bind(this);
        this.setGoodsCount = this.setGoodsCount.bind(this);
    }

    updateCount(goodsArray) {
        let count = 0;
        goodsArray.forEach(goods =>{
            if(goods.checked) {
                ++count;
            }
        });
        return count;
    }

    updatePrice(goodsArray) {
        let price = 0;
        goodsArray.forEach(goods =>{
            if(goods.checked) {
                price += goods.price * goods.count;
            }
        });
        return price;
    }

    updateSelectAllFlag(goodsArray) {
        for(let i = 0 ; i < goodsArray.length ; ++i) {
            if(!goodsArray[i].checked) {
                return false;
            }
        }
        return true;
    }

    removeAll() {
        this.setState({
            goodsArray : [] ,
            selectedCount : 0 ,
            totalPrice : 0 ,
            isSelectAll : false
        })
    }

    removeChecked() {
        this.setState((preState) =>({
            goodsArray : preState.goodsArray.filter(goods => {return !goods.checked;}) ,
            selectedCount : 0 ,
            totalPrice : 0 ,
            isSelectAll : false
        }));
    }

    deleteGoods(id) {
        this.setState((preState) =>{
            for(let i = 0 ; i < preState.goodsArray.length ; ++i) {
                if(id.toString() === preState.goodsArray[i].id.toString()) {
                    preState.goodsArray.splice(i , 1);
                    break;
                }
            }
            return {
                goodsArray : preState.goodsArray ,
                selectedCount : this.updateCount(preState.goodsArray) ,
                totalPrice : this.updatePrice(preState.goodsArray) ,
                isSelectAll : this.updateSelectAllFlag(preState.goodsArray)
            }
        })
    }

    setGoodsCount(id , count) {
        this.setState((preState) =>{
            let i;
            for(i = 0 ; i < preState.goodsArray.length ; ++i) {
                if(id.toString() === preState.goodsArray[i].id.toString()) {
                    preState.goodsArray[i].count = count;
                    console.log("set success");
                }
            }
            if(count === 0){
                preState.goodsArray.splice(i-1,1);
                console.log("delete success");
            }
            return {
                goodsArray : preState.goodsArray ,
                selectedCount : this.updateCount(preState.goodsArray) ,
                totalPrice : this.updatePrice(preState.goodsArray) ,
                isSelectAll : this.updateSelectAllFlag(preState.goodsArray)
            }
        })
    }

    changeGoodsCheckFlag(id) {
        this.setState((preState) =>{
            preState.goodsArray.forEach(goods =>{
                if(id.toString() === goods.id.toString()) {
                    goods.checked = !goods.checked;
                }
            });
            return {
                goodsArray : preState.goodsArray ,
                selectedCount : this.updateCount(preState.goodsArray) ,
                totalPrice : this.updatePrice(preState.goodsArray) ,
                isSelectAll : this.updateSelectAllFlag(preState.goodsArray)
            }
        });
    }

    changeSelectAllFlag(event) {
        if(event.currentTarget.checked) {
            this.setState((preState) =>{
                let price = 0;
                let count = 0;
                preState.goodsArray.forEach(goods =>{
                    goods.checked = true;

                });
                preState.goodsArray.forEach(goods =>{
                    if(goods.checked) {
                        ++count;
                        price += goods.price * goods.count;
                    }
                });
                return {
                    goodsArray : preState.goodsArray ,
                    selectedCount : count ,
                    totalPrice : price ,
                    isSelectAll : true
                }
            });
        }
        else {
            this.setState((preState) =>{
                preState.goodsArray.forEach(goods =>{
                    goods.checked = false;
                });
                return {
                    goodsArray : preState.goodsArray ,
                    selectedCount : 0 ,
                    totalPrice : 0 ,
                    isSelectAll : false
                }
            });
        }
    }

    render() {
        return (
                <div className = "form-horizontal">
                    {/*<div className = "form-group">
                        <div style = {{display : "table" , width : "100%"}}>
                            <div style = {{display : "table-row" , width : "100%"}}>

                                <Button type="primary" icon="shopping-cart">我的购物车</Button>
                                <div style = {{display : "table-cell" , textAlign : "right" , width : "70%"}}>
                                    选中：{this.state.selectedCount} 个 总价：{this.state.totalPrice} 元
                                </div>
                                <div style = {{display : "table-cell" , textAlign : "right" , width : "20%"}}>
                                    <button className = "btn btn-danger btn-sm" style = {{margin : "auto 10px"}} onClick = {this.removeAll}><i className = "fa fa-trash"> 清空购物车</i></button>
                                    <button className = "btn btn-warning btn-sm" onClick = {this.removeChecked}><i className = "fa fa-times"> 删除选中</i></button>
                                    <button className= "btn btn-warning btn-sm"><i className="fa fa-times">去结算</i></button>
                                </div>
                            </div>
                        </div>
                    </div>*/}
                    <div className="form-group">
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <Button type="primary" icon="shopping-cart">我的购物车</Button>
                            </Col>
                            <Col className="gutter-row" span={4}>
                                <Button type="default">已选中：{this.state.selectedCount} 种票品</Button>
                            </Col>
                            <Col className="gutter-row" span={4}>
                                <Button type="default">总价钱：{this.state.totalPrice}</Button>
                            </Col>
                            <Col className="gutter-row" span={4}>
                                <Button type="danger"  onClick={this.removeAll}>清空购物车</Button>
                            </Col>
                            <Col className="gutter-row" span={4}>
                                <Button type="primary"  onClick={this.removeChecked}>删除选中</Button>
                            </Col>
                            <Col className="gutter-row" span={4}>
                                <Button type="danger" >去结算</Button>
                            </Col>
                        </Row>
                    </div>
                    <br/>
                    <div className = "form-group">
                        <GoodsTable setGoodsCount = {this.setGoodsCount} changeGoodsCheckFlag = {this.changeGoodsCheckFlag} deleteGoods = {this.deleteGoods} goodsList = {this.state.goodsArray}
                                    thead = {
                                        <tr>
                                            <td>
                                                <span>全选</span>
                                                <input type = "checkbox" checked = {this.state.isSelectAll} onChange = {this.changeSelectAllFlag} />
                                            </td>
                                            <td>商品图片</td>
                                            <td>商品名称</td>
                                            <td>单价</td>
                                            <td>数量</td>
                                            <td>总价</td>
                                            <td>操作</td>
                                        </tr>
                                    }
                        />
                    </div>
                </div>
        );
    }
}
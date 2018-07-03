import React from 'react';
import TicketsTable from '../components/TicketsTable'

let dataSource = [{
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

export default shopCart;
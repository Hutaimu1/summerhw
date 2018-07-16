import React from 'react'
import {Table,Button,message,Popconfirm,Menu,DatePicker,Form,InputNumber,Icon,Tooltip} from 'antd'
import $ from "jquery";
import moment from "moment/moment";
let historyOrder =[
];

let detailOrder = [
];


class History extends React.Component{
    constructor() {
        super();
        this.state = {
            historyOrder: historyOrder,
            showDetail:false,
            detailOrder:detailOrder,
            differentTypeOrder:historyOrder,
            current: '全部',
            differentTypeOrder_copy:historyOrder
        };
        this.handleDateAndNumber = this.handleDateAndNumber.bind(this);
    }

    componentDidMount(){
        let userName = this.props.match.params.userName;
        let result =[];
        $.ajax({
            type: "post",
            url: "bookstoreApp/getHistoryOrderList",
            data: {userName: userName},
            async: true,
            success: function (data) {
                result = JSON.parse(data);
                this.setState({
                    historyOrder:result,
                    showDetail:false,
                    current:'全部',
                    differentTypeOrder:result,
                    differentTypeOrder_copy:result
                });
            }.bind(this),
        });
    }

    showDetailOrder = (orderId) =>{
        this.setState({
            showDetail:true
        });
        $.ajax({
            type: "post",
            url: "bookstoreApp/showOrderDetail",
            data: {orderId: orderId},
            async: true,
            success: function (data) {
                this.setState({
                    detailOrder:JSON.parse(data)
                });
            }.bind(this),
        });
    };

    handleClick = (e) => {
        this.setState({
            current:e.key
        });
        if( e.key === '全部'){
            this.showAll();
        }
        if(e.key === '已完成'){
            this.showPaid();
        }
        else if( e.key === '未完成') {
            this.showNotFinished();
        }
    };

    returnToHistoryOrder(){
        this.setState({
            showDetail:false
        });
    }

    deleteHistoryOrder = (id) => {
        this.setState((preState) =>{
            preState.historyOrder.forEach((order,index) =>{
                if(order.orderId === id){
                    preState.historyOrder.splice(index,1);
                }
            });
            $.ajax({
                type: "post",
                url: "bookstoreApp/deleteHistoryOrder",
                data: {orderId: id},
                async: true,
                success: function (data) {
                    if(JSON.parse(data)){
                        message.success("已删除记录!")
                    }
                }
            });
            return {
                historyOrder:preState.historyOrder
            }
        })
    };

    orderState =(id) =>{
        let orderStates;
        this.state.historyOrder.forEach((order) => {
            if(order.orderId === id){
                if(order.paid === 1){
                    orderStates = '订单已取消';
                }
                else if(order.paid === 2){
                    orderStates = '超过付款时间';
                }
                else{
                    orderStates = '订单已完成';
                }
            }
        });
        return orderStates;
    };

    showAll(){
        let paidOrder = [];
        this.setState((preState) =>{
            preState.differentTypeOrder.forEach((order) =>{
                if(order.paid !== 0){
                    paidOrder.push(order);
                }
            });
            return {
                differentTypeOrder_copy:paidOrder
            };
        });
    }

    showPaid(){
        let paidOrder = [];
        this.setState((preState) =>{
            preState.differentTypeOrder.forEach((order) =>{
                if(order.paid === 3){
                    paidOrder.push(order);
                }
            });
            return {
                differentTypeOrder_copy:paidOrder
            }
        })
    }


    showNotFinished(){
        let paidOrder = [];
        this.setState((preState) =>{
            preState.differentTypeOrder.forEach((order) =>{
                if(order.paid !== 3){
                    paidOrder.push(order);
                }
            });
            return {
                differentTypeOrder_copy:paidOrder
            }
        })
    }

    hasValue = (value) => {
        return (value !== undefined && value !== '' && value !== null)
    };

    handleDateAndNumber =(differentTypeOrder) =>{
        let date1 = this.props.form.getFieldValue('date1');
        console.log(date1);
        let date2 = this.props.form.getFieldValue('date2');
        let startPrice = this.props.form.getFieldValue('startPrice');
        let endPrice = this.props.form.getFieldValue('endPrice');
        let result = [];
        if(!this.hasValue(date1) && !this.hasValue(startPrice)){
            differentTypeOrder.forEach((order)=>{
                result.push(order);
            })
        }
        else if(this.hasValue(date1) && !this.hasValue(startPrice)){
            differentTypeOrder.forEach((order)=>{
                let date = moment(order.date,'YYYY-MM-DD');
                if((date >= moment(moment(date1.format('YYYY-MM-DD'),'YYYY-MM-DD'))) && (date <= moment(moment(date2.format('YYYY-MM-DD'),'YYYY-MM-DD')))){
                    result.push(order);
                }
            })
        }
        else if(!this.hasValue(date1) && this.hasValue(startPrice)){
            differentTypeOrder.forEach((order)=>{
                let price = order.totalPrice;
                if((price >= startPrice) && (price <= endPrice)){
                    result.push(order);
                }
            })
        }
        else{
            differentTypeOrder.forEach((order)=>{
                let date = moment(order.date,'YYYY-MM-DD');
                let price = order.totalPrice;
                if((price >= startPrice) && (price <= endPrice) && (date >= moment(moment(date1.format('YYYY-MM-DD'),'YYYY-MM-DD'))) && (date <= moment(moment(date2.format('YYYY-MM-DD'),'YYYY-MM-DD')))){
                    result.push(order);
                }
            })
        }
        this.setState({
            differentTypeOrder:result,
            differentTypeOrder_copy:result
        })
    };

    allOrder = () =>{
        let all = this.state.historyOrder;
        this.setState({
            differentTypeOrder:all,
            differentTypeOrder_copy:all
        })
    };

    disabledDate =(current) =>{
        if(this.props.form.getFieldValue('date1') === undefined){
            return current < moment('2999-12-31');
        }
        return current < this.props.form.getFieldValue('date1');
    };

    showColor = (paid) =>{
        let color ='black';
        if(paid === 1){
            color = 'grey';
        }
        else if(paid === 2){
            color = 'red';
        }
        else{
            color = 'green'
        }
        return color;
    };

    render(){
        const columns = [
            {
                title: '订单号',
                dataIndex: 'orderId',
                key:'orderId'
            }, {
                title: '价格',
                dataIndex:'totalPrice',
                key:'price',
                sorter: (a, b) => a.totalPrice - b.totalPrice,
            },{
                title:"时间",
                dataIndex:'date',
                key:'date'
            },{
                title:"状态",
                dataIndex:'paid',
                render: (text,record) => {
                    return (<a style={{color:[this.showColor(record.paid)]}}>{this.orderState(record.orderId)}</a>)
                }
            }, {
                title: '操作',
                render: (text, record) => {
                    return (
                        <div>
                            <Tooltip placement="topLeft" title="查看" arrowPointAtCenter>
                                <a style={{marginLeft: '20px'}} onClick={() => this.showDetailOrder(record.orderId)}><Icon type="eye" style ={{fontSize:"25px"}}/></a>
                            </Tooltip>
                            <Tooltip placement="topLeft" title="删除" arrowPointAtCenter>
                                <Popconfirm placement="topRight" title="您确定要删除这条订单记录吗？" onConfirm={() => this.deleteHistoryOrder(record.orderId)}>
                                    <a style={{marginLeft: '20px'}}><Icon style ={{color:'red',fontSize:"25px"}} type="delete"/></a>
                                </Popconfirm>
                            </Tooltip>
                        </div>
                    )}
            }];


        const detailColumn = [ {
            title: '票品名称',
            dataIndex: 'name',
            key:'name'
        },{
            title:'详细信息',
            dataIndex:'description',
            key:'description',
        }, {
            title: '价格',
            dataIndex:'price',
            key:'price',
        },{
            title:'数量',
            dataIndex:'count',
            key:'count'
        }];

        const {getFieldDecorator} = this.props.form;

        return(
            <div>
                <Form layout="inline">
                    <Form.Item label="订单日期区间">
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('date1', {
                        })(
                            <DatePicker allowClear={true}/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <span className="ant-calendar-range-picker-separator"> ~ </span>
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('date2', {
                            initialValue: this.props.form.getFieldValue('date1')
                        })(
                            <DatePicker disabledDate={this.disabledDate} allowClear={true}/>
                        )}
                    </Form.Item>
                    <Form.Item label="订单价格区间">
                    </Form.Item>
                    <Form.Item
                    >
                        {getFieldDecorator('startPrice', {
                        })(
                            <InputNumber></InputNumber>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <span className="ant-calendar-range-picker-separator"> ~ </span>
                    </Form.Item>
                    <Form.Item
                    >
                        {getFieldDecorator('endPrice', {
                            initialValue:this.props.form.getFieldValue('startPrice')
                        })(
                            <InputNumber min={this.props.form.getFieldValue('startPrice')} disabled={this.props.form.getFieldValue('startPrice') === undefined}></InputNumber>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            onClick={() =>this.handleDateAndNumber(this.state.historyOrder)}
                            style={{fontWeight: "bold"}}
                        >
                            查询订单
                        </Button>
                    </Form.Item>
                </Form>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="全部">
                        <a style={{color:'black'}}>全部</a>
                    </Menu.Item>
                    <Menu.Item key="已完成">
                        <a style={{color:'black'}}>已完成</a>
                    </Menu.Item>
                    <Menu.Item key="未完成">
                        <a style={{color:'black'}}>未完成</a>
                    </Menu.Item>
                </Menu>
                <Table
                    dataSource={(this.state.showDetail)?this.state.detailOrder:this.state.differentTypeOrder_copy}
                    columns={(this.state.showDetail)?detailColumn:columns}
                    rowKey={'orderId'}
                    bordered
                    title={()=> (this.state.showDetail)?"订单明细": <span className={"table-font"}>{this.props.match.params.userName}的{this.state.current}历史订单</span>}
                    footer={()=>(this.state.showDetail)?<Button icon="left" onClick={() => this.returnToHistoryOrder()}>返回</Button>:<Button onClick={()=>this.allOrder()}>全部订单</Button>}
                    pagination={{
                        defaultPageSize:8,
                        pageSizeOptions:['8','16','24'],
                        showSizeChanger: true,
                        showQuickJumper: false,
                        position:'bottom'
                    }}
                >
                </Table>
            </div>
        );
    }
}

const historyOrderForm = Form.create()(History);

export default historyOrderForm;
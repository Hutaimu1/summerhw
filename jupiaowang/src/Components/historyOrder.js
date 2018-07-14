import React from 'react'
import {Table,Button,message,Popconfirm,Row,Col,Menu,DatePicker,Form,Input} from 'antd'
import $ from "jquery";
import moment from "moment/moment";
let historyOrder =[
    {orderId:1,totalPrice:1000,date:"2018-07-10 22:00:00",paid:1},
    {orderId:2,totalPrice:10000,date:"2018-07-11 22:00:00",paid:2},
    {orderId:3,totalPrice:5000,date:"2018-07-17 22:00:00",paid:3}
];

let detailOrder = [
    {orderId:2,name:'商品1',price:100,count:10}
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
                        message.success("已删除记录！")
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
            preState.historyOrder.forEach((order) =>{
                if(order.paid !== 0){
                    paidOrder.push(order);
                }
            });
            return {
                differentTypeOrder:paidOrder,
                differentTypeOrder_copy:paidOrder
            };
        });
    }

    showPaid(){
        let paidOrder = [];
        this.setState((preState) =>{
            preState.historyOrder.forEach((order) =>{
                if(order.paid === 3){
                    paidOrder.push(order);
                }
            });
            return {
                differentTypeOrder:paidOrder,
                differentTypeOrder_copy:paidOrder
            }
        })
    }


    showNotFinished(){
        let paidOrder = [];
        this.setState((preState) =>{
            preState.historyOrder.forEach((order) =>{
                if(order.paid !== 3){
                    paidOrder.push(order);
                }
            });
            return {
                differentTypeOrder:paidOrder,
                differentTypeOrder_copy:paidOrder
            }
        })
    }

    handleDate =(differentTypeOrder) =>{
        let date1 = this.props.form.getFieldValue('date1');
        let date2 = this.props.form.getFieldValue('date2');
        let result = [];
        differentTypeOrder.forEach((order)=>{
            let date = moment(order.date,'YYYY-MM-DD HH:mm:ss');
            if((date >= date1) && date <= date2){
                result.push(order);
            }
        });
        this.setState({
            differentTypeOrder_copy:result
        })

    };

    disabledDate =(current) =>{
        return current < this.props.form.getFieldValue('date1');
    };

    handlePrice =(differentTypeOrder) =>{
        let startPrice = this.props.form.getFieldValue('startPrice');
        let endPrice = this.props.form.getFieldValue('endPrice');
        let result = [];
        differentTypeOrder.forEach((order)=>{
            let price = order.totalPrice;
            if((price >= startPrice) && price <= endPrice){
                result.push(order);
            }
        });
        this.setState({
            differentTypeOrder_copy:result
        })

    };

    checkNumber = (rule, value, callback) => {
        let reg = /^[0-9]+$/;
        if (value && !reg.test(value)) {
            callback('请输入正确的数字')
        }
        callback()
    };

    checkNumber2 = (rule, value, callback) => {
        let startPrice = this.props.form.getFieldValue('startPrice');
        let reg = /^[0-9]+$/;
        if (value && !reg.test(value)) {
            callback('请输入正确的数字')
        }
        if(value < startPrice){
            callback('最大价格不能小于最小价格')
        }
        callback()
    };

    showColor = (paid) =>{
        let color ='black';
        if(paid === 1){
            color = 'grey';
        }
        else if(paid === 2){
            color = 'yellow';
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
            },{
                title: '操作',
                render: (text,record) => {
                    return (
                        <Row>
                            <Col span={12}>
                                <Button onClick={() => this.showDetailOrder(record.orderId)} icon="eye">查看</Button>
                            </Col>
                            <Col>
                                <Popconfirm title="确定要删除这条订单记录吗？" onConfirm={() => this.deleteHistoryOrder(record.orderId)}>
                                    <Button type="danger" icon="delete">删除</Button>
                                </Popconfirm>
                            </Col>
                        </Row>
                    )}
            }];

        const detailColumn = [ {
            title: '票品名称',
            dataIndex: 'name',
            key:'name'
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
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                label="开始日期"
                            >
                                {getFieldDecorator('date1', {
                                    initialValue: moment()
                                })(
                                    <DatePicker allowClear={false}/>
                                )}
                                </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="结束日期"
                            >
                                {getFieldDecorator('date2', {
                                    initialValue: moment()
                                })(
                                    <DatePicker disabledDate={this.disabledDate} allowClear={false}/>
                                )}
                                </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={() =>this.handleDate(this.state.differentTypeOrder)}
                                    style={{fontWeight: "bold"}}
                                >
                                    查询订单
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                label="订单价格区间"
                            >
                                {getFieldDecorator('startPrice', {
                                    initialValue: "价格最小值",
                                    rules: [{ required: true, message: '请输入一个价格数字!'},
                                        {
                                            validator: this.checkNumber
                                        }],
                                })(
                                    <Input></Input>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                            >
                                {getFieldDecorator('endPrice', {
                                    initialValue: "价格最大值",
                                    rules: [{ required: true, message: '请输入一个价格数字!'},
                                         {
                                            validator: this.checkNumber2
                                        }],
                                })(
                                    <Input ></Input>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={() =>this.handlePrice(this.state.differentTypeOrder)}
                                    style={{fontWeight: "bold"}}
                                >
                                    查询订单
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
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
                    footer={()=>(this.state.showDetail)?<Button icon="left" onClick={() => this.returnToHistoryOrder()}>返回</Button>:""}
                    pagination={{
                        defaultPageSize:8,
                        pageSizeOptions:['8','16','24'],
                        showSizeChanger: true,
                        showQuickJumper: false,
                    }}
                >
                </Table>
            </div>
        );
    }
}

const historyOrderForm = Form.create()(History);

export default historyOrderForm;
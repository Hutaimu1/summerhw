import React from 'react'
import {Table,Button,Row,Col,message,Popconfirm} from 'antd'
import $ from "jquery";
import moment from 'moment'

let orderNotPaid =[
    {orderId:1,totalPrice:1000,date:"2018-07-14 20:00:00",paid:0},
    {orderId:2,totalPrice:1000,date:"2018-07-14 20:00:00",paid:0},
    {orderId:3,totalPrice:1000,date:"2018-07-14 20:00:00",paid:0}
];

let detailOrder = [
    {orderId:2,name:'商品1',price:100,count:10}
];

export default class OrderToBeResolved extends React.Component{
    constructor() {
        super();
        this.state = {
            orderNotPaid: orderNotPaid,
            showDetail:false,
            detailOrder:detailOrder,
        };
    }


    componentDidMount(){
        let userName = this.props.match.params.userName;
        let result =[];
        $.ajax({
            type: "post",
            url: "bookstoreApp/getOrderList",
            data: {userName: userName},
            async: true,
            success: function (data) {
                result = JSON.parse(data);
                this.setState({
                    orderNotPaid:result,
                    showDetail:false
                });
            }.bind(this),
        });
    }

    showDetailOrder(orderId){
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
    }

    returnToOrderNotPaid(){
        this.setState({
            showDetail:false
        });
    }

    deleteOrder = (id) => {
        this.setState((preState) =>{
            preState.orderNotPaid.forEach((order,index) =>{
                if(order.orderId === id){
                    preState.orderNotPaid.splice(index,1);
                }
            });
            $.ajax({
                type: "post",
                url: "bookstoreApp/deleteOrder",
                data: {orderId: id},
                async: true,
                success: function (data) {
                    if(JSON.parse(data)){
                        message.success("取消订单成功！")
                    }
                }
            });
            return {
               orderNotPaid:preState.orderNotPaid
            }
        })
    };

    goToBuy(id){
        this.setState((preState) =>{
            preState.orderNotPaid.forEach((order,index) =>{
                if(order.orderId === id){
                    preState.orderNotPaid.splice(index,1);
                }
            });
            $.ajax({
                type: "post",
                url: "bookstoreApp/addToHistoryOrder",
                data: {orderId: id},
                async: true,
                success: function (data) {
                    if(JSON.parse(data)){
                        message.success("已确认订单")
                    }
                }
            });
            return {
                orderNotPaid:preState.orderNotPaid
            }
        })
    }

    leftTime = (id) => {
        let result;
        this.state.orderNotPaid.forEach((order) => {
            if (order.orderId === id) {
                let m2 = moment(moment().format("YYYY-MM-DD HH:mm:ss"));
                let m1 = moment(order.date);
                let du = moment(m2 - m1).format("mm分ss秒");
                let minute = parseInt(du.substr(0, 2),0);
                let second = parseInt(du.substr(3, 2),0);
                let leftMinute = 900 - (minute * 60 + second);
                result = parseInt((leftMinute / 60).toString(),0) + "分" + (leftMinute % 60).toString() + "秒";
                }
        });
        return result;
    }


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
            },{
                title:"时间",
                dataIndex:'date',
                key:'date'
            },{
                title:"剩余支付时间",
                key:"leftTime",
                render: (text,record) => {
                    return (<a style={{color:"black"}} id ='time'>{this.leftTime(record.orderId)}</a>)
                }
            },{
                title: '操作',
                key:'paid',
                render: (text,record) => {
                    return (
                        <Row>
                            <Col span={6}>
                                <Button onClick={() => this.showDetailOrder(record.orderId)} icon="eye">查看</Button>
                            </Col>
                            <Col span={6}>
                                <Popconfirm title="确定使用支付宝付款吗?" onConfirm={() => this.goToBuy(record.orderId)}>
                                    <Button icon="alipay">支付</Button>
                                </Popconfirm>
                            </Col>
                            <Col span={6}>
                                <Popconfirm title="确定使用微信付款吗?" onConfirm={() => this.goToBuy(record.orderId)}>
                                    <Button icon="wechat">支付</Button>
                                </Popconfirm>
                            </Col>
                            <Col span={6}>
                                <Popconfirm title="确定要删除订单吗?" onConfirm={() => this.deleteOrder(record.orderId)}>
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
        },{
            title: '价格',
            dataIndex:'price',
            key:'price',
        },{
            title:'数量',
            dataIndex:'count',
            key:'count'
        }];

        return(
            <Table
                dataSource={(this.state.showDetail)?this.state.detailOrder:this.state.orderNotPaid}
                columns={(this.state.showDetail)?detailColumn:columns}
                rowKey={'orderId'}
                bordered
                title={()=> (this.state.showDetail)?"订单明细":'Tips:未支付订单会保留15分钟，请及时付款'}
                footer={()=>(this.state.showDetail)?<Button icon="left" onClick={() => this.returnToOrderNotPaid()}>返回</Button>:""}
                pagination={{
                    defaultPageSize:8,
                    pageSizeOptions:['8','16','24'],
                    showSizeChanger: true,
                    showQuickJumper: false,
                    position:'top'
                }}
            >
            </Table>
        );
    }
}
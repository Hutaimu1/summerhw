import React from 'react'
import {Table,Button,message,Popconfirm,Tooltip,Icon} from 'antd'
import $ from "jquery";
import moment from 'moment'

let orderNotPaid =[
];

let detailOrder = [
];

export default class OrderToBeResolved extends React.Component{
    constructor() {
        super();
        this.state = {
            orderNotPaid: orderNotPaid,
            showDetail:false,
            detailOrder:detailOrder,
            show:true
        };
        setInterval(()=>{
            this.setState({show:!this.state.show})//每个一秒，showText的值取反。原来的值是这样子获取this.state.showText
        },1000);
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
                        message.success("取消订单成功")
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
        this.state.orderNotPaid.forEach((order,index) => {
            if (order.orderId === id) {
                let m2 = moment(moment().format("YYYY-MM-DD HH:mm:ss"));
                let m1 = moment(order.date);
                let du = moment(m2 - m1).format("mm分ss秒");
                let minute = parseInt(du.substr(0, 2),0);
                let second = parseInt(du.substr(3, 2),0);
                let leftMinute = 900 - (minute * 60 + second);
                result = parseInt((leftMinute / 60).toString(),0) + "分" + (leftMinute % 60) + "秒";
                if(parseInt((leftMinute / 60).toString(),0)===0 && (leftMinute % 60) === 0){
                    this.state.orderNotPaid.splice(index,1);
                    message.warning("订单号为"+ id + "的订单超时付款时间")
                }
            }
        });
        return result;
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
                        <div>
                            <Tooltip placement="topLeft" title={<div style={{width:"28px"}}>查看</div>} arrowPointAtCenter>
                                <a style={{marginLeft: '20px',fontSize:"25px"}} onClick={() => this.showDetailOrder(record.orderId)}><Icon type="eye"/></a>
                            </Tooltip>
                            <Tooltip placement="topLeft" title={<div style={{width:'70px'}}>支付宝付款</div>} arrowPointAtCenter>
                                <Popconfirm placement="topRight" title={<div style={{width:"150px"}}>您确定使用支付宝付款吗？</div>} onConfirm={() => this.goToBuy(record.orderId)}>
                                    <a style={{marginLeft: '20px',fontSize:"25px"}}><Icon type="alipay" /></a>
                                </Popconfirm>
                            </Tooltip>
                            <Tooltip placement="topLeft" title={<div style={{width:'56px'}}>微信付款</div>} arrowPointAtCenter>
                                <Popconfirm placement="topRight" title={<div style={{width:"150px"}}>您确定使用微信付款吗？</div>} onConfirm={() => this.goToBuy(record.orderId)}>
                                    <a style={{marginLeft: '20px',fontSize:"25px"}}><Icon style ={{color:'green'}} type="wechat"/></a>
                                </Popconfirm>
                            </Tooltip>
                            <Tooltip placement="topLeft" title={<div style={{width:"28px"}}>删除</div>} arrowPointAtCenter>
                                <Popconfirm placement="topRight" title={<div style={{width:"150px"}}>您确定要删除这条订单记录吗?</div>} onConfirm={() => this.deleteOrder(record.orderId)}>
                                    <a style={{marginLeft: '20px',fontSize:"25px"}}><Icon style ={{color:'red'}} type="delete"/></a>
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

        return(
            <Table
                dataSource={(this.state.showDetail)?this.state.detailOrder:this.state.orderNotPaid}
                columns={(this.state.showDetail)?detailColumn:columns}
                rowKey={'orderId'}
                bordered
                title={()=> (this.state.showDetail)?<Button icon="left" onClick={() => this.returnToOrderNotPaid()}>返回</Button>
                    :<a style={{color:'red'}}>Tips:未支付订单会保留15分钟，请及时付款!</a>}
                pagination={{
                    defaultPageSize:8,
                    pageSizeOptions:['8','16','24'],
                    showSizeChanger: true,
                    showQuickJumper: false,
                    position:'bottom'
                }}
            >
            </Table>
        );
    }
}
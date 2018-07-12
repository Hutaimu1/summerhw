import React from 'react'
import {Table,Button,message,Popconfirm} from 'antd'
import $ from "jquery";

let historyOrder =[
    {orderId:1,totalPrice:1000,date:"2018-07-11 22:00:00",paid:1},
    {orderId:2,totalPrice:1000,date:"2018-07-11 22:00:00",paid:1},
    {orderId:3,totalPrice:1000,date:"2018-07-11 22:00:00",paid:1}
];

let detailOrder = [
    {orderId:2,name:'商品1',price:100,count:10}
];
export default class History extends React.Component{
    constructor() {
        super();
        this.state = {
            historyOrder: historyOrder,
            showDetail:false,
            detailOrder:detailOrder
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
                title:'查看详情',
                key:'see',
                render: (text,record) => {
                    return (<Button onClick={() => this.showDetailOrder(record.orderId)} icon="eye">查看</Button>)
                }
            },{
                title: '操作',
                key:'paid',
                render: (text,record) => {
                    return (
                        <Popconfirm title="确定要删除这条订单记录吗？" onConfirm={() => this.deleteHistoryOrder(record.orderId)}>
                            <Button style={{backgroundColor:"red"}} icon="delete">删除</Button>
                        </Popconfirm>
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


        return(
            <Table
                dataSource={(this.state.showDetail)?this.state.detailOrder:this.state.historyOrder}
                columns={(this.state.showDetail)?detailColumn:columns}
                rowKey={'orderId'}
                bordered
                title={()=> (this.state.showDetail)?"订单明细":<span className={"table-font"}>{this.props.match.params.userName}的历史订单</span>}
                footer={()=>(this.state.showDetail)?<Button icon="left" onClick={() => this.returnToHistoryOrder()}>返回</Button>:""}
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
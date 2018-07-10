import React from 'react'
import {Table,Button} from 'antd'
import $ from "jquery";

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
        };
        this.showDetail =this.showDetail.bind(this);
    }

    componentDidMount(){
        let userName = this.props.name;
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
                });
            }.bind(this),
        });
    }

    showDetail(orderId){
        this.setState((preState) =>{
            preState.showDetail = true;
            $.ajax({
                type: "post",
                url: "bookstoreApp/showOrderDetail",
                data: {orderId: orderId},
                async: true,
                success: function (data) {
                    preState.detailOrder = JSON.parse(data);
                }
            });
            return {
                showDetail:preState.showDetail,
                detailOrder:preState.detailOrder
            }
        });
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
                title:'查看详情',
                key:'see',
                render: (text,record) => {
                    return (<Button onClick={this.showDetail.bind(record.orderId)} icon="eye">查看</Button>)
                }
            },{
                title: '操作',
                key:'paid',
                render: (text,record) => {
                    return (<Button type="primary" style={{fontWeight: "bold"}} icon="qq">去付款</Button>)
                }
            }];

        const detailColumn = [ {
            title: '票品名称',
            dataIndex: 'orderId',
            key:'name'
        }, {
            title: '价格',
            dataIndex:'price',
            key:'price',
        },{
            title:"数量",
            dataIndex:'count',
            key:'date'
        }];

        return(
            <Table
                dataSource={this.state.showDetail?this.state.detailOrder:this.state.orderNotPaid}
                columns={this.state.showDetail?detailColumn:columns}
                rowKey={'orderId'}
                bordered
                title={()=> "header"}
                footer={()=>"footer"}
            >
            </Table>
        );
    }
}
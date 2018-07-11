import React from 'react'
import {Table,Button} from 'antd'
import $ from "jquery";

let orderNotPaid =[];

export default class OrderToBeResolved extends React.Component{
    constructor() {
        super();
        this.state = {
            orderNotPaid: orderNotPaid,
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
                });
            }.bind(this)
        });
    }


    render(){
        const columns = [
            {
                title: '订单号',
                dataIndex: 'orderId',
                key:'name'
            }, {
                title: '价格',
                dataIndex:'totalPrice',
                key:'price',
            },{
                title:"时间",
                dataIndex:'date',
                key:'date'
            },{
                title: '操作',
                key:'paid',
                render: (text,record) => {
                    return (<Button type="primary" style={{fontWeight: "bold"}} icon="qq">去付款</Button>)
                }
            }];
        return(
            <Table
                dataSource={this.state.orderNotPaid}
                columns={columns}
                rowKey={'orderId'}
                bordered
                title={()=> "header"}
                footer={()=>"footer"}
            />
        );
    }
}
import React from 'react'
import {
    Form,
    Table,
    Tooltip,
    Popconfirm,
    Menu,
    Button,
    Icon,
    DatePicker,
    InputNumber,
    message,
    Select,
    Input} from 'antd';
import $ from "jquery";
import moment from "moment/moment";

let allOrder = [{orderId:1,userName:'hutaimu',totalPrice:1000,paid:1,date:"2018-07-05 10:00:00"},
    {orderId:2,userName:'hutaimu1',totalPrice:900,paid:0,date:"2018-07-06 10:00:00"},
    {orderId:3,userName:'hutaimu2',totalPrice:1000,paid:3,date:"2018-07-07 10:00:00"},
    {orderId:0,userName:'hutaimu',totalPrice:800,paid:2,date:"2018-07-08 10:00:00"}];

let detailOrder = [{orderId:1,name:"商品1",price:100,count:10,description:"商品1明细"}];

class orderManagement extends React.Component{

    constructor() {
        super();
        this.state = {
            historyOrder: allOrder,
            showDetail:false,
            queryType:0,
            detailOrder:detailOrder,
            differentTypeOrder:allOrder,
            current: '全部',
            differentTypeOrder_copy:allOrder
        };
    }

    componentDidMount(){
        let result =[];
        $.ajax({
            type: "post",
            url: "bookstoreApp/getAllOrderList",
            async: true,
            success: function (data) {
                result = JSON.parse(data);
                this.setState({
                    historyOrder:result,
                    differentTypeOrder:result,
                    differentTypeOrder_copy:result
                });
            }.bind(this),
        });
    }

    disabledDate =(current) =>{
        if(this.props.form.getFieldValue('date1') === undefined){
            return current < moment('2999-12-31');
        }
        return current < this.props.form.getFieldValue('date1');
    };

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

    allOrder = () =>{
        let all = this.state.historyOrder;
        this.setState({
            current:'全部',
            differentTypeOrder:all,
            differentTypeOrder_copy:all
        })
    };

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

    orderState =(id) =>{
        let orderStates = '订单未付款';
        this.state.historyOrder.forEach((order) => {
            if(order.orderId === id){
                if(order.paid === 0){
                    orderStates = '订单未付款'
                }
                if(order.paid === 1){
                    orderStates = '订单已取消';
                }
                else if(order.paid === 2){
                    orderStates = '超过付款时间';
                }
                else if(order.paid === 3){
                    orderStates = '订单已完成';
                }
            }
        });
        return orderStates;
    };

    showColor = (paid) =>{
        let color ='black';
        if(paid === 0){
            color = "black"
        }
        if(paid === 1){
            color = 'grey';
        }
        else if(paid === 2){
            color = 'red';
        }
        else if(paid === 3){
            color = 'green'
        }
        return color;
    };

    handleClick = (e) => {
        this.setState({
            current:e.key
        });
        if( e.key === '全部'){
            this.showAll();
        }
        else if(e.key === '已完成'){
            this.showPaid();
        }
        else if(e.key === '待付款'){
            this.showToBePaid();
        }
        else if( e.key === '未完成') {
            this.showNotFinished();
        }
    };

    showAll(){
        let order = this.state.differentTypeOrder;
        this.setState({
            differentTypeOrder_copy:order
        });
    }

    showToBePaid(){
        let paidOrder = [];
        this.setState((preState) =>{
            preState.differentTypeOrder.forEach((order) =>{
                if(order.paid === 0){
                    paidOrder.push(order);
                }
            });
            return {
                differentTypeOrder_copy:paidOrder
            }
        })
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
                if(order.paid === 1  || order.paid === 2){
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
            differentTypeOrder_copy:result,
            current:'全部'
        })
    };

    handleUserName = (differentTypeOrder) =>{
        let userName = this.props.form.getFieldValue('userName');
        let result = [];
        if(!this.hasValue(userName)){
            differentTypeOrder.forEach((order)=>{
                result.push(order);
            })
        }
        else{
            differentTypeOrder.forEach((order)=>{
                if(order.userName === userName){
                    result.push(order);
                }
            })
        }
        this.setState({
            differentTypeOrder:result,
            differentTypeOrder_copy:result,
            current:'全部'
        })
    };

    handleOrderId = (differentTypeOrder) =>{
        let orderId = this.props.form.getFieldValue('orderId');
        let result = [];
        if(!this.hasValue(orderId)){
            differentTypeOrder.forEach((order)=>{
                result.push(order);
            })
        }
        else{
            differentTypeOrder.forEach((order)=>{
                if(order.orderId === parseInt(orderId,0)){
                    result.push(order);
                }
            })
        }
        this.setState({
            differentTypeOrder:result,
            differentTypeOrder_copy:result,
            current:'全部'
        })
    };

    handleQueryType = (value) =>{
        let type = 0;
        if(value === "按日期价格查询"){
            type = 0;
        }
        else if(value === "按用户名查询"){
            type = 1;
        }
        else if(value === "按订单号查询"){
            type = 2;
        }
        this.setState({
            queryType:type
        })
    };

    render(){
        const columns = [
            {
                title: '订单号',
                dataIndex: 'orderId',
                key:'orderId'
            }, {
                title:'用户名',
                dataIndex:'userName',
                key:'userName'
            },{
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
                            <Tooltip placement="top" title="查看" arrowPointAtCenter>
                                <a style={{marginLeft: '20px'}} onClick={() => this.showDetailOrder(record.orderId)}><Icon type="eye"/></a>
                            </Tooltip>
                            <Tooltip placement="top" title="删除" arrowPointAtCenter>
                                <Popconfirm placement="right" title="您确定要删除这条订单记录吗？" onConfirm={() => this.deleteHistoryOrder(record.orderId)}>
                                    <a style={{marginLeft: '20px'}}><Icon style ={{color:'red'}} type="delete"/></a>
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

        const queryType =(
            <Select defaultValue="按日期价格查询" style={{width: 180}} onChange={(value) => this.handleQueryType(value)}>
                <Select.Option value="按日期价格查询">按日期价格查询</Select.Option>
                <Select.Option value="按用户名查询">按用户名查询</Select.Option>
                <Select.Option value="按订单号查询">按订单号查询</Select.Option>
            </Select>
        );

        const dateAndPriceQuery =(
            <Form layout={"inline"}>
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
                        <InputNumber min={0}>&nbsp;</InputNumber>
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
                        <InputNumber min={this.props.form.getFieldValue('startPrice')} disabled={this.props.form.getFieldValue('startPrice') === undefined}>&nbsp;</InputNumber>
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
        );

        const userNameQuery =(
            <Form layout={"inline"}>
                <Form.Item label={"查询姓名"}>
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('userName', {
                    })(
                        <Input placeholder="输入姓名"/>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        onClick={() =>this.handleUserName(this.state.historyOrder)}
                        style={{fontWeight: "bold"}}
                    >
                        查询订单
                    </Button>
                </Form.Item>
            </Form>
        );

        const orderIdQuery = (
            <Form layout={"inline"}>
                <Form.Item label={"查询订单号"}>
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('orderId', {
                    })(
                        <Input placeholder="输入订单号"/>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        onClick={() =>this.handleOrderId(this.state.historyOrder)}
                        style={{fontWeight: "bold"}}
                    >
                        查询订单
                    </Button>
                </Form.Item>
            </Form>
        );

        function showQueryType(queryType) {
            if(queryType === 0){
                return {...dateAndPriceQuery};
            }
            else if(queryType === 1){
                return {...userNameQuery};
            }
            else if(queryType === 2){
                return {...orderIdQuery};
            }
        }

        return(
            <div>
                <Form layout="inline">
                    <Form.Item label="查询方式">
                    </Form.Item>
                    <Form.Item>
                        {queryType}
                    </Form.Item>
                </Form>
                {showQueryType(this.state.queryType)}
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="全部">
                        <a style={{color:'black'}}>全部</a>
                    </Menu.Item>
                    <Menu.Item key="待付款">
                        <a style={{color:'black'}}>待付款</a>
                    </Menu.Item>
                    <Menu.Item key="未完成">
                        <a style={{color:'black'}}>未完成</a>
                    </Menu.Item>
                    <Menu.Item key="已完成">
                        <a style={{color:'black'}}>已完成</a>
                    </Menu.Item>
                </Menu>
                <Table
                    dataSource={(this.state.showDetail)?this.state.detailOrder:this.state.differentTypeOrder_copy}
                    columns={(this.state.showDetail)?detailColumn:columns}
                    rowKey={'orderId'}
                    bordered
                    title={()=> (this.state.showDetail)?"订单明细": <span className={"table-font"}>聚票网目前的{this.state.current}订单</span>}
                    footer={()=>(this.state.showDetail)?<Button icon="left" onClick={() => this.setState({showDetail:false})}>返回</Button>:<Button onClick={()=>this.allOrder()}>全部订单</Button>}
                    pagination={{
                        defaultPageSize:8,
                        pageSizeOptions:['8','16','24'],
                        showSizeChanger: true,
                        showQuickJumper: false
                    }}
                >
                </Table>
            </div>
        );
    }
}


const orderManagementForm = Form.create()(orderManagement);
export default orderManagementForm;
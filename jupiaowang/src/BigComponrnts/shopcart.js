import React from 'react';
import {InputNumber,Icon,Row, Col, Button,Table,Popconfirm,message} from 'antd'
import $ from 'jquery'
import moment from 'moment'

let goodsArray = [
    {/* {key:0,id: 1, name: "商品1", price: 45, count: 9, checked: false},
    {key:1,id: 2, name: "商品2", price: 46, count: 1, checked: false},
    {key:2,id: 3, name: "商品3", price: 35, count: 8, checked: true},
    {key:3,id: 4, name: "商品4", price: 86, count: 1, checked: false},
    {key:4,id: 5, name: "商品5", price: 4, count: 3, checked: false},
    {key:5,id: 6, name: "商品6", price: 53, count: 6, checked: false},
    {key:6,id: 7, name: "商品7", price: 66, count: 1, checked: false},
    {key:7,id: 8, name: "商品8", price: 15, count: 5, checked: false},
    {key:8,id: 9, name: "商品9", price: 6, count: 8, checked: false},*/}
];
;

export default class ShopCart extends React.Component {
    constructor() {
        super();
        this.state = {
            goodsArray: goodsArray,
            totalPrice: 0,
            isSelectAll: false,
            selectCheckedArray:[]
        };
        this.changeGoodsCheckFlag = this.changeGoodsCheckFlag.bind(this);
        this.changeSelectAllFlag = this.changeSelectAllFlag.bind(this);
        this.deleteGoods = this.deleteGoods.bind(this);
        this.removeAll = this.removeAll.bind(this);
        this.removeChecked = this.removeChecked.bind(this);
        this.setGoodsCount = this.setGoodsCount.bind(this);
        this.orderToBeSolved = this.orderToBeSolved.bind(this);
    }

    componentDidMount(){
        let userName = this.props.name;
        let result = [];
        $.ajax({
            type: "post",
            url: "bookstoreApp/getShopCartList",
            data: {userName: userName},
            async: true,
            success: function (data) {
                result = JSON.parse(data);
                this.setState({
                    goodsArray:result,
                    totalPrice:this.updatePrice(result),
                    isSelectAll:ShopCart.updateSelectAllFlag(result),
                    selectCheckedArray:this.updateSelectedCheckedArray(result)
                });
            }.bind(this)
        });
        console.log("success",this.state.selectCheckedArray);
    }


    updatePrice(goodsArray) {
        let price = 0;
        goodsArray.forEach((goods) =>{
            if(goods.checked){
                price += goods.price * goods.count;
            }
        });
        return price;
    }

    static updateSelectAllFlag(goodsArray) {
        for (let i = 0; i < goodsArray.length; ++i) {
            if (!goodsArray[i].checked) {
                return false;
            }
        }
        return true;
    }

    updateSelectedCheckedArray(goodsArray){
        let array = [];
        goodsArray.forEach((goods) => {
            if(goods.checked){
                array.push(goods.id);
            }
        });
        return array;
    }

    removeAll() {
        let arr = [];
        this.setState((preState) =>{
            let len = preState.goodsArray.length;
            for(let i = 0;i<len;++i){
                arr.push(preState.goodsArray[i].id);
            }
            $.ajax({url:"bookstoreApp/deleteShopCartItem",
                data:{cartItemId:arr},
                type:"POST",
                traditional:true,
                success:function(){
                    console.log("success");
                }
            });
            for(let j = 0; j < preState.goodsArray.length;++j){
                preState.goodsArray.splice(j,1);
                j--;
            }
            return{
                goodsArray: preState.goodsArray,
                totalPrice: this.updatePrice(preState.goodsArray),
                isSelectAll: false,
                selectCheckedArray:[]
            }
        })
    }

    removeChecked() {
        let arr = [];
        this.setState((preState) => {
            for (let i = 0; i < preState.goodsArray.length; ++i) {
                if(preState.selectCheckedArray.indexOf(preState.goodsArray[i].id) > -1 ) {
                    arr.push(preState.goodsArray[i].id);
                    preState.goodsArray.splice(i, 1);
                    i--;
                }
            }
            $.ajax({url:"bookstoreApp/deleteShopCartItem",
                data:{cartItemId:arr},
                type:"POST",
                traditional:true,
                success:function(){
                    console.log("success");
                }
            });
            return {
                goodsArray:preState.goodsArray,
                totalPrice: this.updatePrice(preState.goodsArray),
                isSelectAll: false,
                selectCheckedArray:[]
            }
        });
    }

    deleteGoods(id) {
        let arr = [];
        this.setState((preState) => {
            for (let i = 0; i < preState.goodsArray.length; ++i) {
                if (id.toString() === preState.goodsArray[i].id.toString()) {
                    arr.push(preState.goodsArray[i].id);
                    preState.goodsArray.splice(i, 1);
                    break;
                }
            }
            $.ajax({url:"bookstoreApp/deleteShopCartItem",
                data:{cartItemId:arr},
                type:"POST",
                traditional:true,
                success:function(){
                    console.log("success");
                }
            });
            return {
                goodsArray: preState.goodsArray,
                totalPrice: this.updatePrice(preState.goodsArray),
                isSelectAll: ShopCart.updateSelectAllFlag(preState.goodsArray),
                selectCheckedArray:this.updateSelectedCheckedArray(preState.goodsArray)
            }
        })
    }

    setGoodsCount(id, count) {
        this.setState((preState) => {
            let i;
            for (i = 0; i < preState.goodsArray.length; ++i) {
                if (id.toString() === preState.goodsArray[i].id.toString()){
                    if(count === 0){
                        preState.goodsArray.splice(i,1)
                    }
                    else {
                        preState.goodsArray[i].count = count;
                    }
                    break;
                }
            }
            $.post("/bookstoreApp/updateCount", {cartItemId:id,count:count}, function (data) {
            });
            return {
                goodsArray: preState.goodsArray,
                totalPrice: this.updatePrice(preState.goodsArray),
                isSelectAll: ShopCart.updateSelectAllFlag(preState.goodsArray),
                selectCheckedArray:this.updateSelectedCheckedArray(preState.goodsArray)
            }
        })
    }

    changeGoodsCheckFlag(record) {
        this.setState((preState) => {
            preState.goodsArray.forEach(goods => {
                if (record.id.toString() === goods.id.toString()) {
                    goods.checked = !goods.checked;
                }
            });
            let arr = [];
            arr.push(record.id);
            console.log("success",preState.goodsArray);
            $.ajax({url:"bookstoreApp/changeChecked",
                data:{cartItemId:arr},
                type:"POST",
                traditional:true,
                success:function(){
                    console.log("success");
                }
            });
            console.log("success",this.updateSelectedCheckedArray(preState.goodsArray));
            return {
                goodsArray: preState.goodsArray,
                isSelectAll: ShopCart.updateSelectAllFlag(preState.goodsArray),
                selectCheckedArray:this.updateSelectedCheckedArray(preState.goodsArray),
                totalPrice:this.updatePrice(preState.goodsArray),
            }
        });
    }

    changeSelectAllFlag(selected, selectedRows, changeRows) {
        console.log("all");
        console.log("success",this.state.selectCheckedArray);
        let arr = [];
        let price = 0;
        this.setState((preState) => {
            preState.goodsArray.forEach(goods => {
                goods.checked = selected;
                if(selected){price += goods.price * goods.count;}
            });
            changeRows.forEach(goods => {
                arr.push(goods.id)
            });
            $.ajax({
                url: "bookstoreApp/changeChecked",
                data: {cartItemId: arr},
                type: "POST",
                traditional: true,
                success: function () {
                    console.log("success");
                }
            });
            return {
                goodsArray: preState.goodsArray,
                totalPrice: price,
                isSelectAll: selected,
                selectCheckedArray: this.updateSelectedCheckedArray(preState.goodsArray)
            }
        });
        console.log("success",this.state.selectCheckedArray);
    }

    orderToBeSolved(){
        this.setState((preState) => {
            $.ajax({
                url: "bookstoreApp/addOrderList",
                data: {userName:this.props.name,totalPrice:preState.totalPrice,date:moment().format('YYYY-MM-DD HH:mm:ss')},
                type: "POST",
                traditional: true,
                success: function (data) {
                    message.success("生成订单成功，订单号为："+JSON.parse(data)+",请前往待处理订单中查看。")
                }
            });
            return this.removeChecked();
        })
    }

    render() {
        const columns = [
            { title: '票品名称',
                dataIndex: 'name',
                key:'name'
            }, {
                title: '价格',
                dataIndex:'price',
                key:'price',
                sorter: (a, b) => a.price - b.price,
                render: (text,record) =>{ return<a style={{color:"black"}}>¥{record.price} </a>
                }
            }, {
                title: '数量',
                key:'count',
                sorter: (a, b) => a.count - b.count,
                render: (text,record) =>{
                    return <InputNumber
                        min={0}
                        max={10000}
                        defaultValue={record.count}
                        onChange={(value) => this.setGoodsCount(record.id,value)}>&nbsp;</InputNumber>
                }
            }, {
                title: '总价',
                dataIndex: '',
                key:'totalPrice',
                sorter: (a, b) => a.price*a.count - b.price*b.count,
                render: (text,record) =>{ return<a style={{color:"black"}}>¥{record.price * record.count} </a>}
            }, {
                title: '操作',
                dataIndex: 'operation',
                render: (text,record) => {
                    return (<Popconfirm title="确定要删除吗？" onConfirm={() => this.deleteGoods(record.id)}>
                        <Icon type="delete"/>
                    </Popconfirm>)}}
        ];

        const rowSelection = {
            selectedRowKeys:this.state.selectCheckedArray,
            onSelect:this.changeGoodsCheckFlag,
            onSelectAll:this.changeSelectAllFlag,
        };

        const header =
            <Row>
                <Col span={6}><span className={"table-font"}>{this.props.name}的购物车</span></Col>
                <Col span={6}>
                    <Popconfirm title="您确定要删除选中的票品吗?" onConfirm={() => this.removeChecked()}>
                        <Button type="primary" style={{fontWeight: "bold"}}>删除选中</Button>
                    </Popconfirm>
                </Col>
                <Col span={6}>
                    <Popconfirm title="您确定要清空购物车吗?" onConfirm={() => this.removeAll()}>
                        <Button type="primary" style={{fontWeight: "bold"}}>清空购物车</Button>
                    </Popconfirm>
                </Col>
                <Col>
                    <Button type="primary" style={{fontWeight: "bold"}}>查看历史记录</Button>
                </Col>
            </Row>;

        const footer = <Row>
            <Col span={16}><span className={"table-font"}>合计：¥{this.state.totalPrice}</span></Col>
            <Col span={8}>
                <Popconfirm title="您确定要生成选中票品的订单吗？" onConfirm={() => this.orderToBeSolved()}>
                <Button type="primary" style={{fontWeight: "bold"}} disabled={this.state.selectCheckedArray.length===0}>
                    去结算({this.state.selectCheckedArray.length})
                </Button>
                </Popconfirm>
            </Col>
        </Row>;

        return (
            <Table
                rowKey={"id"}
                dataSource={this.state.goodsArray}
                columns={columns}
                rowSelection={rowSelection}
                bordered
                title={() => header}
                footer={() => footer}
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
import React from 'react';
/*import GoodsTable from '../smallComponents/goodsTable'*/
import {InputNumber,Icon,Row, Col, Button,Table,Popconfirm} from 'antd'
import $ from 'jquery'


let goodsArray = [];


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
                array.push(goods.key);
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
                if(preState.selectCheckedArray.indexOf(preState.goodsArray[i].key) > -1 ) {
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
        console.log("one");
        console.log("success",this.state.selectCheckedArray);
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
            return {
                goodsArray: preState.goodsArray,
                isSelectAll: ShopCart.updateSelectAllFlag(preState.goodsArray),
                selectCheckedArray:this.updateSelectedCheckedArray(preState.goodsArray),
                totalPrice:this.updatePrice(preState.goodsArray),
            }
        });
        console.log("success",this.state.selectCheckedArray);
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

    render() {
        const columns = [
            { title: '票品名称',
                dataIndex: 'name',
                key:'name'
            }, {
                title: '价格',
                dataIndex: 'price',
                key:'price'
            }, {
                title: '数量',
                dataIndex: 'count',
                render: (text,record) =>{
                    return <InputNumber min={0} max={10000} defaultValue={record.count} onChange={(value) => this.setGoodsCount(record.id,value)}>&nbsp;</InputNumber>
                }
            }, {
                title: '总价',
                dataIndex: '',
                render: (text,record) =>{ return<a style={{color:"black"}}>{record.price * record.count} </a>}
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

        return (
            <div className="form-horizontal">
                <div className="form-group">
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <Button type="primary" icon="shopping-cart">我的购物车</Button>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <Button type="default">已选中：{this.state.selectCheckedArray.length} 种票品</Button>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <Button type="default">总价钱：{this.state.totalPrice}</Button>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <Button type="danger" onClick={this.removeAll}>清空购物车</Button>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <Button type="primary" onClick={this.removeChecked}>删除选中</Button>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <Button type="danger">去结算</Button>
                        </Col>
                    </Row>
                </div>
                <br/>
                <Table dataSource={this.state.goodsArray} columns={columns} rowSelection={rowSelection}>
                </Table>
            </div>
        );
    }
}
import React from 'react';
/*import GoodsTable from '../smallComponents/goodsTable'*/
import {InputNumber,Icon,Row, Col, Button,Table,Popconfirm} from 'antd'
import $ from 'jquery'


let goodsArray = [
    {key:0,id: 1, name: "商品1", price: 45, count: 9, checked: false},
    {key:1,id: 2, name: "商品2", price: 46, count: 1, checked: false},
    {key:2,id: 3, name: "商品3", price: 35, count: 8, checked: true},
    {key:3,id: 4, name: "商品4", price: 86, count: 1, checked: false},
    {key:4,id: 5, name: "商品5", price: 4, count: 3, checked: false},
    {key:5,id: 6, name: "商品6", price: 53, count: 6, checked: false},
    {key:6,id: 7, name: "商品7", price: 66, count: 1, checked: false},
    {key:7,id: 8, name: "商品8", price: 15, count: 5, checked: false},
    {key:8,id: 9, name: "商品9", price: 6, count: 8, checked: false},
];


export default class ShopCart extends React.Component {
    constructor() {
        super();
        let price = 0;
        let selectCheckedArray = [];
        goodsArray.forEach(goods => {
            if (goods.checked) {
                price += goods.price * goods.count;
                selectCheckedArray.push(goods.key);
            }
        });
        this.state = {
            goodsArray: goodsArray,
            totalPrice: price,
            isSelectAll: false,
            selectCheckedArray:selectCheckedArray
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
        $.post("/bookstoreApp/getShopCartList", {userName: userName}, function (data) {
            result = JSON.parse(data);
            this.setState({
                goodsArray:result,
                totalPrice:this.updatePrice(result),
                isSelectAll:ShopCart.updateSelectAllFlag(result),
                selectCheckedArray:this.updateSelectedCheckedArray(result)
            })
        }.bind(this));
        console.log(this.state.selectCheckedArray);
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
        console.log(array);
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
            console.log("qqq",preState.goodsArray);
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

    changeGoodsCheckFlag(id) {
        this.setState((preState) => {
            preState.goodsArray.forEach(goods => {
                if (id.toString() === goods.id.toString()) {
                    goods.checked = !goods.checked;
                }
            });
            console.log("555",preState.goodsArray);
            let arr = [];
            arr.push(id);
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
    }

    changeSelectAllFlag(event) {
        let arr = [];
        if (event.currentTarget.checked) {
            this.setState((preState) => {
                let price = 0;
                preState.goodsArray.forEach(goods => {
                    if(!goods.checked){
                        arr.push(goods.id);
                    }
                    goods.checked = true;
                });
                preState.goodsArray.forEach(goods => {
                    if (goods.checked) {
                        price += goods.price * goods.count;
                    }
                });
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
                    totalPrice: price,
                    isSelectAll: true,
                    selectCheckedArray:this.updateSelectedCheckedArray(preState.goodsArray)
                }
            });
        }
        else {
            this.setState((preState) => {
                preState.goodsArray.forEach(goods => {
                    goods.checked = false;
                    arr.push(goods.id);
                });
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
                    totalPrice: 0,
                    isSelectAll: false,
                    selectCheckedArray:[]

                }
            });
        }
    }

    onSelectChange = (selectCheckedArray) => {
        for(let i = 0;i<this.state.goodsArray.length;++i){
            if((!this.state.goodsArray[i].checked) && (selectCheckedArray.indexOf(this.state.goodsArray[i].key) > -1)){
                this.changeGoodsCheckFlag(this.state.goodsArray[i].id);
            }
            else if ((this.state.goodsArray[i].checked) && (selectCheckedArray.indexOf(this.state.goodsArray[i].key) < 0)){
                this.changeGoodsCheckFlag(this.state.goodsArray[i].id);
            }
        }
    };

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
                    return <InputNumber min={0} max={10000} defaultValue={record.count} onChange={(value) => this.setGoodsCount(record.id,value)}></InputNumber>
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
            onChange: this.onSelectChange,

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
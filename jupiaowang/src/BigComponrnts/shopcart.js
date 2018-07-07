import React from 'react';
import GoodsTable from '../smallComponents/goodsTable'
import {Row, Col, Button, message} from 'antd'
import $ from 'jquery'


let goodsArray = [];

export default class ShopCart extends React.Component {
    constructor() {
        super();
        let count = 0;
        let price = 0;
        goodsArray.forEach(goods => {
            if (goods.checked) {
                ++count;
                price += goods.price * goods.count;
            }
        });
        this.state = {
            goodsArray: goodsArray,
            selectedCount: count,
            totalPrice: price,
            isSelectAll: false
        };
        this.changeGoodsCheckFlag = this.changeGoodsCheckFlag.bind(this);
        this.changeSelectAllFlag = this.changeSelectAllFlag.bind(this);
        this.deleteGoods = this.deleteGoods.bind(this);
        this.removeAll = this.removeAll.bind(this);
        this.removeChecked = this.removeChecked.bind(this);
        this.setGoodsCount = this.setGoodsCount.bind(this);
    }

    updateCount(goodsArray) {
        let count = 0;
        goodsArray.forEach(goods => {
            if (goods.checked) {
                ++count;
            }
        });
        return count;
    }

    updatePrice(goodsArray) {
        let price = 0;
        goodsArray.forEach(goods => {
            if (goods.checked) {
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

    removeAll() {
        let arr = [];
        this.setState((preState) => {
            let len = preState.goodsArray.length;
<<<<<<< HEAD
            for (let i = 0; i < len; ++i) {
                arr.fill(preState.goodsArray[i].id);
            }
            $.post("/bookstoreApp/deleteShopCartItem", {cartItemArr: arr}, function (data) {
                if (JSON.parse(data)) {
                    for (let j = 0; j < len; ++j) {
                        preState.goodsArray.splice(j, 1);
                    }
                }
            });
            return {
=======
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
>>>>>>> origin/htm-day6
                goodsArray: preState.goodsArray,
                selectedCount: this.updateCount(preState.goodsArray),
                totalPrice: this.updatePrice(preState.goodsArray),
                isSelectAll: false
            }
        })
    }

    removeChecked() {
        let arr = [];
        this.setState((preState) => {
            for (let i = 0; i < preState.goodsArray.length; ++i) {
                if(preState.goodsArray[i].checked){
                    arr.push(preState.goodsArray[i].id);
                    preState.goodsArray.splice(i,1);
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
                selectedCount:this.updateCount(preState.goodsArray),
                totalPrice: this.updatePrice(preState.goodsArray),
                isSelectAll: false
            }
            });
    }

    deleteGoods(id) {
<<<<<<< HEAD
            $.post("/bookstoreApp/deleteShopCartItem", {cartItemId: id}, function (data) {
                if (!JSON.parse(data)) {
                    message.error("删除票品失败!")
                }
            });
    }

    setGoodsCount(id, count) {
        $.post("/bookstoreApp/updateCount", {cartItemId: id, count: count}, function (data) {
            if (!JSON.parse(data)) {
                message.error("设置票品数量失败!")
=======
        let arr = [];
        this.setState((preState) => {
            for (let i = 0; i < preState.goodsArray.length; ++i) {
                if (id.toString() === preState.goodsArray[i].id.toString()) {
                    /*preState.goodsArray.splice(i, 1);
                    break;*/
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
                selectedCount: this.updateCount(preState.goodsArray),
                totalPrice: this.updatePrice(preState.goodsArray),
                isSelectAll: ShopCart.updateSelectAllFlag(preState.goodsArray)
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
                selectedCount: this.updateCount(preState.goodsArray),
                totalPrice: this.updatePrice(preState.goodsArray),
                isSelectAll: ShopCart.updateSelectAllFlag(preState.goodsArray)
>>>>>>> origin/htm-day6
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
                selectedCount: this.updateCount(preState.goodsArray),
                totalPrice: this.updatePrice(preState.goodsArray),
                isSelectAll: ShopCart.updateSelectAllFlag(preState.goodsArray)
            }
        });
    }

    changeSelectAllFlag(event) {
        let arr = [];
        if (event.currentTarget.checked) {
            this.setState((preState) => {
                preState.goodsArray.forEach(goods => {
                    if(!goods.checked){
                        arr.push(goods.id);
                    }
                    goods.checked = true;
<<<<<<< HEAD
=======
                });
                preState.goodsArray.forEach(goods => {
                    if (goods.checked) {
                        ++count;
                        price += goods.price * goods.count;
                    }
>>>>>>> origin/htm-day6
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
                    selectedCount: this.updateCount(preState.goodsArray),
                    totalPrice: this.updatePrice(preState.goodsArray),
                    isSelectAll: true
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
                    selectedCount: 0,
                    totalPrice: 0,
                    isSelectAll: false
                }
            });
        }
    }

    render() {
        let userName = this.props.name;
        let result = [];
        $.post("/bookstoreApp/getShopCartList", {userName: userName}, function (data) {
            result = JSON.parse(data);
            this.setState({
                goodsArray: result,
                selectedCount: this.updateCount(result),
                totalPrice: this.updatePrice(result),
                isSelectAll: ShopCart.updateSelectAllFlag(result)
            })
        }.bind(this));
        return (
            <div className="form-horizontal">
                <div className="form-group">
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <Button type="primary" icon="shopping-cart">我的购物车</Button>
                        </Col>
                        <Col className="gutter-row" span={4}>
                            <Button type="default">已选中：{this.state.selectedCount} 种票品</Button>
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
                <div className="form-group">
                    <GoodsTable setGoodsCount={this.setGoodsCount} changeGoodsCheckFlag={this.changeGoodsCheckFlag}
                                deleteGoods={this.deleteGoods} goodsList={this.state.goodsArray}
                                thead={
                                    <tr>
                                        <td>
                                            <span>全选</span>
                                            <input type="checkbox" checked={this.state.isSelectAll}
                                                   onChange={this.changeSelectAllFlag}/>
                                        </td>
                                        <td>商品名称</td>
                                        <td>单价</td>
                                        <td>数量</td>
                                        <td>总价</td>
                                        <td>操作</td>
                                    </tr>
                                }
                    />
                </div>
            </div>
        );
    }
}
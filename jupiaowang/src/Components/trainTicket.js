import React from 'react';
import {
    Form,
    Input,
    Button,
    DatePicker,
    Divider,
    Checkbox,
    Dropdown,
    Icon,
    Menu,
    Tag,
    Table,
    Popconfirm,
    message,
    Tooltip
} from 'antd';
import moment from 'moment';
import $ from "jquery";


class trainTicket extends React.Component {
    state = {
        plainCheckedList: [],
        startTimeCheckedList: [false, false, false, false],
        arriveTimeCheckedList: [false, false, false, false],
        starting: "上海",
        destination: "北京",
        date: moment(),
        dataSource:[],
        dataSource_copy:[],
        startTimeVisible: false,
        arriveTimeVisible: false,
        sortedInfo: null,
    };

    componentDidMount() {
        $.ajax({
            type: "post",
            url: "/bookstoreApp/searchTrain",
            data: {
                startPlace: this.state.starting,
                arrivePlace: this.state.destination,
                startTime: this.state.date.format('YYYY-MM-DD')
            },
            async: true,
            success: function (data) {
                this.setState({
                    dataSource: JSON.parse(data),
                    dataSource_copy:JSON.parse(data)
                })
            }.bind(this)
        });
    }

    handleSubmit = (e) => {
        let starting = this.props.form.getFieldValue('starting');
        let destination = this.props.form.getFieldValue('destination');
        let date = this.props.form.getFieldValue('date');
        $.ajax({
            type: "post",
            url: "/bookstoreApp/searchTrain",
            data: {startPlace: starting, arrivePlace: destination, startTime: date.format('YYYY-MM-DD')},
            async: true,
            success: function (data) {
                this.setState({
                    dataSource: JSON.parse(data),
                    dataSource_copy:JSON.parse(data)
                })
            }.bind(this)
        });
        this.setState({
            plainCheckedList: [],
            startTimeCheckedList: [false, false, false, false],
            arriveTimeCheckedList: [false, false, false, false],
            starting: starting,
            destination: destination,
            date: date
        });
    };

    hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    };

    disabledDate = (current) => {
        // Can not select days before today and today
        return current < moment().startOf('day');
    };

    getWeek = (date) => {
        let number = date._d.getDay();
        let result;
        switch (number) {
            case 0:
                result = '星期日';
                break;
            case 1:
                result = '星期一';
                break;
            case 2:
                result = '星期二';
                break;
            case 3:
                result = '星期三';
                break;
            case 4:
                result = '星期四';
                break;
            case 5:
                result = '星期五';
                break;
            case 6:
                result = '星期六';
                break;
            default:
                break;
        }
        return result;
    };

    changePosition = () => {
        let starting = this.props.form.getFieldValue('starting');
        let destination = this.props.form.getFieldValue('destination');
        this.props.form.setFieldsValue({'destination': starting});
        this.props.form.setFieldsValue({'starting': destination});
    };

    testModel = (model,plainCheckedList) => {
        if (plainCheckedList.length === 0) {
            return true
        }
        let type;
        switch (model[0]) {
            case 'C':case 'G':
                type = "高铁G/C";
                break;
            case 'D':
                type = "动车D";
                break;
            case 'T':
                type = "特快T";
                break;
            case 'K':
                type = "快速K";
                break;
            case 'Z':
                type = "直达Z";
                break;
            default:
                type = "其他";
                break;
        }
        return plainCheckedList.indexOf(type) > -1;
    };

    testStartTime = (startTime,startTimeCheckedList) => {
        let date = moment(startTime,"HH:mm");
        if (startTimeCheckedList.indexOf(true) === -1) {
            return true
        }
        return startTimeCheckedList[Math.floor(date._d.getHours() / 6)];
    };

    testArriveTime = (arriveTime,arriveTimeVisible) => {
        let date = moment(arriveTime,"HH:mm");
        if (arriveTimeVisible.indexOf(true) === -1) {
            return true
        }
        return arriveTimeVisible[Math.floor(date._d.getHours() / 6)];
    };

    onPlainChange = (plainCheckedList) => {
        let date=[];
        this.state.dataSource_copy.forEach((ticket) => {
            if(this.testModel(ticket.model,plainCheckedList) && this.testStartTime(ticket.start,this.state.startTimeCheckedList) && this.testArriveTime(ticket.arrive,this.state.arriveTimeCheckedList)){
                date.push(ticket);
            }
        });
        this.setState({
            plainCheckedList,
            dataSource:date
        });
    };

    onStartTimeChange = (e) => {
        let date=[];
        let index = e.target.index;
        let startTimeCheckedList = this.state.startTimeCheckedList;
        startTimeCheckedList[index] = !startTimeCheckedList[index];
        this.state.dataSource_copy.forEach((ticket) => {
            if(this.testModel(ticket.model,this.state.plainCheckedList) && this.testStartTime(ticket.start,startTimeCheckedList) && this.testArriveTime(ticket.arrive,this.state.arriveTimeCheckedList)){
                date.push(ticket);
            }
        });
        this.setState({
            startTimeCheckedList: startTimeCheckedList,
            dataSource:date
        });
    };

    onArriveTimeChange = (e) => {
        let date=[];
        let index = e.target.index;
        let arriveTimeCheckedList = this.state.arriveTimeCheckedList;
        arriveTimeCheckedList[index] = !arriveTimeCheckedList[index];
        this.state.dataSource_copy.forEach((ticket) => {
            if(this.testModel(ticket.model,this.state.plainCheckedList) && this.testStartTime(ticket.start,this.state.startTimeCheckedList) && this.testArriveTime(ticket.arrive,arriveTimeCheckedList)){
                date.push(ticket);
            }
        });
        this.setState({
            arriveTimeCheckedList: arriveTimeCheckedList,
            dataSource:date
        });
    };

    handleStartTimeVisibleChange = (flag) => {
        this.setState({startTimeVisible: flag});
    };

    handleArriveTimeVisibleChange = (flag) => {
        this.setState({arriveTimeVisible: flag});
    };

    handleStartClose = (index) => {
        let date=[];
        let startTimeCheckedList = this.state.startTimeCheckedList;
        startTimeCheckedList[index] = !startTimeCheckedList[index];
        this.state.dataSource_copy.forEach((ticket) => {
            if(this.testModel(ticket.model,this.state.plainCheckedList) && this.testStartTime(ticket.start,startTimeCheckedList) && this.testArriveTime(ticket.arrive,this.state.arriveTimeCheckedList)){
                date.push(ticket);
            }
        });
        this.setState({
            startTimeCheckedList: startTimeCheckedList,
            dataSource:date
        })
    };

    handleArriveClose = (index) => {
        let date=[];
        let arriveTimeCheckedList = this.state.arriveTimeCheckedList;
        arriveTimeCheckedList[index] = !arriveTimeCheckedList[index];
        this.state.dataSource_copy.forEach((ticket) => {
            if(this.testModel(ticket.model,this.state.plainCheckedList) && this.testStartTime(ticket.start,this.state.startTimeCheckedList) && this.testArriveTime(ticket.arrive,arriveTimeCheckedList)){
                date.push(ticket);
            }
        });
        this.setState({
            arriveTimeCheckedList: arriveTimeCheckedList,
            dataSource:date
        })
    };

    handleSort = (pagination, filters, sorter) => {
        this.setState({
            sortedInfo: sorter,
        });
    };

    isDisplay = () => {
        if (this.state.startTimeCheckedList.indexOf(true) > -1 || this.state.arriveTimeCheckedList.indexOf(true) > -1) {
            return "";
        }
        return "none";
    };

    BuyTicket = (record) => {
        let userName = this.props.match.params.userName;
        let ticketName = record.model + this.state.starting + "To" + this.state.destination;
        $.ajax({
            url: "bookstoreApp/trainTicketAddToShopCart",
            data: {shopCartId:record.id,userName:userName,ticketName:ticketName,price:record.price,leftTicket:record.left},
            type: "POST",
            traditional: true,
            success: function (data) {
                    message.success("加入购物车成功!");
                   this.props.history.push('/home/'+ userName + '/shoppingCart')
            }.bind(this)
        });
    };

    QuickBuy = (record) => {
        let userName = this.props.match.params.userName;
        let ticketName = record.model + this.state.starting + "To" + this.state.destination;
        $.ajax({
            url: "bookstoreApp/trainTicketQuickBuy",
            data: {shopCartId:record.id,userName:userName,ticketName:ticketName,price:record.price,leftTicket:record.left,date:moment().format('YYYY-MM-DD HH:mm:ss')},
            type: "POST",
            traditional: true,
            success: function (data) {
                message.success("一键下单成功,已生成未处理订单");
                this.props.history.push('/home/'+ userName + '/orderToBeResolved')
            }.bind(this)
        });
    };

    showTotal = (total) => {
        return `共搜索到${total}件火车票`;
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || {};
        const plainOptions = ['高铁G/C', '动车D', '特快T', '快速K', '直达Z', '其他'];
        const timeOptions = ['凌晨（0:00 - 6:00）', '上午（6:00 - 12:00）', '下午（12:00 - 18:00）', '晚上（18:00 - 24:00）'];
        const columns = [{
            title: '车次/车型',
            dataIndex: 'model'
        }, {
            title: '出发',
            dataIndex: 'start',
            sorter: (a, b) => moment(a.start,"HH:mm")._d.valueOf() - moment(b.start,"HH:mm")._d.valueOf(),
            sortOrder: sortedInfo.columnKey === 'start' && sortedInfo.order,
        }, {
            title: '耗时',
            dataIndex: 'time',
            sorter: (a, b) => a.time - b.time,
            sortOrder: sortedInfo.columnKey === 'time' && sortedInfo.order,
            render: (text, record) => {
                return <a style={{color: "black"}}>{Math.floor(record.time / 60)}时{record.time % 60}分 </a>
            }
        }, {
            title: '到达',
            dataIndex: 'arrive',
            sorter: (a, b) => moment(a.arrive,"HH:mm")._d.valueOf() - moment(b.arrive,"HH:mm")._d.valueOf(),
            sortOrder: sortedInfo.columnKey === 'arrive' && sortedInfo.order,
        },  {
            title: '剩余票数',
            dataIndex: 'left',
            sorter: (a, b) => a.left - b.left,
            sortOrder: sortedInfo.columnKey === 'left' && sortedInfo.order,
            render: (text, record) => {
                if (record.left === 0) {
                    return <div>
                        <span style={{color: "#96a6b1"}}>0</span>
                    </div>
                }
                else if (record.left < 10) {
                    return <div>
                        <span style={{color: "#ff5741"}}>{record.left}</span>
                        <span className="leftTicket-ico">&nbsp;</span>
                    </div>
                }
                else {
                    return <div>
                        <span>{record.left}</span>
                    </div>
                }
            }
        }, {
            title: '参考价',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
            render: (text, record) => {
                return <a style={{color: "black"}}>¥{record.price} </a>
            }
        }, {
            title: '操作',
            dataIndex: '',
            render: (text, record) => {
                if (record.left === 0) {
                    return <div>
                                <span style={{marginLeft: '5px'}}><Icon type="shopping-cart"/></span>
                                <span style={{marginLeft: '5px'}}><Icon type="rocket"/></span>
                    </div>
                }
                else{
                    return <div>
                        <Tooltip placement="topLeft" title="加入购物车" arrowPointAtCenter>
                            <Popconfirm placement="topRight" title="您确定将这件票品加入您的购物车么?" onConfirm={() => this.BuyTicket(record)}>
                                <a style={{marginLeft: '5px'}}><Icon type="shopping-cart"/></a>
                            </Popconfirm>
                        </Tooltip>
                        <Tooltip placement="topLeft" title="一键下单" arrowPointAtCenter>
                            <Popconfirm placement="topRight" title="您确定要一键下单购买这件票品么?" onConfirm={() => this.QuickBuy(record)}>
                                <a style={{marginLeft: '5px'}}><Icon type="rocket"/></a>
                            </Popconfirm>
                        </Tooltip>
                    </div>
                }
            }
        }];
        const startMenu = (
            <Menu>
                <Menu.Item><Checkbox index={0} checked={this.state.startTimeCheckedList[0]}
                                     onChange={this.onStartTimeChange}>{timeOptions[0]}</Checkbox></Menu.Item>
                <Menu.Item><Checkbox index={1} checked={this.state.startTimeCheckedList[1]}
                                     onChange={this.onStartTimeChange}>{timeOptions[1]}</Checkbox></Menu.Item>
                <Menu.Item><Checkbox index={2} checked={this.state.startTimeCheckedList[2]}
                                     onChange={this.onStartTimeChange}>{timeOptions[2]}</Checkbox></Menu.Item>
                <Menu.Item><Checkbox index={3} checked={this.state.startTimeCheckedList[3]}
                                     onChange={this.onStartTimeChange}>{timeOptions[3]}</Checkbox></Menu.Item>
            </Menu>
        );
        const arriveMenu = (
            <Menu>
                <Menu.Item><Checkbox index={0} checked={this.state.arriveTimeCheckedList[0]}
                                     onChange={this.onArriveTimeChange}>{timeOptions[0]}</Checkbox></Menu.Item>
                <Menu.Item><Checkbox index={1} checked={this.state.arriveTimeCheckedList[1]}
                                     onChange={this.onArriveTimeChange}>{timeOptions[1]}</Checkbox></Menu.Item>
                <Menu.Item><Checkbox index={2} checked={this.state.arriveTimeCheckedList[2]}
                                     onChange={this.onArriveTimeChange}>{timeOptions[2]}</Checkbox></Menu.Item>
                <Menu.Item><Checkbox index={3} checked={this.state.arriveTimeCheckedList[3]}
                                     onChange={this.onArriveTimeChange}>{timeOptions[3]}</Checkbox></Menu.Item>
            </Menu>
        );
        return (
            <div style={{fontWeight: "bold"}}>
                <Form layout="inline">
                    <Form.Item
                        label="出发站"
                    >
                        {getFieldDecorator('starting', {
                            initialValue: '上海'
                        })(
                            <Input placeholder="城市名"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <a className="switch-ico" title="互换出发到达城市" onClick={this.changePosition}>&nbsp;</a>
                    </Form.Item>
                    <Form.Item
                        label="到达站"
                    >
                        {getFieldDecorator('destination', {
                            initialValue: '北京'
                        })(
                            <Input placeholder="城市名"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="出发日期"
                    >
                        {getFieldDecorator('date', {
                            initialValue: moment()
                        })(
                            <DatePicker disabledDate={this.disabledDate} allowClear={false}/>
                        )}
                        <span className="calendar-text">{this.getWeek(this.props.form.getFieldValue('date'))}</span>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            onClick={this.handleSubmit}
                            style={{fontWeight: "bold"}}
                        >
                            查询列车
                        </Button>
                    </Form.Item>
                </Form>
                <Divider orientation="left" style={{fontWeight: "bold"}}>选择</Divider>
                <h3 style={{fontWeight: "bold", marginBottom: "20px"}}>
                    <span> {this.state.starting} <em className="arrow-ico">&nbsp;</em> {this.state.destination}</span>
                    <span>（{this.state.date._d.getMonth() + 1}月{this.state.date._d.getDate()}日 {this.getWeek(this.state.date)})</span>
                </h3>
                <Checkbox.Group options={plainOptions} value={this.state.plainCheckedList}
                                onChange={this.onPlainChange}/>
                <Divider orientation="left" style={{fontWeight: "bold"}}>筛选</Divider>
                <Dropdown overlay={startMenu}
                          onVisibleChange={this.handleStartTimeVisibleChange}
                          visible={this.state.startTimeVisible}
                >

                    <Button type="primary" style={{fontWeight: "bold"}}>
                        出发时段 <Icon type="down"/>
                    </Button>
                </Dropdown>
                <Dropdown overlay={arriveMenu}
                          onVisibleChange={this.handleArriveTimeVisibleChange}
                          visible={this.state.arriveTimeVisible}
                >
                    <Button type="primary" style={{fontWeight: "bold", marginLeft: "10px"}}>
                        到达时段 <Icon type="down"/>
                    </Button>
                </Dropdown>
                <Divider orientation="left" style={{fontWeight: "bold", display: this.isDisplay()}}>已选</Divider>
                <div>{this.state.startTimeCheckedList.map((tag, index) => {
                    if (tag === true) {
                        return (
                            <Tag key={index} closable afterClose={() => this.handleStartClose(index)} color="#108ee9">
                                出发于{timeOptions[index]}
                            </Tag>);
                    }
                    else {
                        return null
                    }
                })}
                    {this.state.arriveTimeCheckedList.map((tag, index) => {
                        if (tag === true) {
                            return (
                                <Tag key={index} closable afterClose={() => this.handleArriveClose(index)}
                                     color="#108ee9">
                                    到达于{timeOptions[index]}
                                </Tag>);
                        }
                        else {
                            return null
                        }
                    })}
                </div>
                <Table rowKey={"id"}
                       style={{marginTop: "20px"}}
                       dataSource={this.state.dataSource}
                       columns={columns}
                       onChange={this.handleSort}
                       pagination={{
                           defaultPageSize:8,
                           pageSizeOptions:['8','16','24'],
                           showSizeChanger: true,
                           showQuickJumper: true,
                           showTotal: this.showTotal,
                           total: this.state.dataSource.length
                       }}
                />
            </div>
        );
    }
}

const trainTicketForm = Form.create()(trainTicket);

export default trainTicketForm;
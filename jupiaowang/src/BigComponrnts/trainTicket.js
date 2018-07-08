import React from 'react';
import {Form, Input, Button, DatePicker, Divider, Checkbox, Dropdown, Icon, Menu, Tag} from 'antd';
import moment from 'moment';


class trainTicket extends React.Component {
    state = {
        plainCheckedList: [],
        startTimeCheckedList: [false, true, false, false],
        arriveTimeCheckedList: [false, false, true, false],
        starting: "上海",
        destination: "北京",
        date: moment(),
        startTimeVisible: false,
        arriveTimeVisible: false
    };

    handleSubmit = (e) => {
        let starting = this.props.form.getFieldValue('starting');
        let destination = this.props.form.getFieldValue('destination');
        let date = this.props.form.getFieldValue('date');
        this.setState({
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

    onPlainChange = (plainCheckedList) => {
        this.setState({
            plainCheckedList,
        });
    };

    onStartTimeChange = (e) => {
        let index = e.target.index;
        let startTimeCheckedList = this.state.startTimeCheckedList;
        startTimeCheckedList[index] = !startTimeCheckedList[index];
        this.setState({
            startTimeCheckedList: startTimeCheckedList
        });
    };

    onArriveTimeChange = (e) => {
        let index = e.target.index;
        let arriveTimeCheckedList = this.state.arriveTimeCheckedList;
        arriveTimeCheckedList[index] = !arriveTimeCheckedList[index];
        this.setState({
            arriveTimeCheckedList: arriveTimeCheckedList
        });
    };

    handleStartTimeVisibleChange = (flag) => {
        this.setState({startTimeVisible: flag});
    };

    handleArriveTimeVisibleChange = (flag) => {
        this.setState({arriveTimeVisible: flag});
    };

    handleStartClose = (index) => {
        let startTimeCheckedList = this.state.startTimeCheckedList;
        startTimeCheckedList[index] = !startTimeCheckedList[index];
        this.setState({
            startTimeCheckedList: startTimeCheckedList
        })
    };

    handleArriveClose = (index) => {
        let arriveTimeCheckedList = this.state.arriveTimeCheckedList;
        arriveTimeCheckedList[index] = !arriveTimeCheckedList[index];
        this.setState({
            arriveTimeCheckedList: arriveTimeCheckedList
        })
    };

    isDisplay = () => {
        if (this.state.startTimeCheckedList.indexOf(true) > -1 || this.state.arriveTimeCheckedList.indexOf(true) > -1){
            return "";
        }
        return "none";
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const plainOptions = ['高铁G/C', '动车D', '特快T', '快速K', '直达Z', '其他'];
        const timeOptions = ['凌晨（0:00 - 6:00）', '上午（6:00 - 12:00）', '下午（12:00 - 18:00）', '晚上（18:00 - 24:00）'];
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
            // eslint-disable-next-line
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
                            <DatePicker disabledDate={this.disabledDate}/>
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
                    <Button type="primary" style={{fontWeight: "bold",marginLeft:"10px"}}>
                        出发时段 <Icon type="down"/>
                    </Button>
                </Dropdown>
                <Divider orientation="left" style={{fontWeight: "bold",display:this.isDisplay()}} >已选</Divider>
                <div>{this.state.startTimeCheckedList.map((tag, index) => {
                    if (tag === true) {
                        return (<Tag key={index} closable afterClose={() => this.handleStartClose(index)} color="#108ee9">
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
                                <Tag key={index} closable afterClose={() => this.handleArriveClose(index)} color="#108ee9">
                                    到达于{timeOptions[index]}
                                </Tag>);
                        }
                        else {
                            return null
                        }
                    })}
                </div>
            </div>
        );
    }
}

const trainTicketForm = Form.create()(trainTicket);

export default trainTicketForm;
import React from 'react';
import {Form, Input, Button, DatePicker, Divider, Checkbox } from 'antd';
import moment from 'moment';


class trainTicket extends React.Component {
    state = {
        checkedList: [],
        starting:"上海",
        destination:"北京",
        date:moment()
    };

    handleSubmit = (e) => {
        let starting = this.props.form.getFieldValue('starting');
        let destination = this.props.form.getFieldValue('destination');
        let date = this.props.form.getFieldValue('date');
        this.setState({
            starting:starting,
            destination:destination,
            date:date
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

    onChange = (checkedList) => {
        this.setState({
            checkedList,
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const plainOptions = ['高铁G/C', '动车D', '特快T','快速K', '直达Z', '其他'];
        return (
            // eslint-disable-next-line
            <div style={{fontWeight:"bold"}}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
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
                            htmlType="submit"
                        >
                            查询列车
                        </Button>
                    </Form.Item>
                </Form>
                <Divider orientation="left" style={{fontWeight:"bold"}}>选择</Divider>
                <h3 style={{fontWeight:"bold",marginBottom:"20px"}}>
                    <span> {this.state.starting} <em className="arrow-ico">&nbsp;</em> {this.state.destination}</span>
                    <span>（{this.state.date._d.getMonth() + 1}月{this.state.date._d.getDate()}日 {this.getWeek(this.state.date)})</span>
                </h3>
                <Checkbox.Group options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
                <Divider orientation="left" style={{fontWeight:"bold"}}>筛选</Divider>
            </div>
        );
    }
}

const trainTicketForm = Form.create()(trainTicket);

export default trainTicketForm;
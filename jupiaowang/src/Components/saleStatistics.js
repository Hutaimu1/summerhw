import React from 'react';
import {
    Form,
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
    Tooltip,
    Select,
    Popover,
    Radio,
    InputNumber,
    Input
} from 'antd';
import moment from 'moment';
import $ from "jquery";

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const columns = [{
    title: '时间',
    dataIndex: 'time',
    key: 'time',
}, {
    title: '销售额',
    dataIndex: 'sales',
    key: 'sales',
}, {
    title: '变化情况',
    dataIndex: 'change',
    key: 'change',
    render: (text, record) => {
        if (record.lastSales === 0) {
            return <div>
                <span>-</span>
            </div>
        }
        else if (record.sales === 0) {
            return <div>
                <span>-</span>
            </div>
        }
        else if (record.lastSales > record.sales) {
            return <div>
                <span style={{color: "#66CD00"}}>-{record.lastSales*100/record.sales - 100}%</span>
            </div>
        }
        else if (record.sales > record.lastSales) {
            return <div>
                <span style={{color: "#ff5741"}}>+ {record.sales*100/record.lastSales - 100}%</span>
            </div>
        }
        else {
            return <div>
                <span>0</span>
            </div>
        }
    }
}];

const data = [];


class saleStatistics extends React.Component {
    state = {
        data:data
    };

    onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    disabledDate =(current) =>{
        if(this.props.form.getFieldValue('starting1') === undefined || this.props.form.getFieldValue("starting1") === null){
            return current < moment('2999-12-31');
        }
        return current < this.props.form.getFieldValue('starting1');
    };

    monthlyReporting = () => {
        let startingYear = this.props.form.getFieldValue('starting1')._d.getFullYear();
        let startingMonth = this.props.form.getFieldValue('starting1')._d.getMonth() + 1;
        let endYear = this.props.form.getFieldValue('destination1')._d.getFullYear();
        let endMonth = this.props.form.getFieldValue('destination1')._d.getMonth() + 1;
        $.ajax({
            type: "post",
            url: "/bookstoreApp/saleReporting",
            data: {startingYear: startingYear, startingMonth: startingMonth, endYear: endYear, endMonth:endMonth},
            async: true,
            success: function (data) {
                this.setState({
                    data: JSON.parse(data),
                });
                data = JSON.parse(data);
            }.bind(this)
        });
    };

    render() {
        const {getFieldDecorator, getFieldsError} = this.props.form;
        return (
            <div style={{fontWeight: "bold"}}>
                <Divider orientation="left" style={{fontWeight: "bold"}}>月报</Divider>
                <Form layout="inline">
                    <Form.Item
                        label="起始时间"
                    >
                        {getFieldDecorator('starting1')(
                            <MonthPicker onChange={this.onChange} placeholder="选择起始月份" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="结束时间"
                    >
                        {getFieldDecorator('destination1')(
                            <MonthPicker onChange={this.onChange} disabledDate={this.disabledDate} placeholder="选择结束月份" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            onClick={this.monthlyReporting}
                            style={{fontWeight: "bold"}}
                        >
                            生成报表
                        </Button>
                    </Form.Item>
                </Form>
                <Divider orientation="left" style={{fontWeight: "bold"}}>报表统计</Divider>
                <Table dataSource={this.state.data} columns={columns} />
            </div>
        );
    }
}

const saleStatisticsForm = Form.create()(saleStatistics);

export default saleStatisticsForm;
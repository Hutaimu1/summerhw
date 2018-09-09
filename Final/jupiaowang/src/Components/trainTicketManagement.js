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

const {Option, OptGroup} = Select;
const cityData = [
    ["A", ["安庆", "安阳", "鞍山", "安康", "安顺", "阿勒泰", "阿克苏", "阿坝"]],
    ["B", ["北京", "保定", "宝鸡", "包头", "滨州", "蚌埠", "亳州", "毕节", "本溪", "北海", "巴彦淖尔", "白银", "保山", "百色", "白山", "巴中", "巴音郭楞", "白城", "保亭"]],
    ["C", ["重庆", "成都", "长沙", "长春", "常州", "郴州", "常德", "滁州", "沧州", "长治", "赤峰", "承德", "朝阳", "潮州", "昌吉", "池州", "崇左", "楚雄", "常熟", "澄迈", "昌江"]],
    ["D", ["东莞", "大连", "大庆", "东营", "德阳", "德州", "大同", "达州", "丹东", "大理", "定西", "德宏", "儋州", "东方", "大兴安岭", "迪庆"]],
    ["E", ["恩施", "鄂尔多斯", "鄂州"]],
    ["F", ["佛山", "福州", "抚州", "阜阳", "抚顺", "防城港", "阜新"]],
    ["G", ["广州", "赣州", "贵阳", "桂林", "广元", "广安", "甘南", "固原", "贵港", "甘孜"]],
    ["H", ["杭州", "哈尔滨", "惠州", "邯郸", "湖州", "海口", "淮安", "呼和浩特", "衡阳", "黄冈", "河源", "菏泽", "呼伦贝尔", "淮南", "黄石", "怀化", "黄山", "红河", "衡水", "葫芦岛", "汉中", "黑河", "淮北", "鹤壁", "河池", "贺州", "鹤岗", "海东", "海西", "哈密", "合肥", "海南"]],
    ["J", ["金华", "济南", "嘉兴", "江门", "九江", "济宁", "荆州", "吉安", "吉林", "晋中", "荆门", "揭阳", "焦作", "晋城", "酒泉", "锦州", "景德镇", "佳木斯", "济源", "金昌", "鸡西", "嘉峪关"]],
    ["K", ["昆明", "开封", "克拉玛依", "喀什", "昆山", "开平"]],
    ["L", ["临沂", "兰州", "洛阳", "临汾", "廊坊", "丽水", "六安", "娄底", "聊城", "连云港", "柳州", "吕梁", "漯河", "乐山", "龙岩", "临夏", "泸州", "辽阳", "六盘水", "陇南", "辽源", "丽江", "凉山", "来宾", "拉萨", "临沧", "莱芜", "乐东"]],
    ["M", ["绵阳", "梅州", "马鞍山", "茂名", "眉山", "牡丹江"]],
    ["N", ["南京", "宁波", "南通", "南昌", "南宁", "南充", "南阳", "宁德", "南平", "内江", "怒江"]],
    ["P", ["平顶山", "莆田", "盘锦", "萍乡", "平凉", "普洱", "濮阳", "攀枝花"]],
    ["Q", ["青岛", "泉州", "衢州", "曲靖", "黔南", "清远", "黔东南", "黔西南", "秦皇岛", "齐齐哈尔", "庆阳", "钦州", "潜江", "七台河", "琼海"]],
    ["R", ["日照"]],
    ["S", ["上海", "深圳", "苏州", "石家庄", "沈阳", "上饶", "绍兴", "商丘", "汕头", "宿迁", "三明", "韶关", "邵阳", "三亚", "绥化", "十堰", "四平", "汕尾", "遂宁", "宿州", "松原", "商洛", "随州", "石嘴山", "三门峡", "朔州", "双鸭山", "石河子"]],
    ["T", ["天津", "台州", "泰州", "唐山", "太原", "泰安", "通辽", "铁岭", "通化", "铜仁", "天水", "铜陵", "铜川", "塔城", "天门", "屯昌"]],
    ["W", ["武汉", "温州", "无锡", "潍坊", "芜湖", "乌鲁木齐", "威海", "渭南", "梧州", "乌兰察布", "乌海", "文山", "吴忠", "武威", "文昌", "万宁", "吴江区", "五指山"]],
    ["X", ["西安", "厦门", "徐州", "新乡", "襄阳", "信阳", "湘潭", "邢台", "宣城", "孝感", "许昌", "西宁", "咸宁", "咸阳", "湘西", "忻州", "新余", "仙桃", "兴安盟", "锡林郭勒", "西双版纳"]],
    ["Y", ["烟台", "盐城", "扬州", "宜春", "银川", "运城", "延边", "宜昌", "阳江", "营口", "宜宾", "永州", "榆林", "玉林", "益阳", "岳阳", "玉溪", "延安", "鹰潭", "伊犁", "阳泉", "云浮", "雅安", "伊春", "杨凌区"]],
    ["Z", ["郑州", "中山", "镇江", "珠海", "株洲", "湛江", "漳州", "淄博", "张家口", "肇庆", "枣庄", "遵义", "周口", "驻马店", "舟山", "自贡", "资阳", "张家界", "张掖", "中卫", "昭通"]]
];

let dataSource = [{
    "id": 3,
    "model": "G101",
    "start": "06:43",
    "time": 357,
    "arrive": "12:40",
    "left": 6,
    "price": 1748
}, {
    "id": 4,
    "model": "G5",
    "start": "07:00",
    "time": 280,
    "arrive": "11:40",
    "left": 6,
    "price": 1762
}, {
    "id": 5,
    "model": "1461",
    "start": "11:54",
    "time": 1165,
    "arrive": "07:19",
    "left": 50,
    "price": 156
}, {
    "id": 6,
    "model": "D313",
    "start": "19:34",
    "time": 727,
    "arrive": "07:41",
    "left": 13,
    "price": 780
}, {"id": 7, "model": "D321", "start": "21:04", "time": 725, "arrive": "09:09", "left": 9, "price": 780}]

const EditableContext = React.createContext();

const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber style={{width: "140px"}}/>;
        }
        else if (this.props.inputType === 'arrive') {
            return <Input style={{width: "140px"}} disabled={true}/>;
        }
        return <Input style={{width: "140px"}}/>;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const {getFieldDecorator} = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <Form.Item style={{margin: 0}}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </Form.Item>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class trainTicket extends React.Component {
    state = {
        plainCheckedList: [],
        startTimeCheckedList: [false, false, false, false],
        arriveTimeCheckedList: [false, false, false, false],
        selectedRowKeys: [],
        selectedRows: [],
        starting: "上海",
        destination: "北京",
        date: moment(),
        dataSource: [],
        startTimeVisible: false,
        arriveTimeVisible: false,
        sortedInfo: null,
        visible: false,
        typeValue: 1,
        editingKey: ''
    };

    componentDidMount() {
        this.props.form.validateFields();
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
                });
                dataSource = JSON.parse(data);
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
                });
                dataSource = JSON.parse(data);
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

    testModel = (model, plainCheckedList) => {
        if (plainCheckedList.length === 0) {
            return true
        }
        let type;
        switch (model[0]) {
            case 'C':
            case 'G':
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

    testStartTime = (startTime, startTimeCheckedList) => {
        let date = moment(startTime, "HH:mm");
        if (startTimeCheckedList.indexOf(true) === -1) {
            return true
        }
        return startTimeCheckedList[Math.floor(date._d.getHours() / 6)];
    };

    testArriveTime = (arriveTime, arriveTimeVisible) => {
        let date = moment(arriveTime, "HH:mm");
        if (arriveTimeVisible.indexOf(true) === -1) {
            return true
        }
        return arriveTimeVisible[Math.floor(date._d.getHours() / 6)];
    };

    onPlainChange = (plainCheckedList) => {
        let data = [];
        dataSource.forEach((ticket) => {
            if (this.testModel(ticket.model, plainCheckedList) && this.testStartTime(ticket.start, this.state.startTimeCheckedList) && this.testArriveTime(ticket.arrive, this.state.arriveTimeCheckedList)) {
                data.push(ticket);
            }
        });
        this.setState({
            plainCheckedList,
            dataSource: data
        });
    };

    onStartTimeChange = (e) => {
        let data = [];
        let index = e.target.index;
        let startTimeCheckedList = this.state.startTimeCheckedList;
        startTimeCheckedList[index] = !startTimeCheckedList[index];
        dataSource.forEach((ticket) => {
            if (this.testModel(ticket.model, this.state.plainCheckedList) && this.testStartTime(ticket.start, startTimeCheckedList) && this.testArriveTime(ticket.arrive, this.state.arriveTimeCheckedList)) {
                data.push(ticket);
            }
        });
        this.setState({
            startTimeCheckedList: startTimeCheckedList,
            dataSource: data
        });
    };

    onArriveTimeChange = (e) => {
        let data = [];
        let index = e.target.index;
        let arriveTimeCheckedList = this.state.arriveTimeCheckedList;
        arriveTimeCheckedList[index] = !arriveTimeCheckedList[index];
        dataSource.forEach((ticket) => {
            if (this.testModel(ticket.model, this.state.plainCheckedList) && this.testStartTime(ticket.start, this.state.startTimeCheckedList) && this.testArriveTime(ticket.arrive, arriveTimeCheckedList)) {
                data.push(ticket);
            }
        });
        this.setState({
            arriveTimeCheckedList: arriveTimeCheckedList,
            dataSource: data
        });
    };

    handleStartTimeVisibleChange = (flag) => {
        this.setState({startTimeVisible: flag});
    };

    handleArriveTimeVisibleChange = (flag) => {
        this.setState({arriveTimeVisible: flag});
    };

    handleStartClose = (index) => {
        let data = [];
        let startTimeCheckedList = this.state.startTimeCheckedList;
        startTimeCheckedList[index] = !startTimeCheckedList[index];
        dataSource.forEach((ticket) => {
            if (this.testModel(ticket.model, this.state.plainCheckedList) && this.testStartTime(ticket.start, startTimeCheckedList) && this.testArriveTime(ticket.arrive, this.state.arriveTimeCheckedList)) {
                data.push(ticket);
            }
        });
        this.setState({
            startTimeCheckedList: startTimeCheckedList,
            dataSource: data
        })
    };

    handleArriveClose = (index) => {
        let data = [];
        let arriveTimeCheckedList = this.state.arriveTimeCheckedList;
        arriveTimeCheckedList[index] = !arriveTimeCheckedList[index];
        dataSource.forEach((ticket) => {
            if (this.testModel(ticket.model, this.state.plainCheckedList) && this.testStartTime(ticket.start, this.state.startTimeCheckedList) && this.testArriveTime(ticket.arrive, arriveTimeCheckedList)) {
                data.push(ticket);
            }
        });
        this.setState({
            arriveTimeCheckedList: arriveTimeCheckedList,
            dataSource: data
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

    showTotal = (total) => {
        return `共搜索到${total}件火车票`;
    };

    onVisibleChange = (visible) => {
        this.setState({visible});
    };

    onTypeValueChange = (e) => {
        this.setState({
            typeValue: e.target.value,
        });
        this.props.form.setFieldsValue({"addType": e.target.value})
    };

    setHelp = (index) => {
        const {isFieldTouched, getFieldError} = this.props.form;
        return (isFieldTouched(index) && getFieldError(index)) || ''
    };

    setValidateStatus = (index) => {
        const {isFieldTouched, getFieldError} = this.props.form;
        if (isFieldTouched(index) && getFieldError(index)) {
            return 'error'
        }
        else if (!isFieldTouched(index)) {
            return ''
        }
        else {
            return 'success'
        }
    };

    checkDestination = (rule, value, callback) => {
        let addStarting = this.props.form.getFieldValue('addStarting');
        let addDestination = this.props.form.getFieldValue('addDestination');
        if (addStarting === addDestination) {
            callback("出发地与目的地不能相同!")
        }
        else (
            callback()
        )
    };

    addTrainTicket = () => {
        console.log(this.props.form.getFieldValue('addDate').format('YYYY-MM-DD HH:mm'));
        $.post("/bookstoreApp/addTrainTicket", {
            ticketName: this.state.typeValue + this.props.form.getFieldValue('addNumber'),
            startPlace: this.props.form.getFieldValue('addStarting'),
            arrivePlace: this.props.form.getFieldValue('addDestination'),
            startTime: this.props.form.getFieldValue('addDate').format('YYYY-MM-DD HH:mm:ss'),
            time: this.props.form.getFieldValue('addTime'),
            leftTicket: this.props.form.getFieldValue('addAmount'),
            price: this.props.form.getFieldValue('addPrice')
        }, function (data) {
            message.success('添加票品成功!');
            let addData = this.state.dataSource;
            addData.push(JSON.parse(data));
            if (this.state.starting === this.props.form.getFieldValue('addStarting') && this.state.destination === this.props.form.getFieldValue('addDestination')){
                dataSource.push(JSON.parse(data));
                this.setState({
                    dataSource: addData
                });
            }
            this.props.form.resetFields();
            this.props.form.validateFields();
        }.bind(this));
    };

    DeleteTrainTicket = (IdArray, recordArray) => {
        $.ajax({
            url: "bookstoreApp/deleteTrainTicket",
            data: {
                TrainTicketId: IdArray
            },
            type: "POST",
            traditional: true,
            success: function (data) {
                if (JSON.parse(data)) {
                    message.success("票品删除成功!");
                    let deleteData = this.state.dataSource;
                    recordArray.forEach((record) => {
                        deleteData.splice(deleteData.indexOf(record), 1);
                        dataSource.splice(dataSource.indexOf(record), 1);
                    });
                    this.setState({
                        dataSource: deleteData
                    });
                }
            }.bind(this)
        });
    };

    isEditing = (record) => {
        return record.id === this.state.editingKey;
    };

    edit(key) {
        this.setState({editingKey: key});
    }

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            console.log(row.start);
            $.ajax({
                url: "bookstoreApp/editTrainTicket",
                data: {
                    TrainTicketId: key,
                    ticketName: row.model,
                    startTime: this.state.date.format("YYYY-MM-DD") + " " + row.start + ":00",
                    time: row.time,
                    leftTicket: row.left,
                    price: row.price,
                },
                type: "POST",
                traditional: true,
                success: function (data) {
                    if (JSON.parse(data)) {
                        message.success("票品信息更改成功!");
                        const newData = [...this.state.dataSource];
                        const index = newData.findIndex(item => key === item.id);
                        newData.splice(index, 1, JSON.parse(data));
                        dataSource.splice(index, 1, JSON.parse(data));
                        this.setState({
                            dataSource: newData,
                            editingKey: ''
                        });

                    }
                }.bind(this)
            });
        });
    }

    cancel = () => {
        this.setState({editingKey: ''});
    };

    render() {
        const {getFieldDecorator, getFieldsError} = this.props.form;
        let {sortedInfo} = this.state;
        sortedInfo = sortedInfo || {};
        const plainOptions = ['高铁G/C', '动车D', '特快T', '快速K', '直达Z', '其他'];
        const timeOptions = ['凌晨（0:00 - 6:00）', '上午（6:00 - 12:00）', '下午（12:00 - 18:00）', '晚上（18:00 - 24:00）'];
        const columns = [{
            title: '车次/车型',
            dataIndex: 'model',
            editable: true,
            width: "15%"
        }, {
            title: '出发',
            dataIndex: 'start',
            sorter: (a, b) => moment(a.start, "HH:mm")._d.valueOf() - moment(b.start, "HH:mm")._d.valueOf(),
            sortOrder: sortedInfo.columnKey === 'start' && sortedInfo.order,
            editable: true,
            width: "15%"
        }, {
            title: '耗时',
            dataIndex: 'time',
            sorter: (a, b) => a.time - b.time,
            sortOrder: sortedInfo.columnKey === 'time' && sortedInfo.order,
            editable: true,
            width: "15%",
            render: (text, record) => {
                return <a style={{color: "black"}}>{Math.floor(record.time / 60)}时{record.time % 60}分 </a>
            }
        }, {
            title: '到达',
            dataIndex: 'arrive',
            sorter: (a, b) => moment(a.arrive, "HH:mm")._d.valueOf() - moment(b.arrive, "HH:mm")._d.valueOf(),
            sortOrder: sortedInfo.columnKey === 'arrive' && sortedInfo.order,
            editable: true,
            width: "15%",
        }, {
            title: '剩余票数',
            dataIndex: 'left',
            sorter: (a, b) => a.left - b.left,
            sortOrder: sortedInfo.columnKey === 'left' && sortedInfo.order,
            editable: true,
            width: "15%",
            render: (text, record) => {
                if (record.left === 0) {
                    return <div>
                        <span style={{color: "#96a6b1"}}>0</span>
                    </div>
                }
                else if (record.left < 10) {
                    return <div>
                        <span style={{color: "#ff5741"}}>{record.left}</span>
                        <span className="left-ticket-ico">&nbsp;</span>
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
            editable: true,
            width: "15%",
            render: (text, record) => {
                return <a style={{color: "black"}}>¥{record.price} </a>
            }
        }, {
            title: '操作',
            dataIndex: '',
            width: "10%",
            render: (text, record) => {
                const editable = this.isEditing(record);
                return <div>
                    {editable ? (
                        <span>
                  <EditableContext.Consumer>
                    {form => (
                        <Popconfirm title={<div style={{width: "150px"}}>确定保存修改?</div>}
                                    onConfirm={() => this.save(form, record.id)}>
                            <a style={{marginRight: 8}}><Icon type="check"/></a>
                        </Popconfirm>
                    )}
                  </EditableContext.Consumer>
                                <Popconfirm title={<div style={{width: "150px"}}>确定取消修改?</div>}
                                            onConfirm={() => this.cancel(record.id)}>
                                    <a style={{marginRight: 8}}><Icon type="close"/></a>
                                </Popconfirm>
                </span>
                    ) : (
                        <Tooltip placement="topLeft" title={<div style={{width: "56px"}}>编辑票品</div>} arrowPointAtCenter>
                            <Popconfirm placement="topRight" title={<div style={{width: "150px"}}>确定编辑此票品?</div>}
                                        onConfirm={() => this.edit(record.id)}>
                                <a style={{marginRight: 8}}><Icon type="edit"/></a>
                            </Popconfirm>
                        </Tooltip>
                    )}
                    <Tooltip placement="topLeft" title={<div style={{width: "56px"}}>删除票品</div>} arrowPointAtCenter>
                        <Popconfirm placement="topRight" title={<div style={{width: "150px"}}>确定删除此票品?</div>}
                                    onConfirm={() => this.DeleteTrainTicket([record.id], [record])}>
                            <a><Icon style={{color: "#ff5741"}} type="delete"/></a>
                        </Popconfirm>
                    </Tooltip>
                </div>

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
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys: selectedRowKeys,
                    selectedRows: selectedRows
                });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };

        const formItemLayout = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 16
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 16,
                offset: 8
            }
        };

        const addTicket = (
            <div className="add-form">
                <Form onSubmit={this.register} id="myForm">
                    <Form.Item
                        validateStatus={this.setValidateStatus("addStarting")}
                        help={this.setHelp("addStarting")}
                        {...formItemLayout}
                        label="出发地"
                    >
                        {getFieldDecorator('addStarting', {
                            rules: [{
                                required: true, message: '请输入出发地!'
                            }]
                        })(
                            <Select
                                getPopupContainer={triggerNode => triggerNode.parentNode}
                                showSearch
                                style={{width: 200}}
                                placeholder="城市名"
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {cityData.map(city => <OptGroup key={city[0]} label={city[0]}>
                                    {city[1].map(name => <Option key={name} value={name}>{name}</Option>)}
                                </OptGroup>)}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={this.setValidateStatus("addDestination")}
                        help={this.setHelp("addDestination")}
                        {...formItemLayout}
                        label="目的地"
                    >
                        {getFieldDecorator('addDestination', {
                            rules: [{required: true, message: '请输入目的地!'}, {
                                validator: this.checkDestination
                            }]
                        })(
                            <Select
                                getPopupContainer={triggerNode => triggerNode.parentNode}
                                showSearch
                                style={{width: 200}}
                                placeholder="城市名"
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {cityData.map(city => <OptGroup key={city[0]} label={city[0]}>
                                    {city[1].map(name => <Option key={name} value={name}>{name}</Option>)}
                                </OptGroup>)}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={this.setValidateStatus("addDate")}
                        help={this.setHelp("addDate")}
                        {...formItemLayout}
                        label="出发时间"
                    >
                        {getFieldDecorator('addDate', {
                            rules: [{required: true, message: '请输入出发时间!'}]
                        })(
                            <DatePicker
                                showTime
                                style={{width: 250}}
                                getCalendarContainer={triggerNode => triggerNode.parentNode}
                                disabledDate={this.disabledDate}
                                allowClear={false}
                                format="YYYY-MM-DD HH:mm:ss"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={this.setValidateStatus("addType")}
                        help={this.setHelp("addType")}
                        {...formItemLayout}
                        label="车次类型"
                    >
                        {getFieldDecorator('addType', {
                            rules: [{required: true, message: '请选择车次类型!'}]
                        })(
                            <Radio.Group onChange={this.onTypeValueChange}>
                                <Radio value={"G"}>高铁G</Radio>
                                <Radio value={"C"}>高铁C</Radio>
                                <Radio value={"D"}>动车D</Radio>
                                <Radio value={"T"}>特快T</Radio>
                                <Radio value={"K"}>快速K</Radio>
                                <Radio value={"Z"}>直达Z</Radio>
                                <Radio value={""}>其他</Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={this.setValidateStatus("addNumber")}
                        help={this.setHelp("addNumber")}
                        {...formItemLayout}
                        label="车次号"
                    >
                        {getFieldDecorator('addNumber', {
                            rules: [{required: true, message: '请输入车次号!'}]
                        })(
                            <InputNumber/>
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={this.setValidateStatus("addTime")}
                        help={this.setHelp("addTime")}
                        {...formItemLayout}
                        label="耗时(分钟)"
                    >
                        {getFieldDecorator('addTime', {
                            rules: [{required: true, message: '请输入耗时!'}]
                        })(
                            <InputNumber/>
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={this.setValidateStatus("addAmount")}
                        help={this.setHelp("addAmount")}
                        {...formItemLayout}
                        label="总票数"
                    >
                        {getFieldDecorator('addAmount', {
                            rules: [{required: true, message: '请输入总票数!'}]
                        })(
                            <InputNumber/>
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={this.setValidateStatus("addPrice")}
                        help={this.setHelp("addPrice")}
                        {...formItemLayout}
                        label="票价(￥)"
                    >
                        {getFieldDecorator('addPrice', {
                            rules: [{required: true, message: '请输入票价!'}]
                        })(
                            <InputNumber/>
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" disabled={this.hasErrors(getFieldsError())}
                                onClick={this.addTrainTicket}>新增票品</Button>
                    </Form.Item>
                </Form>
            </div>
        );

        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const editColumns = columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'left' || col.dataIndex === 'time' ? 'number' : col.dataIndex === 'arrive' ? "arrive" : "text",
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                    width: col.width
                }),
            };
        });


        return (
            <div style={{fontWeight: "bold"}}>
                <Form layout="inline">
                    <Form.Item
                        label="出发站"
                    >
                        {getFieldDecorator('starting', {
                            initialValue: '上海'
                        })(
                            <Select
                                showSearch
                                style={{width: 200}}
                                placeholder="城市名"
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {cityData.map(city => <OptGroup key={city[0]} label={city[0]}>
                                    {city[1].map(name => <Option key={name} value={name}>{name}</Option>)}
                                </OptGroup>)}
                            </Select>
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
                            <Select
                                showSearch
                                style={{width: 200}}
                                placeholder="城市名"
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {cityData.map(city => <OptGroup key={city[0]} label={city[0]}>
                                    {city[1].map(name => <Option key={name} value={name}>{name}</Option>)}
                                </OptGroup>)}
                            </Select>
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
                <Divider orientation="left" style={{fontWeight: "bold"}}>管理员操作</Divider>
                <Popover visible={this.state.visible} onVisibleChange={this.onVisibleChange} placement="right"
                         content={addTicket} title="新增票品" trigger="click">
                    <Button type="primary" style={{fontWeight: "bold"}}>新增票品</Button>
                </Popover>
                <Button type="primary" style={{fontWeight: "bold", marginLeft: "10px"}}
                        onClick={() => this.DeleteTrainTicket(this.state.selectedRowKeys, this.state.selectedRows)}>删除所选票品</Button>
                <Table rowKey={"id"}
                       style={{marginTop: "20px"}}
                       rowSelection={rowSelection}
                       dataSource={this.state.dataSource}
                       components={components}
                       columns={editColumns}
                       onChange={this.handleSort}
                       pagination={{
                           defaultPageSize: 8,
                           pageSizeOptions: ['8', '16', '24'],
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
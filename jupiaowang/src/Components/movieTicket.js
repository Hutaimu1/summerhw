import React from 'react';
import {Card, Icon, Rate, Divider, Pagination, Popover, Button} from 'antd';
import $ from "jquery";
import {message} from "antd/lib/index";
import moment from "moment/moment";

const data = [{
    id:0,
    src:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2519070834.webp",
    place:"上海",
    title:"我不是药神",
    rate:4.5
},{
    id:1,
    src:"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2525528688.webp",
    place:"上海",
    title:"动物世界",
    rate:3.5
},{
    id:2,
    src:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2522820714.webp",
    place:"上海",
    title:"新大头儿子和小头爸爸3：俄罗斯奇遇记",
    rate:5
},{
    id:3,
    src:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2522069454.webp",
    place:"上海",
    title:"侏罗纪世界2",
    rate:3.5
},{
    id:4,
    src:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2522880251.webp",
    place:"上海",
    title:"超人总动员2",
    rate:4
},{
    id:5,
    src:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2524134770.webp",
    place:"上海",
    title:"金蝉脱壳2:冥府",
    rate:1.5
},{
    id:6,
    src:"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2526892057.webp",
    place:"上海",
    title:"您一定不要错过",
    rate:2.5
},{
    id:7,
    src:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2525770523.webp",
    place:"上海",
    title:"阿飞正传",
    rate:4
},{
    id:8,
    src:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2525716036.webp",
    place:"上海",
    title:"生存家族",
    rate:4
},{
    id:9,
    src:"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2523437699.webp",
    place:"上海",
    title:"猛虫过江",
    rate:2
}];

const hotCity = ["北京","上海","广州","深圳","成都","武汉","杭州","重庆","郑州","南京","西安","苏州","天津","长沙","福州","济南","沈阳","合肥","青岛","哈尔滨","温州","厦门","大连","东莞","长春"];
const CityA_G =[
    ["A",["安庆","安阳","鞍山","安康","安顺","阿勒泰","阿克苏","阿坝"]],
    ["B",["北京","保定","宝鸡","包头","滨州","蚌埠","亳州","毕节","本溪","北海","巴彦淖尔","白银","保山","百色","白山","巴中","巴音郭楞","白城","保亭"]],
    ["C",["重庆","成都","长沙","长春","常州","郴州","常德","滁州","沧州","长治","赤峰","承德","朝阳","潮州","昌吉","池州","崇左","楚雄","常熟","澄迈","昌江"]],
    ["D",["东莞","大连","大庆","东营","德阳","德州","大同","达州","丹东","大理","定西","德宏","儋州","东方","大兴安岭","迪庆"]],
    ["E",["恩施","鄂尔多斯","鄂州"]],
    ["F",["佛山","福州","抚州","阜阳","抚顺","防城港","阜新"]],
    ["G",["广州","赣州","贵阳","桂林","广元","广安","甘南","固原","贵港","甘孜"]]
];
const CityH_L=[
    ["H",["杭州","哈尔滨","惠州","邯郸","湖州","海口","淮安","呼和浩特","衡阳","黄冈","河源","菏泽","呼伦贝尔","淮南","黄石","怀化","黄山","红河","衡水","葫芦岛","汉中","黑河","淮北","鹤壁","河池","贺州","鹤岗","海东","海西","哈密","合肥","海南"]],
    ["J",["金华","济南","嘉兴","江门","九江","济宁","荆州","吉安","吉林","晋中","荆门","揭阳","焦作","晋城","酒泉","锦州","景德镇","佳木斯","济源","金昌","鸡西","嘉峪关"]],
    ["K",["昆明","开封","克拉玛依","喀什","昆山","开平"]],
    ["L",["临沂","兰州","洛阳","临汾","廊坊","丽水","六安","娄底","聊城","连云港","柳州","吕梁","漯河","乐山","龙岩","临夏","泸州","辽阳","六盘水","陇南","辽源","丽江","凉山","来宾","拉萨","临沧","莱芜","乐东"]]
];
const CityM_T=[ ["M",["绵阳","梅州","马鞍山","茂名","眉山","牡丹江"]],
    ["N",["南京","宁波","南通","南昌","南宁","南充","南阳","宁德","南平","内江","怒江"]],
    ["P",["平顶山","莆田","盘锦","萍乡","平凉","普洱","濮阳","攀枝花"]],
    ["Q",["青岛","泉州","衢州","曲靖","黔南","清远","黔东南","黔西南","秦皇岛","齐齐哈尔","庆阳","钦州","潜江","七台河","琼海"]],
    ["R",["日照"]],
    ["S",["上海","深圳","苏州","石家庄","沈阳","上饶","绍兴","商丘","汕头","宿迁","三明","韶关","邵阳","三亚","绥化","十堰","四平","汕尾","遂宁","宿州","松原","商洛","随州","石嘴山","三门峡","朔州","双鸭山","石河子"]],
    ["T",["天津","台州","泰州","唐山","太原","泰安","通辽","铁岭","通化","铜仁","天水","铜陵","铜川","塔城","天门","屯昌"]]];
const CityW_Z = [
    ["W",["武汉","温州","无锡","潍坊","芜湖","乌鲁木齐","威海","渭南","梧州","乌兰察布","乌海","文山","吴忠","武威","文昌","万宁","吴江区","五指山"]],
    ["X",["西安","厦门","徐州","新乡","襄阳","信阳","湘潭","邢台","宣城","孝感","许昌","西宁","咸宁","咸阳","湘西","忻州","新余","仙桃","兴安盟","锡林郭勒","西双版纳"]],
    ["Y",["烟台","盐城","扬州","宜春","银川","运城","延边","宜昌","阳江","营口","宜宾","永州","榆林","玉林","益阳","岳阳","玉溪","延安","鹰潭","伊犁","阳泉","云浮","雅安","伊春","杨凌区"]],
    ["Z",["郑州","中山","镇江","珠海","株洲","湛江","漳州","淄博","张家口","肇庆","枣庄","遵义","周口","驻马店","舟山","自贡","资阳","张家界","张掖","中卫","昭通"]]
];

class movieTicket extends React.Component {
    state = {
        current:1,
        pageSize:6,
        data:data,
        place:"上海",
        date:["7月13日","7月14日","7月15日"],
        brand:["SFC上影影城","万达影城","大地影院"],
        time:["8:00 - 10:00","1:00 - 3:00","7:00 - 9:00"],
        cityVisible: false,
        shopVisible: false,
        quickVisible: false,
        chooseTag: "热门",
        chooseMovie:"",
        chooseDate:"",
        chooseBrand:"",
        chooseTime:""
    };

    componentDidMount(){
        $.ajax({
            type: "post",
            url: "bookstoreApp/getMovieTicket",
            data: {place: this.state.place},
            async: true,
            success: function (data) {
                this.setState({
                    data:JSON.parse(data),
                });
            }.bind(this)
        });
    }

    onPageChange = (page) =>{
        this.setState({
            current:page
        })
    };

    onShowSizeChange = (current, pageSize) =>{
        this.setState({
            pageSize:pageSize
        });
    };

    handleCityVisibleChange = (cityVisible) => {
        this.setState({ cityVisible });
    };

    handleShopVisibleChange = (shopVisible) => {
        this.setState({
            shopVisible,
            chooseDate:"",
            chooseBrand:""
        });
    };

    handleQuickVisibleChange = (quickVisible) =>{
        this.setState({
            quickVisible,
            chooseDate:"",
            chooseBrand:""
        });
    };

    changeTag = (chooseTag) => {
        this.setState({chooseTag})
    };

    changeCity = (place) =>{
        $.ajax({
            type: "post",
            url: "bookstoreApp/getMovieTicket",
            data: {place: place},
            async: true,
            success: function (data) {
                this.setState({
                    data:JSON.parse(data),
                    place:place
                });
            }.bind(this)
        });
    };

    changeMovie = (movie) => {
        $.ajax({
            type: "post",
            url: "bookstoreApp/getMovieDate",
            data: {place: this.state.place, movie:movie},
            async: false,
            success: function (data) {
                this.setState({
                    date:JSON.parse(data),
                    chooseMovie:movie,
                    chooseDate:"",
                    chooseBrand:"",
                    chooseTime:""
                });
            }.bind(this)
        });
        this.setState({
            chooseMovie:movie,
            chooseDate:"",
            chooseBrand:"",
            chooseTime:""
        });
    };

    changeDate = (date) => {
        $.ajax({
            type: "post",
            url: "bookstoreApp/getMovieBrand",
            data: {place: this.state.place, movie:this.state.chooseMovie,date:date},
            async: false,
            success: function (data) {
                this.setState({
                    brand:JSON.parse(data),
                    chooseDate:date,
                    chooseBrand:"",
                    chooseTime:""
                });
            }.bind(this)
        });
        this.setState({
            chooseDate:date,
            chooseBrand:"",
            chooseTime:""
        });
    };

    changeBrand = (brand) =>{
        $.ajax({
            type: "post",
            url: "bookstoreApp/getMovieTime",
            data: {place: this.state.place, movie:this.state.chooseMovie, date:this.state.chooseDate, brand:brand},
            async: false,
            success: function (data) {
                this.setState({
                    time:JSON.parse(data),
                    chooseBrand:brand,
                    chooseTime:""
                });
            }.bind(this)
        });
        this.setState({
            chooseBrand:brand,
            chooseTime:""
        })
    };

    changeTime = (time) =>{
        this.setState({
            chooseTime:time
        })
    };

    movieTicketAddToShopCart = (id) =>{
        let userName = this.props.match.params.userName;
        let ticketName;
        this.state.data.forEach((movieTicket) =>{
            if(movieTicket.id === id){
                ticketName = movieTicket.title;
            }
        });
        console.log("111",userName);
        console.log("222",id);
        console.log("333",ticketName);
        $.ajax({
            url: "bookstoreApp/movieTicketAddToShopCart",
            data: {shopCartId:id,userName:userName,ticketName:ticketName,price:25,leftTicket:15},
            type: "POST",
            traditional: true,
            success: function (data) {
                message.success("加入购物车成功!");
            }
        });
    };

    movieTicketQuickBuy = (id) =>{
        let userName = this.props.match.params.userName;
        let ticketName;
        this.state.data.forEach((movieTicket) =>{
            if(movieTicket.id === id){
                ticketName = movieTicket.title;
            }
        });
        $.ajax({
            url: "bookstoreApp/movieTicketQuickBuy",
            data: {shopCartId:id,userName:userName,ticketName:ticketName,price:25,leftTicket:15,date:moment().format('YYYY-MM-DD HH:mm:ss')},
            type: "POST",
            traditional: true,
            success: function (data) {
                message.success("一键下单成功,已生成未处理订单");
            }
        });
    };

    getMovie = () =>{
        let result=[];
        const {chooseDate,chooseBrand,chooseTime,date,brand,time}=this.state;
        this.state.data.forEach((card, index) => {
            if (index >= (this.state.current - 1) * this.state.pageSize && index < this.state.current * this.state.pageSize) {
                result.push(<Card
                    key={card.id}
                    hoverable
                    className="movieCard"
                    cover={<img style={{height:"300px"}} alt={card.title} src={card.src} />}
                    actions={[<Icon type="eye" onClick={() => this.props.history.push('/home/' + this.props.match.params.userName + "/viewMovie/" + card.id)} />,
                        <Popover
                            placement="rightTop"
                            content={<div style={{overflow: "hidden"}}><div className="tags-panel container">
                                <ul className="tags-lines">
                                    <li className="tags-line">
                                        <div className="tags-title">日期:</div>
                                        <ul className="tags">
                                            {date.map(date => <li key={date} className={date === chooseDate?"active":"normal"}><a onClick={() => this.changeDate(date)}>{date}</a></li>)}
                                        </ul>
                                    </li>
                                    <li className="tags-line tags-line-border" style={{display:[chooseDate === ''? "none":"inline-block"]}}>
                                        <div className="tags-title">品牌:</div>
                                        <ul className="tags" >
                                            {brand.map(brand => <li key={brand} className={brand === chooseBrand?"active":"normal"}><a onClick={() => this.changeBrand(brand)}>{brand}</a></li>)}
                                        </ul>
                                    </li>
                                    <li className="tags-line tags-line-border" style={{display:[chooseDate === '' || chooseBrand === ''? "none":"inline-block"]}}>
                                        <div className="tags-title">场次:</div>
                                        <ul className="tags" >
                                            {time.map(time => <li key={time} className={time === chooseTime?"active":"normal"}><a onClick={() => this.changeTime(time)}>{time}</a></li>)}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <Button type="primary" className="tags-button" disabled={chooseDate === "" || chooseBrand === "" || chooseTime === "" } onClick={()=>this.movieTicketAddToShopCart(card.id)}>加入购物车</Button></div>}
                            trigger="click"
                            visible={this.state.chooseMovie === card.title?this.state.shopVisible:false}
                            onVisibleChange={this.handleShopVisibleChange}
                        >
                            <Icon onClick={() => this.changeMovie(card.title)} type="shopping-cart" />
                        </Popover>
                    , <Popover
                            placement="rightTop"
                            content={<div style={{overflow: "hidden"}}><div className="tags-panel container">
                                <ul className="tags-lines">
                                    <li className="tags-line">
                                        <div className="tags-title">日期:</div>
                                        <ul className="tags">
                                            {date.map(date => <li key={date} className={date === chooseDate?"active":"normal"}><a onClick={() => this.changeDate(date)}>{date}</a></li>)}
                                        </ul>
                                    </li>
                                    <li className="tags-line tags-line-border" style={{display:[chooseDate === ''? "none":"inline-block"]}}>
                                        <div className="tags-title">品牌:</div>
                                        <ul className="tags" >
                                            {brand.map(brand => <li key={brand} className={brand === chooseBrand?"active":"normal"}><a onClick={() => this.changeBrand(brand)}>{brand}</a></li>)}
                                        </ul>
                                    </li>
                                    <li className="tags-line tags-line-border" style={{display:[chooseDate === '' || chooseBrand === ''? "none":"inline-block"]}}>
                                        <div className="tags-title">场次:</div>
                                        <ul className="tags" >
                                            {time.map(time => <li key={time} className={time === chooseTime?"active":"normal"}><a onClick={() => this.changeTime(time)}>{time}</a></li>)}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                                <Button type="primary" className="tags-button" disabled={chooseDate === "" || chooseBrand === "" || chooseTime === "" }  onClick={()=>this.movieTicketQuickBuy(card.id)}>一键快速下单</Button></div>}
                            trigger="click"
                            visible={this.state.chooseMovie === card.title?this.state.quickVisible:false}
                            onVisibleChange={this.handleQuickVisibleChange}
                        >
                            <Icon onClick={() => this.changeMovie(card.title)} type="rocket" />
                        </Popover>]}
                >
                    <Card.Meta
                        title={<span style={{fontWeight: "bold"}}>{card.title}</span>}
                        description={<span><Rate allowHalf defaultValue={card.rate} disabled/><span style={{color: "#ff5741"}}>评分:{card.rate * 2}</span></span>}
                    />
                </Card>)
            }
        });
        return result;
    };

    render() {
        return (
            <div style={{fontWeight: "bold", overflow: "hidden"}}>
                <h1 className="movieHead">电影票 - {this.state.place}</h1>
                <Popover
                    placement="bottom"
                    title={<div className="tab-title">
                        <span style={{fontWeight: "bold"}} className={this.state.chooseTag === "热门"?"on":""} onClick={()=>this.changeTag("热门")}>热门</span>
                        <span className={this.state.chooseTag === "A - G"?"on":""} onClick={()=>this.changeTag("A - G")}>A - G</span>
                        <span className={this.state.chooseTag === "H - L"?"on":""} onClick={()=>this.changeTag("H - L")}>H - L</span>
                        <span className={this.state.chooseTag === "M - T"?"on":""} onClick={()=>this.changeTag("M - T")}>M - T</span>
                        <span className={this.state.chooseTag === "W - Z"?"on":""} onClick={()=>this.changeTag("W - Z")}>W - Z</span>
                    </div>}
                    content={<div className="tab-content" style={{fontWeight: "bold"}}>
                        <div style={{display:this.state.chooseTag === "热门"?"block":"none"}}>
                            {hotCity.map(city => <span key={city}><a onClick={() => this.changeCity(city)}>{city}</a></span>)}
                        </div>
                        <div style={{display:this.state.chooseTag === "A - G"?"block":"none"}}>
                            {CityA_G.map(index => <dl className="tab-content-mod" key={index[0]}>
                                <dt>{index[0]}</dt>
                                <dd>
                                    {index[1].map(city => <span key={city}><a onClick={() => this.changeCity(city)}>{city}</a></span>)}
                                </dd>
                            </dl>)}
                        </div>
                        <div style={{display:this.state.chooseTag === "H - L"?"block":"none"}}>
                            {CityH_L.map(index => <dl className="tab-content-mod" key={index[0]}>
                                <dt>{index[0]}</dt>
                                <dd>
                                    {index[1].map(city => <span key={city}><a onClick={() => this.changeCity(city)}>{city}</a></span>)}
                                </dd>
                            </dl>)}
                        </div>
                        <div style={{display:this.state.chooseTag === "M - T"?"block":"none"}}>
                            {CityM_T.map(index => <dl className="tab-content-mod" key={index[0]}>
                                <dt>{index[0]}</dt>
                                <dd>
                                    {index[1].map(city => <span key={city}><a onClick={() => this.changeCity(city)}>{city}</a></span>)}
                                </dd>
                            </dl>)}
                        </div>
                        <div style={{display:this.state.chooseTag === "W - Z"?"block":"none"}}>
                            {CityW_Z.map(index => <dl className="tab-content-mod" key={index[0]}>
                                <dt>{index[0]}</dt>
                                <dd>
                                    {index[1].map(city => <span key={city}><a onClick={() => this.changeCity(city)}>{city}</a></span>)}
                                </dd>
                            </dl>)}
                        </div>
                    </div>}
                    trigger="click"
                    visible={this.state.cityVisible}
                    onVisibleChange={this.handleCityVisibleChange}
                >
                    <a>[切换城市]</a>
                </Popover>
                <Divider orientation="left" style={{fontWeight: "bold",fontSize:"20px"}}>正在上映</Divider>
                <div style={{overflow: "hidden"}}>
                    {this.getMovie()}
                </div>
                <div>
                <Pagination showQuickJumper showSizeChanger pageSizeOptions={['6','12','18']} onShowSizeChange={this.onShowSizeChange} current={this.state.current} defaultPageSize={this.state.pageSize} total={this.state.data.length} onChange={this.onPageChange} style={{float:"right",marginRight:"50px"}} />
                </div>
            </div>
        );
    }
}

export default movieTicket;
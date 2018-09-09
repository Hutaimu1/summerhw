import React from 'react';
import {Row, Col, Rate} from 'antd';
import $ from "jquery";
import Comment from "./comment"

class viewMovie extends React.Component {
    state = {
        data: {
            id: 0,
            src: "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2519070834.webp",
            title: "我不是药神",
            director: "文牧野",
            screenwriter: ["韩家女", "钟伟", "文牧野"],
            type: ["剧情", "喜剧"],
            made: "中国大陆",
            language: ["汉语普通话", "英语", "上海话", "印地语"],
            date: ["2018-07-05(中国大陆)", "2018-06-30(大规模点映)"],
            length: 117,
            others: ["中国药神", "印度药神", "印度药商", "生命之路", "Dying to Survive", "Drug Dealer"],
            rate: 4.5,
            numberOfComments: 25
        }
    };

    componentDidMount() {
        $.ajax({
            type: "post",
            url: "bookstoreApp/getMovieMessage",
            data: {id: this.props.match.params.movieId},
            async: true,
            success: function (data) {
                this.setState({
                    data: JSON.parse(data),
                });
            }.bind(this)
        });
    }

    handleArray = (array) => {
        let result = "";
        array.forEach((data, index) => {
            if (index === 0) {
                result = result + data
            }
            else {
                result = result + " / " + data
            }
        });
        return result
    };

    render() {
        const data = this.state.data;
        return (
            <div style={{fontWeight: "bold", marginLeft: "50px", minWidth: "1690px"}}>
                <h1 style={{fontSize: "40px"}}>
                    <span style={{fontWeight: "bold"}}>{data.title}</span>
                </h1>
                <Row>
                    <Col span={6}>
                        <img style={{height: "500px", minWidth: "357px"}} alt={data.title}
                             src={data.src}/>
                    </Col>
                    <Col span={12}>
                        <div className="movie-info">
                            <span>导演: {data.director}</span>
                            <span>编剧: {this.handleArray(data.screenwriter)}</span>
                            <span>类型: {this.handleArray(data.type)}</span>
                            <span>制片国家/地区: {data.made}</span>
                            <span>语言: {this.handleArray(data.language)}</span>
                            <span>上映日期: {this.handleArray(data.date)}</span>
                            <span>片长: {data.length}分钟</span>
                            <span>又名: {this.handleArray(data.others)}</span>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="clear-fix">
                            <div style={{fontSize: "25px"}}>
                                聚票网评分
                            </div>
                            <div className="rating_self clear-fix" typeof="v:Rating">
                                <strong className="rating_num"
                                        property="v:average">{(data.rate * 2).toFixed(1)}</strong>
                                <div className="rating_right ">
                                    <div className="star">
                                        <Rate allowHalf defaultValue={data.rate} disabled style={{fontSize: "30px"}}/>
                                    </div>
                                    <div className="rating_sum">
                                        <span>{data.numberOfComments}人评价</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{marginTop: "20px"}}>
                                <div className="item">
                                    <span className="star-stop" title="力荐">5星</span>
                                    <div className="power" style={{width: "220px"}}></div>
                                    <span className="rating_per">55.1%</span>
                                </div>
                                <div className="item">
                                    <span className="star-stop" title="推荐">4星</span>
                                    <div className="power" style={{width: "148px"}}></div>
                                    <span className="rating_per">37.1%</span>
                                </div>
                                <div className="item">
                                    <span className="star-stop" title="还行">3星</span>
                                    <div className="power" style={{width: "28px"}}></div>
                                    <span className="rating_per">7.1%</span>
                                </div>
                                <div className="item">
                                    <span className="star-stop" title="较差">2星</span>
                                    <div className="power" style={{width: "2px"}}></div>
                                    <span className="rating_per">0.5%</span>
                                </div>
                                <div className="item">
                                    <span className="star-stop" title="很差">1星</span>
                                    <div className="power" style={{width: "1px"}}></div>
                                    <span className="rating_per">0.2%</span>
                                </div>
                            </div>
                            <div style={{marginTop: "20px"}}>
                                <Rate allowHalf style={{fontSize: "50px"}}/>
                            </div>
                        </div>
                    </Col>
                </Row>
                <br/>
                <div>
                    <Comment userName={this.props.match.params.userName} ticketId={this.props.match.params.movieId} type={1}/>
                </div>
            </div>
        );
    }
}

export default viewMovie;
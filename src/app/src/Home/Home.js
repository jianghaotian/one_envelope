import React, { Component } from 'react'
import '../css/home.css'
import {BrowserRouter as Router,Link,Switch,Route} from 'react-router-dom'

export default class Home extends Component {
    render() {
        let year = new Date().getFullYear();
        return (
            <div>
                {/* 顶部 */}
                <div id="home-top">
                    <div id="tomy" style={{float:"left"}}>
                        <Link to="/tomy" style={{color:"white",padding:"10px",fontSize:"15px"}}>
                            致自己 <span style={{fontWeight:"bolder",fontSize:"20px"}}>></span>
                        </Link>
                    </div>
                    <div style={{float:"right",padding:"5px 10px"}}>
                        <img src={require("../imgs/Home/选项.png")} />
                    </div>
                </div>

                <div id="home-mid">
                    {/* 年份 */}
                    <div className="home-year">
                        <span>
                            {year}年
                        </span>
                    </div>
                    {/* body */}
                    <div id="home-main">
                        <ul>
                            <li className="content">
                                <div className="c-time">
                                    <span className="c-day">20日</span>
                                    <span className="c-month">11月</span>
                                </div>
                                <div className="c-title">
                                    <p>今天想对自己说</p>
                                </div>
                                <div className="c-content">
                                    <div className="c-span">
                                        往者不可谏，来者犹可追
                                    </div>
                                </div>
                            </li>
                            <li className="content">
                                <div className="c-time">
                                    <span className="c-day">19日</span>
                                    <span className="c-month">11月</span>
                                </div>
                                <div className="c-title">
                                    <p>给她的一封小情书</p>
                                </div>
                                <div className="c-content">
                                    <div className="c-span">
                                        <span>我野蛮生长</span>
                                        <br/>
                                        <span>没能成为自己的月亮</span>
                                        <br/>
                                        <span>能遇见你</span>
                                        <br/>
                                        <span>是银河慷慨赠我的糖</span>
                                    </div>
                                </div>
                            </li>
                            <li className="content">
                                <div className="c-time">
                                    <span className="c-day">18日</span>
                                    <span className="c-month">11月</span>
                                </div>
                                <div className="c-title">
                                    <p>给亲爱的妈妈</p>
                                </div>
                                <div className="c-content">
                                    <div className="c-span">
                                        <span>希望我的成长</span>
                                        <br/>
                                        <span>超越你苍老的速度</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* 新建 */}
                <div id="home-pencil">
                    <img src={require("../imgs/Home/pencil.png")} style={{height:"45px"}} />
                </div>
            </div>
        )
    }
}

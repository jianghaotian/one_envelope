import React, { Component } from 'react'
import '../css/tomy.css'
import 'antd/dist/antd.css'
import {Button} from 'antd'
import {BrowserRouter as Router,Link,Switch,Route} from 'react-router-dom'

export default class ToMy extends Component {
    render() {
        return (
            <div>
                {/* 顶部 */}
                <div id="tomy-top">
                    <div>
                        <Link to="/home">
                            <span style={{padding:"5px",fontSize:"16px",color:"white"}}> 返回 </span>
                        </Link>
                    </div>
                </div>
                {/* 列表 */}
                <div id="toU">
                    <ul>
                        <li className="toUli">
                            <img src={require("../imgs/Home/boy.png")} className="tomy-Uimage" />
                            <div className="tU">
                                <span className="letter-name">
                                    致自己
                                </span>
                                <span className="letter-num">
                                    1封
                                </span>
                            </div>
                        </li>
                        <li className="toUli">
                            <img src={require("../imgs/Home/girl.png")} className="tomy-Uimage" />
                            <div className="tU">
                                <span className="letter-name">
                                    致可爱的她
                                </span>
                                <span className="letter-num">
                                    1封
                                </span>
                            </div>
                        </li>
                        <li className="toUli">
                            <img src={require("../imgs/Home/girl.png")} className="tomy-Uimage" />
                            <div className="tU">
                                <span className="letter-name">
                                    致亲爱的妈妈
                                </span>
                                <span className="letter-num">
                                    1封
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
                {/* 底部 */}
                <div className="tomy-bottom">
                    <Button>
                        编辑
                    </Button>
                    <Button>
                        添加
                    </Button>
                </div>
            </div>
        )
    }
}

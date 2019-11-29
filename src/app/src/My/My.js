import React, { Component } from 'react'
import '../css/Login.css'
import {BrowserRouter as Router,NavLink,Link,Switch} from 'react-router-dom'
import '../css/My.css'
import { List } from 'antd-mobile'

export default class My extends Component {
    
    render() {
        return (
            <div>
                {/* 个人信息 */}
                <div id='my-info'>
                    <img 
                    src={require("../imgs/my-bg.jpg")} 
                    className="myifbg" />
                    <img 
                    src={require("../imgs/my-login.jpg")} className="portrait" />
                    <img 
                    src={require("../imgs/my-msg.png")}
                    style={{
                        position:"absolute",
                        right:"2em",
                        top:"2em",
                        height:"2.5em",
                        width:"2.5em",
                        zIndex:'2'
                    }}/>
                    <div>
                        <ul>
                            <li><span>2</span>写信数</li>
                            <li><span>12</span>积分</li>
                            <li><span>1</span>分享</li>
                        </ul>
                    </div>
                </div>
                {/* 功能 */}
                {/* <div  id='my-tool'>
                    <ul>
                        <li ><Link to='/collection'>收藏 *
                            <i                           
                            className="iconfont icon-collection" 
                            style={{
                                paddingRight:"0.1em"
                            }}></i>
                        </Link></li>
                        <li><Link to='/setting'>我的设置 *
                            <i 
                            className="iconfont icon-shezhi-" 
                            style={{
                                fontSize:"1.8em"
                            }}
                            ></i>
                        </Link></li>
                        <li><Link to='/recover'>回收站 *
                            <i 
                            className="iconfont icon-icon7" 
                            style={{
                                paddingRight:"0.1em"
                            }}></i>
                        </Link></li>
                        
                    </ul> 
                </div> */}
                <List style={{
                    marginTop:'1em'
                }}>
                    <Link to='/collection' style={{
                            color:'black'
                    }}><List.Item>
                        收藏
                        <i                           
                        className="iconfont icon-collection" 
                        style={{
                            paddingRight:"0.15em",
                            float:'right'
                        }}></i>
                    </List.Item></Link>
                    <Link to='/setting' style={{
                            color:'black'
                    }}><List.Item>设置
                        <i 
                        className="iconfont icon-shezhi-" 
                        style={{
                            fontSize:"1.2em",
                            float:'right'
                        }}
                        ></i>
                    </List.Item></Link>
                    <Link to='/recover' style={{
                            color:'black'
                    }}><List.Item>
                        回收站
                        <i 
                        className="iconfont icon-lajixiang" 
                        style={{
                            paddingRight:"0.15em",
                            float:'right'
                        }}></i>
                    </List.Item></Link>
                </List>
            </div>
        )
    }
}
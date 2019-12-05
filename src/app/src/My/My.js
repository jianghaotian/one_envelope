import React, { Component } from 'react'
import '../css/Login.css'
import {NavLink,Link} from 'react-router-dom'
import '../css/My.css'
import { List,WhiteSpace } from 'antd-mobile'
const Item = List.Item;
export default class My extends Component {
    render() {
        return (
            <div className="mydiv">
                {/* 个人信息 */}
                <div id='my-info'>
                    {/* 背景 */}
                    <img 
                    src={require("../imgs/LetBox/my-bg.png")} 
                    className="myifbg" />
                    {/* 头像 */}
                    <img 
                    src={require("../imgs/my-login.jpg")} className="portrait" onClick={() =>{this.props.history.push('/touxiang')}}/>
                    {/* 通知信息-图标 */}
                    <Link to='/mymessage'><i className="icon-xinxiang iconfont"
                    style={{
                        position:"absolute",
                        right:"1.3em",
                        top:"0.7em",
                        zIndex:'2',
                        fontSize:'1.7em',
                        color:"black"
                    }}
                     /></Link> 
                    {/* title */}
                    <span className="mytitle">我的</span>
                    {/* 用户名 */}
                    <span className="myinfospan"><b>XueueCu</b></span>
                    {/* 编辑用户信息 */}
                    <Link to="/myedit"><i className="icon-bianji iconfont"
                    style={{
                        position:"absolute",
                        right:"8%",
                        top:"52%",
                        zIndex:'2',
                        fontSize:'2em',
                        color:"black"
                    }} /></Link>
                    {/* 选项 */}
                    <div className="myinfodiv">
                        <ul>
                            <Link to="/articalnum" style={{
                                color:'black'
                            }}><li><span>2</span>写信数</li></Link>
                            <Link to="/sharenum" style={{
                                color:'black'
                            }}><li><span>1</span>分享</li></Link>
                        </ul>
                    </div>
                </div>
                
                {/* 功能 */}
                <List style={{
                    marginTop:'1em'
                }}>
                    <Item extra={
                        <i className="iconfont icon-huiyuan" ></i>
                    } onClick={() => {}}>会员中心</Item>
                    <Item extra={
                        <i className="iconfont icon-weibiaoti-" style={{
                            fontSize:"1.0em"
                        }}></i>
                    } onClick={() => {}}>我的订单</Item>
                    <Item extra={
                        <i className="iconfont icon-kaquan" ></i>
                    } onClick={() => {}}>我的卡券</Item>

                    <Link to='/collection' style={{
                            color:'black'
                    }}><Item extra={
                        <i className="iconfont icon-collection" ></i>
                    } onClick={() => {}}>我的收藏</Item></Link>                    
                </List>
                <WhiteSpace size="lg" />
                <List>
                    <Item extra={
                        <i className="iconfont icon-lajixiang" ></i>
                    } onClick={() => {}}><Link to='/recover' style={{
                            color:'black'
                    }}>回收站</Link></Item>
                    
                    <Item extra={
                        <i className="iconfont icon-iconfontzhizuobiaozhun023133" ></i>
                    } onClick={() => {}}>在线咨询</Item>
                    <Item extra={
                        <i className="iconfont icon-bangzhu1" ></i>
                    } onClick={() => {}}>帮助与反馈</Item>

                    <Link to='/setting' style={{
                            color:'black'
                    }}><Item extra={
                        <i className="iconfont icon-dingbudaohang-zhangh" ></i>
                    } onClick={() => {}}>我的设置</Item></Link>
                </List>
            </div>
        )
    }
}
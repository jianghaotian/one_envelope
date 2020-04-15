import React, { Component } from 'react'
import '../css/Login.css'
import {NavLink,Link} from 'react-router-dom'
import '../css/My.css'
import { List,WhiteSpace } from 'antd-mobile'
const Item = List.Item;

export default class My extends Component {
    constructor(){
        super();
        this.state={
            arr:[{"Uname":"你的昵称",'pidname':'0'}],
            brr:[{"sharenum":'0'}]
        }
    }
    componentDidMount(){
        this.$api.mine().then(res => {
            // 获取数据成功后的其他操作
            this.setState({
                arr:res.data.data
            })
            // console.log(this.state.arr[0].pidname)
        }) 
        this.$api.sharenum().then(res => {
            // 获取数据成功后的其他操作
            this.setState({
                brr:res.data.data
            })
        }) 
    }
    render() {
        // console.log(this.state.arr[0].pidname)
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
                    src={"https://yf.htapi.pub/head/"+this.state.arr[0].Uimage} className="portrait" />
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
                    <span className="myinfospan"><b>
                        {this.state.arr[0].Uname}
                    </b></span>
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
                            <li><span>{this.state.arr[0].pidnum}</span>写信数</li>
                            <li><span>{this.state.brr[0].sharenum}</span>分享</li>
                        </ul>
                    </div>
                </div>
                
                {/* 功能 */}
                <List style={{
                    marginTop:'1em'
                }}>
                    {/* <Item extra={
                        <i className="iconfont icon-huiyuan" ></i>
                    } onClick={() => {}}>会员中心</Item> */}
                    {/* <Item extra={
                        <i className="iconfont icon-weibiaoti-" style={{
                            fontSize:"1.0em"
                        }}></i>
                    } onClick={() => {}}>我的订单</Item>
                    <Item extra={
                        <i className="iconfont icon-kaquan" ></i>
                    } onClick={() => {}}>我的卡券</Item> */}

                    <Link to='/collection' style={{
                            color:'black'
                    }}><Item extra={
                        <i className="iconfont icon-collection" ></i>
                    } onClick={() => {}}>我的收藏</Item></Link>                    
                </List>
                
                <WhiteSpace size="lg" />
                <List>
                    <Link to='/recover' style={{
                            color:'black'
                    }}>
                        <Item extra={
                        <i className="iconfont icon-lajixiang" ></i>
                        } onClick={() => {}}>回收站</Item>
                    </Link>
                    
                    {/* <Item extra={
                        <i className="iconfont icon-iconfontzhizuobiaozhun023133" ></i>
                    } onClick={() => {}}>在线咨询</Item> */}
                    <Link to='/setting' style={{color:'black'}}>
                        <Item extra={
                        <i className="iconfont icon-dingbudaohang-zhangh" ></i>
                    } onClick={() => {}}>我的设置</Item></Link>
                    <Link to='/feedback' style={{ color:'black'}}>
                        <Item extra={
                        <i className="iconfont icon-bangzhu1" ></i>
                        } onClick={() => {}}>意见反馈</Item>
                    </Link>
                </List>
            </div>
        )
    }
}
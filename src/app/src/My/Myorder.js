import React, { Component } from 'react'
import '../css/My.css'
import {Link,Switch} from 'react-router-dom'
import { SwipeAction, List,WhiteSpace } from 'antd-mobile';
const Item = List.Item;

export default class Collection extends Component {
    constructor(){
        super();
        this.state={
            arr:[{'collection':'1'}]
        }
    }
    componentDidMount(){
        
    }
    render() {
        return (
            <div>
                {/* tab */}
                <div className="col-tab">
                    我的等级
                    <Link to="/home/my" 
                    style={{
                        float:"left",
                        height:"3em",
                        width:"3em",
                        position:"absolute",
                        left:"0",
                        top:"0",
                        zIndex:"1"                       
                    }}
                    ></Link>
                    <i                           
                    className="iconfont icon-fanhui" 
                    style={{
                        position:"absolute",
                        left:"5%",
                        height:"2%",
                        fontSize:"1.2em"     
                    }}></i>
                </div>
                
                {/* content */}
                {/* 当前：秀才 */}
                <div className="mo-bk" style={{
                    position: "relative"
                }}>
                    <img 
                    src={require("../imgs/my/bk.png")} 
                    className="myifbg" />
                    <span className="motit"><b>秀才</b></span>

                </div>
                {/* 总成长值,距离下一成长值 */}
                <div style={{
                    width:'100%',
                    height:'6em'
                }}>
                    <div style={{
                        width:"50%",
                        float:'left',
                        textAlign:"center",
                        // lineHeight:'8em',
                        // backgroundColor:'red'
                    }}>
                        <span style={{
                            color:'orange',
                            fontSize:'30px'
                        }}><b>4</b></span>
                        <br/>
                        <span>总成长值</span>
                    </div>
                    <div style={{
                        width:"50%",
                        float:'left',
                        textAlign:"center",
                        // lineHeight:'8em',
                        // backgroundColor:'red'
                    }}>
                        <span style={{
                            color:'orange',
                            fontSize:'30px'
                        }}><b>8</b></span>
                        <br/>
                        <span>晋级目标</span>
                    </div>
                </div>
                {/* 等级与奖励TODO: */}
                
                {/* 宝宝，读书郎，秀才，举人，状元，探花， */}
                <List>
                    <Item style={{
                        paddingLeft:"156px"
                    }}>等级</Item>
                </List>
                <WhiteSpace />
                <List>
                    <Item extra={
                        <span> 0成长值</span>
                    } >秀才</Item>
                    <Item extra={
                        <span> 8成长值</span>
                    } >举人</Item>
                    <Item extra={
                        <span> 15成长值</span>
                    } >状元</Item>
                    <Item extra={
                        <span> 30成长值</span>
                    } >探花</Item>
                    <Item extra={
                        <span>100成长值</span>
                    } >翰林</Item>
                </List>
            </div>
        )
    }
}


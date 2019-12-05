import React, { Component } from 'react'
import {NavLink,Link,Switch} from 'react-router-dom'
import { List } from 'antd-mobile'
import '../css/My.css'

const arr=[
    {
        id:'1',
        fm_date:'2019/11/28',
        fm_title:'通知',
        fm_content:'一封版本更新啦，据统计90%的用户选则了更新'
    }
]

export default class Message extends Component {
    render() {
        return (
            <div>
                {/* tab */}
                <div className="col-tab">
                    我的消息
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
                    onClick={()=>console.log("Message to my")}
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
                {/* 内容 */}
                <List >
                    {arr.map((item,index)=>{
                        return(
                            <List.Item className='me-text' onClick={() => {}} key={index}>
                                <Link to={`/letter/${item.id}`} style={{
                                    color:'black'
                                }}>
                                <span className="me-title">{item.fm_title}</span>
                                <span className="me-date">{item.fm_date}</span>
                                <span className="me-content">
                                    {item.fm_content}
                                </span>
                                </Link>
                            </List.Item>
                        )
                    })}
                </List>
            </div>
        )
    }
}

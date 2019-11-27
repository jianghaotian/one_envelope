import React, { Component } from 'react'
import '../css/WriteTogether.css'
import {HashRouter as Router,Link,Switch,Route} from 'react-router-dom'


import { NavBar} from 'antd-mobile';

export default class WriteTogether extends Component {
    constructor(){
        super();       
        this.state={
            data:[
                {
                    id:0,
                    title:"快邀请ta一起写",
                    member:2,
                    paper:2,
                    img:require("../imgs//WriteTogether/toge0.jpg"),
                },
                {
                    id:1,
                    title:'致我们的宝贝',
                    member:2,
                    paper:26,
                    img:require("../imgs//WriteTogether/toge1.jpg"),
                }
                ]       
        }
    }
    render() {
        return (
            <div style={{backgroundColor:"#eeeaea"}}>
                <NavBar className='together-navback'>
                    <img src={require("../imgs//WriteTogether/tianjia.png")} className='together-img'/>
                    <span style={{fontFamily:"仿宋",fontWeight:"bolder"}}>一起写</span>
                </NavBar>
                <div>
                    {/* block */}
                    {this.state.data.map((val)=> (
                        <div key={val} id="together-block">                            
                            <img src={val.img} alt="" className="together-bacimg"/>
                            <div className="together-title"><Link to="/invitewrite" style={{color:"white"}}>{val.title}</Link></div> 
                            <div className="together-member">
                                <span>成员</span>
                                <br/>
                                <span>{val.member}个</span>
                            </div>
                            <div className="together-paper">
                                <span>信纸页</span>
                                <br/>
                                <span>{val.paper}页</span>
                            </div>
                        </div>
                    ))}
                </div>      
            
                
            </div>    
        )
    }
}

import React, { Component } from 'react'
import '../css/My.css'
import {Link,Switch} from 'react-router-dom'
import { SwipeAction, List } from 'antd-mobile';

export default class Feedback extends Component {
    render() {
        return (
            <div>
                {/* tab */}
                <div className="col-tab">
                    帮助与反馈
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
                <textarea 
                maxLength='1000'
                rows='10'
                style={{
                    width:"100%",
                    borderStyle:"none"
                }}
                placeholder='说点什么吧...'
                >
                </textarea>
                <button style={{
                    color:'white',
                    borderStyle:"none",
                    fontSize:'1.1em'}}>发表
                </button>
            </div>
        )
    }
}

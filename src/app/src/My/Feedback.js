import React, { Component } from 'react'
import '../css/My.css'
import {Link,Switch} from 'react-router-dom'
import { List,WhiteSpace } from 'antd-mobile'
const Item = List.Item;

export default class Feedback extends Component {
    render() {
        return (
            <div>
                {/* tab */}
                <div className="col-tab">
                    意见反馈
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
                <List>
                    <Item>问题和意见</Item>
                    <Item>
                        <textarea 
                        maxLength='1000'
                        rows='10'
                        style={{
                            width:"100%",
                            borderStyle:"none"
                        }}
                        placeholder='请填写10个字以上的问题描述以便我们提供更好的帮助'
                        >
                        </textarea>
                    </Item>
                    <Item style={{
                        fontSize:'1.3em'
                    }}>联系电话</Item>
                    <Item >
                        <input placeholder='选填，便于我们与你联系'
                        style={{
                            borderStyle:'none'
                        }}
                        />
                    </Item>
                </List>
                

                <div className="my-unlogin">
                    <button style={{
                        color:'white',
                        borderStyle:"none",
                        fontSize:'1.1em'
                    }}>提交
                    </button>
                </div>  
            </div>
        )
    }
}

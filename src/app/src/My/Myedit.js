import React, { Component } from 'react'
import {NavLink,Link,Switch} from 'react-router-dom'
import { List } from 'antd-mobile'

export default class Myedit extends Component {
    render() {
        return (
            <div>
                {/* tab */}
                <div className="col-tab">
                    编辑资料
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
                    onClick={()=>console.log("collection to my")}
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

                <Link to="/changeimg"><img src={require("../imgs/LetBox/lb-1.png")} className="ed-img"/></Link>

                <List>
                    <List.Item extra={'1233213213'}>账号</List.Item>
                    <Link to="/changename"><List.Item extra={'XueueCu'} arrow="horizontal" onClick={() => {}}>
                        昵称
                    </List.Item></Link>
                </List>
            </div>
        )
    }
}

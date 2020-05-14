import React, { Component } from 'react'
import {NavLink,Link,Switch} from 'react-router-dom'
import { List } from 'antd-mobile'

export default class Myedit extends Component {
    constructor(){
        super();
        this.state={
            arr:[{"Uname":"你的昵称",'pidname':'0',Uimage:'1234567891234_56.jpg'}]
        }
    }
    componentDidMount(){
        this.$api.mine().then(res => {
            // 获取数据成功后的其他操作
            this.setState({
                arr:res.data.data
            })
            // console.log(this.state.arr[0].Uimage)
        })
    }
    render() {
        // console.log(this.state.arr[0].Uimage)
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
                <Link to="/touxiang"><img src={"https://yf.htapi.pub/head/"+this.state.arr[0].Uimage} className="ed-img"/></Link>
                <List>
                    <List.Item extra={this.state.arr[0].Uphone}>账号</List.Item>
                    <Link to="/changename"><List.Item extra={this.state.arr[0].Uname} arrow="horizontal" onClick={() => {}}>
                        昵称
                    </List.Item></Link>
                </List>
            </div>
        )
    }
}

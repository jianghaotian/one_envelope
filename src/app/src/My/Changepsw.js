import React, { Component } from 'react'
import {NavLink,Link,Switch} from 'react-router-dom'
import { Button,WhiteSpace,InputItem,List} from 'antd-mobile'

export default class changepsw extends Component {
    componentDidMount() {
    // this.autoFocusInst.focus();
    }
    handleClick = () => {
        this.inputRef.focus();
    }
    render() {
        return (
            <div>
                <div className="col-tab">
                    修改密码
                    <Link to="/setting" 
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

                <List renderHeader={() => '旧密码：'}>
                    <InputItem
                    clear
                    placeholder="若包含字母，请区分大小写"
                    ref={el => this.autoFocusInst = el}
                ></InputItem>
                </List>
                <List renderHeader={() => '新密码：'}>
                    <InputItem
                    clear
                    placeholder="8-16位，至少含有数字"
                    ref={el => this.autoFocusInst = el}
                ></InputItem>
                </List>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Button>确定</Button>
            </div>
        )
    }
}

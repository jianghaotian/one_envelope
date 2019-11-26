import React, { Component } from 'react'
import '../css/tomy.css'
import 'antd/dist/antd.css'
import $ from 'jquery'
import {Button} from 'antd'
import {BrowserRouter as Router,Link,Switch,Route} from 'react-router-dom'

let tag=true;

export default class ToMy extends Component {
    constructor(){
        super();
    }
    Addressee=()=>{
        this.props.history.push("/addressee");
    }
    move=()=>{
        if(tag){
            $(".tomy-del").css("display","block");
            $("#del-btn").html("退出编辑");
            tag=false;
        }else{
            $(".tomy-del").css("display","none");
            $("#del-btn").html("编辑");
            tag=true;
        }
    }
    delUli=()=>{
        window.confirm("确认删除？");
    }
    render() {
        return (
            <div>
                {/* 顶部 */}
                <div id="tomy-top">
                    <div>
                        <Link to="/home">
                            <span style={{padding:"5px",fontSize:"16px",color:"white"}}> 返回 </span>
                        </Link>
                    </div>
                </div>
                {/* 列表 */}
                <div id="toU">
                    <ul>
                        <li className="toUli">
                            <img src={require("../imgs/Home/boy.png")} className="tomy-Uimage" />
                            <div className="tU">
                                {/* 删除 */}
                                <span className="tomy-del" onClick={this.delUli}>
                                    <img src={require("../imgs/Home/delete.png")} />
                                </span>
                                    
                                <span className="letter-name">
                                    致自己
                                </span>
                                <span className="letter-num">
                                    1封
                                </span>
                            </div>
                        </li>
                        <li className="toUli">
                            <img src={require("../imgs/Home/girl.png")} className="tomy-Uimage" />
                            <div className="tU">
                                <span className="letter-name">
                                    致可爱的她
                                </span>
                                <span className="letter-num">
                                    1封
                                </span>
                            </div>
                        </li>
                        <li className="toUli">
                            <img src={require("../imgs/Home/girl.png")} className="tomy-Uimage" />
                            <div className="tU">
                                <span className="letter-name">
                                    致亲爱的妈妈
                                </span>
                                <span className="letter-num">
                                    1封
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
                {/* 底部 */}
                <div className="tomy-bottom">
                    <Button onClick={this.move} id="del-btn">
                        编辑
                    </Button>
                    <Button onClick={this.Addressee} >
                        添加
                    </Button>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react';
import "../css/public.css";

export default class Public extends Component {
    constructor(){
        super();
    }
    componentDidMoun(){

    }
    backHome=()=>{
        this.props.getIndex(1);
    }
    toWrite=()=>{
        this.props.history.push("/pubWrite?type=create");
    }
    render() {
        return (
            <div>
                {/* 顶部 */}
                <div id="pub-top">
                    <i className="iconfont icon-fanhui1" id="pub-backHome" onClick={this.backHome}></i>
                    <span style={{color:"white"}}>公开写</span>
                    <i className="iconfont icon-xiexin" id="pub-write" onClick={this.toWrite}></i>
                </div>
                {/* 列表 */}
                <div className="pub-list">
                    <ul>
                        {
                            [1,2,3].map((item,index)=>{
                                return <li className="pub-li">
                                    <div className="pub-li-top">
                                        <img src={require("../imgs/public/head.png")} id="pub-head" />
                                        <span id="pub-username">可爱的包子</span>
                                        <span id="dianzanshu">0</span>
                                        <i className="iconfont icon-iconfontzhizuobiaozhun023148" id="dianzan"></i>
        
                                    </div>
                                    <div className="pub-content">
                                        <p>hahah</p>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

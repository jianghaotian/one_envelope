import React, { Component } from 'react';
import "../css/public.css";

export default class Public extends Component {
    constructor(){
        super();
        this.state = {
            list : []
        }
    }
    componentDidMount(){
        this.$api.showPubList().then(res=>{
            let Data = res.data.data;
            let l =  [];
            for(let i=0;i<Data.length;i++){
                l.push(Data[i])
            }
            this.setState({
                list : l
            })
        })
    }
    backHome=()=>{
        this.props.getIndex(1);
    }
    toWrite=()=>{
        this.props.history.push("/pubWrite?type=create");
    }
    showLetter=(item)=>{
        // console.log(item);
        this.props.history.push("/pubWrite?type=show&Oid="+item)
    }
    showHead=(item)=>{
        if(item.anonymous == 1){
            return <img src={require("../imgs/public/head2.png")} id="pub-head" />
        }else{
            return <img src={"https://yf.htapi.pub/head/"+item.Uimage} id="pub-head" />
        }
    }
    showName=(item)=>{
        if(item.anonymous == 1){
            return <span id="pub-username">匿名</span>
        }else{
            return <span id="pub-username">{item.Uname}</span>
        }
    }
    render() {
        // console.log(this.state.list)
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
                            this.state.list.map((item,index)=>{
                                return <li className="pub-li" onClick={()=>{this.showLetter(item.Oid)}}>
                                    <div className="pub-li-top">
                                        {
                                            this.showHead(item)
                                        }
                                        {
                                            this.showName(item)
                                        }
                                        <span id="dianzanshu">{item.number}</span>
                                        <i className="iconfont icon-iconfontzhizuobiaozhun023148" id="dianzan"></i>
        
                                    </div>
                                    <div className="pub-content">
                                        <p>{item.Ocontent}</p>
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

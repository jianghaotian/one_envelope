import React, { Component } from 'react'
import '../css/My.css'
import {Link,Switch} from 'react-router-dom'
import { SwipeAction, List,WhiteSpace } from 'antd-mobile';
const Item = List.Item;

export default class Collection extends Component {
    constructor(){
        super();
        this.state={
            grade:'秀才',
            mark:'5',
            nextmark:0
        }
    }
    componentDidMount(){
        this.$api.getgrade().then(res=>{
            console.log(res.data.data[0].grade);
            this.setState({
                mark:res.data.data[0].grade
            });
        })
        var m = this.state.mark;
        console.log(m)
        var nm;
        if( this.state.mark < 8 ){
            nm = 8-this.state.mark;
            this.setState({
                grade:"秀才",
                nextmark:nm
            });
        }
        else if(m < 15){
            nm = 15-m;
            this.setState({
                grade:"举人",
                nextmark:nm
            });
        }else if(m < 30){
            nm = 30-m;
            this.setState({
                grade:"状元",nextmark:nm
            });
        }else if(m < 100){
            nm = 100-m;
            this.setState({
                grade:"探花",nextmark:nm
            });
        }else{
            nm = 999;
            this.setState({
                grade:"翰林",
                nextmark:nm
            });
        }
        console.log()
    }

    render() {
        return (
            <div>
                {/* tab */}
                <div className="col-tab">
                    我的等级
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
                <div className="mo-bk" style={{
                    position: "relative"
                }}>
                    <img 
                    src={require("../imgs/my/bk.png")} 
                    className="myifbg" />
                    <span className="motit"><b>{this.state.grade}</b></span>

                </div>
                {/* 总成长值,距离下一成长值 */}
                <div style={{
                    width:'100%',
                    height:'6em'
                }}>
                    <div style={{
                        width:"50%",
                        float:'left',
                        textAlign:"center"
                    }}>
                        <span style={{
                            color:'orange',
                            fontSize:'30px'
                        }}><b>{this.state.mark}</b></span>
                        <br/>
                        <span>总成长值</span>
                    </div>
                    <div style={{
                        width:"50%",
                        float:'left',
                        textAlign:"center",
                    }}>
                        <span style={{
                            color:'orange',
                            fontSize:'30px'
                        }}><b>{this.state.nextmark}</b></span>
                        <br/>
                        <span>晋级目标</span>
                    </div>
                </div>
                {/* 等级与奖励TODO: */}
                
                {/* 宝宝，读书郎，秀才，举人，状元，探花， */}
                <List>
                    <Item style={{
                        paddingLeft:"156px"
                    }}>等级</Item>
                </List>
                <WhiteSpace />
                <List>
                    <Item extra={
                        <span> 0成长值</span>
                    } >秀才</Item>
                    <Item extra={
                        <span> 8成长值</span>
                    } >举人</Item>
                    <Item extra={
                        <span> 15成长值</span>
                    } >状元</Item>
                    <Item extra={
                        <span> 30成长值</span>
                    } >探花</Item>
                    <Item extra={
                        <span>100成长值</span>
                    } >翰林</Item>
                </List>
            </div>
        )
    }
}


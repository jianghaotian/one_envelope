import React, { Component } from 'react';
import "../css/public.css";

export default class UserInfo extends Component {
    constructor(){
        super();
        this.state = {
            name : '',
            sig : '',
            homeBack : "",
            vip : 0,
            grade : 0,
            head : '',
            guanzhu:"关注",
            tag : 0
        }
    }
    componentDidMount(){
        let urlinfo = window.location.hash;
        let uid =  urlinfo.split('=')[1];
        // console.log(uid);
        this.$api.getUserinfo({uid : uid}).then(res=>{
            console.log(res.data.data[0]);
            let data = res.data.data[0];
            this.setState({
                name : data.Uname,
                homeBack : 'https://yf.htapi.pub/homeBack/'+data.homeBack,
                sig : data.Signature,
                head : data.Uimage,
                vip : data.Vip,
                grade : data.Grade
            })
        })
    }
    back=()=>{
        this.props.history.push('/Home/public');
    }
    isVip=()=>{
        console.log(this.state.vip)
        if(this.state.vip){
            return 
        }
    }
    guanzhu=()=>{
        if(!this.state.tag){
            this.setState({
                guanzhu : '已关注',
                tag : 1
            })
        }else{
            this.setState({
                guanzhu : '关注',
                tag : 0
            })
        }
    }
    render() {
        return (
            <div id="BG">
                <img src = {require("../imgs/public/返回.png")} onClick={this.back} id="u-back" />
                <div className="u-top" >
                    <img id='u-head' src={'https://yf.htapi.pub/head/'+this.state.head} />
                    <span id="u-name">{this.state.name}</span>
                    <span id='u-sig'>{this.state.sig}</span>
                    {/* <img id="u-vip" src={require('../imgs/public/vip(1).png')} /> */}
                    <span id='guanzhu' onClick={this.guanzhu}>{this.state.guanzhu}</span>
                </div>
                <div className="u-mid">
                    <ul>
                        <li className='u-mid-li'>
                            粉丝数
                            <span>12</span>
                        </li>
                        <li className='u-mid-li' style={{width:'120px',borderLeft:"1px solid grey",borderRight:"1px solid grey"}}>
                            TA的关注
                            <span>12</span>
                        </li>
                        <li className='u-mid-li'>
                            写信数
                            <span>12</span>
                        </li>
                    </ul>
                </div>
               
            </div>
        )
    }
}

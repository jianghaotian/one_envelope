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
        console.log(uid);
        this.$api.attentionlist().then(res=>{
            console.log(res.data.data);
            let list = res.data.data;
            for(let i=0;i<list.length;i++){
                console.log(list[i].Uid);
                if(uid == list[i].Uid){
                    this.setState({
                        guanzhu : '已关注',
                        tag : 1
                    })
                }
            }
        })
        this.$api.getUserinfo({uid : uid}).then(res=>{
            // console.log(res.data.data[0]);
            let data = res.data.data[0];
            this.setState({
                uid:uid,
                name : data.Uname,
                homeBack : 'https://yf.htapi.pub/homeBack/'+data.homeBack,
                sig : data.Signature,
                head : data.Uimage,
                vip : data.Vip,
                grade : data.Grade
            })
        })
        this.$api.getfans({uid : uid}).then(res=>{
            // console.log(res.data.data[0].num);
            this.setState({
                fans : res.data.data[0].num
            })
        })
        this.$api.getattention({uid : uid}).then(res=>{
            // console.log(res);
            this.setState({
                attention : res.data.data[0].num
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
            // console.log(this.state.uid)
            this.$api.attention({uid :this.state.uid}).then(res=>{
                // console.log()
                this.setState({
                    fans : ++ this.state.fans 
                })
            })
        }else{
            this.setState({
                guanzhu : '关注',
                tag : 0
            })
            this.$api.delattention({deluid :this.state.uid}).then(res=>{
                console.log(res)
                this.setState({
                    fans : -- this.state.fans 
                })
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
                        <li className='u-mid-li' onClick={()=>{
                            this.props.history.push('/fanslist?'+this.state.uid);
                        }}>
                            粉丝数
                        <span>{this.state.fans}</span>
                        </li>
                        <li className='u-mid-li' style={{width:'120px',borderLeft:"1px solid grey",borderRight:"1px solid grey"}}
                        onClick={()=>{
                            this.props.history.push('/attentionlist?'+this.state.uid)
                        }}>
                            TA的关注
                        <span>{this.state.attention}</span>
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

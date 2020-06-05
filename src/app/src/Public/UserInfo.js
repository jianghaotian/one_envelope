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
            guanzhu:'心3',
            tag : 0,
            openList:[]
        }
    }
    componentDidMount(){
        let urlinfo = window.location.hash;
        let uid =  urlinfo.split('=')[1];
        // console.log(uid);
        this.$api.attentionlist().then(res=>{
            // console.log(res.data.data);
            let list = res.data.data;
            for(let i=0;i<list.length;i++){
                // console.log(list[i].Uid);
                if(uid == list[i].Uid){
                    this.setState({
                        guanzhu : '心2',
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
        this.$api.getOpenList({uid : uid}).then(res=>{
            // console.log(res.data.data);
            this.setState({
                openList : res.data.data
            })
        })
        
    }
    back=()=>{
        this.props.history.push('/home/my');
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
                guanzhu : '心2',
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
                guanzhu : '心3',
                tag : 0
            })
            this.$api.delattention({deluid :this.state.uid}).then(res=>{
                // console.log(res)
                this.setState({
                    fans : -- this.state.fans 
                })
            })
            
        }
    }
    toShow=(item)=>{
        // console.log(item.Oid);
        this.props.history.push('/pubWrite?type=Ushow&Oid='+item.Oid+"&uid="+this.state.uid);
    }
    vip=()=>{
        if(this.state.vip){
            return <div id="u-vip">
                <span>V</span>
            </div>
        }
    }
    render() {
        return (
            <div id="BG">
                <img src = {require("../imgs/public/返回.png")} onClick={this.back} id="u-back" />
                <div className="u-top" style={{backgroundImage:`url(`+this.state.homeBack+`)`,backgroundSize:'100% 100%'}}>
                    <div className='u-info'>
                        <img id='u-head' src={'https://yf.htapi.pub/head/'+this.state.head} />
                        <span id='u-name'>{this.state.name}</span>
                        <p id='u-sig'>{this.state.sig}</p>
                    </div>
                    <div className='u-mid'>
                    {
                        this.vip()
                    }
                    <div className='u-mid-li' 
                    onClick={()=>{
                        this.props.history.push('/fanslist?'+this.state.uid);
                    }}>
                        粉丝数
                    <p>{this.state.fans}</p>
                    </div>
                    <div className='u-mid-li'
                    onClick={()=>{
                        this.props.history.push('/attentionlist?'+this.state.uid)
                    }}>
                        TA的关注
                    <p>{this.state.attention}</p>
                    </div>
                </div>
                </div>
                <div className="openList">
                    <ul>
                    {
                        this.state.openList.map((item,index)=>{
                            console.log(item)
                            if(item.anonymous != 1){
                                return <li className='open-li' onClick={()=>{this.toShow(item)}}>
                                            <div className="o-l-top">
                                                <img src={require("../imgs/public/"+item.weather+".png")} style={{width:'23px',height:'23px'}} />
                                                <span style={{display:'inline-block',marginLeft:'10px',color:'rgb(52, 183, 235)'}}>{item.Oday}</span>
                                                <span id='u-title'>{item.Otitle}</span>
                                                <img src={require("../imgs/public/爱心.png")} id='u-like'/>
                                                <span id='likeNum'>
                                                    {item.number}
                                                </span>
                                                <div className='u-content'>
                                                    {item.Ocontent}
                                                </div>
                                            </div>
                                        </li>
                            }
                        })
                    }
                    </ul>
                </div>
                <img id='guanzhu' onClick={this.guanzhu} src={require('../imgs/public/'+this.state.guanzhu+'.png')} />
            </div>
        )
    }
}

import React, { Component } from 'react';
import "../css/public.css";
import { List, TextareaItem,Modal,Button } from 'antd-mobile';

const alert = Modal.alert;

export default class Public extends Component {
    constructor(){
        super();
        this.state = {
            list : [],
            p:'公开写',
            iconName:'我的',
            mine : false
        }
    }
    showPubList=()=>{
        this.$api.showPubList().then(res=>{
            let Data = res.data.data;
            let l =  [];
            for(let i=0;i<Data.length;i++){
                l.push(Data[i])
            }
            this.setState({
                list : l,
                p:'公开写',
                iconName:'我的',
                mine : false,
                del:'none'
            })
        })
    }
    componentDidMount(){
        this.showPubList();
        var like_LIST = [];
        this.$api.showPubList().then(res=>{
            // console.log(res.data.data);
            let likeList = res.data.data;
            for(let i=0;i<likeList.length;i++){
                let ele = {'id':likeList[i].Oid,'like':0,'num':likeList[i].number}
                like_LIST.push(ele);
            }
            this.setState({
                likeList : like_LIST,
            })
        })
        
    }
    //显示个人公开写信件
    toMine=()=>{
        if(!this.state.mine){
            this.$api.getMyPub().then(res=>{
                //console.log(res.data.data);
                this.setState({
                    list : res.data.data,
                    p:'我的发布',
                    iconName:"公开",
                    mine:true,
                    del:'block'
                })
            })
        }else{
            this.showPubList();
        }
    }
    toWrite=()=>{
        this.props.history.push("/pubWrite?type=create");
    }
    showLetter=(item)=>{
        // console.log(item);
        // console.log(this.state.mine);
        if(!this.state.mine){
            this.props.history.push("/pubWrite?type=show&Oid="+item)
        }else{
            this.props.history.push("/pubWrite?type=edit&Oid="+item)
        }
    }
    showHead=(item)=>{
        if(item.anonymous == 1){
            return <img src={require("../imgs/public/head2.png")} id="pub-head" />
        }else{
            return <img onClick={this.Userinfo} src={"https://yf.htapi.pub/head/"+item.Uimage} id="pub-head" />
        }
    }
    Userinfo=()=>{
        this.props.history.push('/Userinfo');
    }
    showName=(item)=>{
        if(item.anonymous == 1){
            return <span id="pub-username">匿名</span>
        }else{
            return <span id="pub-username">{item.Uname}</span>
        }
    }
    delPubLetter=(item)=>{
        // console.log(item.Oid);
        alert('删除','确定删除此信件吗',
                [{
                    text:'取消',onPress:()=>{}
                },{
                    text:'是的',onPress:()=>{ 
                        this.$api.DeletePubLetter({oid:item.Oid}).then(res=>{
                            // console.log(res);
                            alert('删除成功');
                            this.$api.getMyPub().then(res=>{
                                //console.log(res.data.data);
                                this.setState({
                                    list : res.data.data,
                                    p:'我的发布',
                                    iconName:"公开",
                                    mine:true,
                                    del:'block'
                                })
                            })
                        })
                    }
                }]);
    }
    Likes=(item)=>{
        if(item.Oid == this.state.likeID){
            return <i onClick={()=>{this.addLikes(item)}} style={{color:'red'}} className="iconfont icon-iconfontzhizuobiaozhun023148" id="dianzan"></i>

        }else{
            return <i onClick={()=>{this.addLikes(item)}} className="iconfont icon-iconfontzhizuobiaozhun023148" id="dianzan"></i>
        }
    }
    addLikes=(item)=>{
    //    console.log(item);
    //    console.log(this.state.likeList)
       let list = this.state.likeList;
       for(let i=0;i<list.length;i++){
           if(item.Oid == list[i].id){
               list[i].like = !list[i].like;
            //    console.log(list[i].like);
               if(list[i].like){
                this.$api.addLikes({oid:item.Oid}).then(res=>{
                    this.showPubList()
                    this.setState({
                        likeID : item.Oid
                    })
               })
               }else{
                   this.$api.cancleLickes({oid:item.Oid}).then(res=>{
                        this.showPubList()
                        this.setState({
                            likeID : ''
                        })
                   })
               }
           }
       }
        
    }
    render() {
        // console.log(this.state.list)
        return (
            <div>
                {/* 顶部 */}
                <div id="pub-top">
                    <img src={require("../imgs/public/"+this.state.iconName+".png")} id="pub-backHome" onClick={this.toMine} />
                    <span style={{color:"white"}}>公开写</span>
                    <i className="iconfont icon-xiexin" id="pub-write" onClick={this.toWrite}></i>
                </div>
                {/* 列表 */}
                <div className="pub-list">
                    <ul>
                        {
                            this.state.list.map((item,index)=>{
                                return <li className="pub-li" >
                                    <div className="pub-li-top">
                                        {
                                            this.showHead(item)
                                        }
                                        {
                                            this.showName(item)
                                        }
                                        <span id="dianzanshu">{
                                            item.number
                                        }</span>
                                        {
                                            this.Likes(item)
                                        }
                                        <img onClick={()=>{this.delPubLetter(item)}} src={require("../imgs/public/删除(1).png")} id="pub-delete" style={{display:this.state.del}} />
                                    </div>
                                    <div className="pub-content" onClick={()=>{this.showLetter(item.Oid)}}>
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

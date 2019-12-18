import React, { Component } from 'react';
import "../css/HomeWrite.css";
import { List, TextareaItem,Modal,Button } from 'antd-mobile';

const alert = Modal.alert;

export default class HomeWrite extends Component {
    constructor(){
        super();
        this.state = {
            value : "",//信件内容
            to:"",//给谁
            title : "",//信件标题
            toUid:0,
            type:"",//新建 or 编辑
            pid:0,//信件pid
            modal:"none",
            toList : [],// 收信人列表
            back:"",//背景图片
            ppid:0//ppid
        }
    }
    //返回Home
    backHome=()=>{
        //console.log(this.props);
        this.props.history.push("/home?to="+this.state.to);
    }
    //编辑信件内容
    Edit=(val)=>{
        this.setState({
            value : val
        })
    }
    componentDidMount(){
        var info = window.location.hash;
        // console.log(info);
        console.log(info.substr(13,info.length));
        var dataArr = info.substr(13,info.length);
        var arr  = dataArr.split("&");
        console.log(arr);
        //设置背景
        if(arr.length == 3){
            let ppid = arr[2].split("=")[1];
            console.log(ppid);
            this.$api.selBack().then(res=>{
                let imgList = res.data.data;
                console.log(imgList,ppid);
                for(let i=0;i<imgList.length;i++){
                    if(imgList[i].ppid == ppid){
                        //console.log(imgList[i].ppimage);
                        this.setState({
                            ppid : imgList[i].ppid,
                            back : "http://10.7.84.116:8000/paper/"+imgList[i].ppimage
                        })
                    }
                }
            })
        }
        var idArr = arr[0].split("=");
        var typeArr = arr[1].split("=");
        //console.log(idArr);
        if(idArr[0] == "pid"){  //编辑
            this.$api.getContent({pid : idArr[1]}).then(res=>{
                //console.log(res.data.data);
                let resData = res.data.data[0];
                this.setState({
                    to : resData.toNick,
                    title : resData.Ptitle,
                    value : resData.Pcontent,
                    toUid : resData.toUid,
                    type : typeArr[1],
                    pid : idArr[1],
                })
                this.$api.selBack().then(res=>{
                    let imgList = res.data.data;
                    console.log(imgList,resData.ppid);
                    for(let i=0;i<imgList.length;i++){
                        if(imgList[i].ppid == resData.ppid){
                            //console.log(imgList[i].ppimage);
                            this.setState({
                                ppid : imgList[i].ppid,
                                back : "http://10.7.84.116:8000/paper/"+imgList[i].ppimage
                            })
                        }
                    }
                })
            })
        }else if(idArr[0] == "toNick"){ //新建
            this.$api.getToUList().then(res=>{
                let list = res.data.data;
                //console.log(list);
                let toList = [];
                //console.log(decodeURI(arr[1]));
                var nick = decodeURI(idArr[1]);
                for(let i=0;i<list.length;i++){
                    toList.push(list[i].toNick);
                    if(list[i].toNick == nick){
                        //console.log(list[i]);
                        this.setState({
                            to : list[i].toNick,
                            toUid : null,
                            type : typeArr[1],
                        })
                    }
                }
                if(arr.length <3){
                    this.$api.selBack().then(res=>{
                        let imgList = res.data.data;
                        console.log(imgList);
                        this.setState({
                            ppid : imgList[0].ppid,
                            back : "http://10.7.84.116:8000/paper/"+imgList[0].ppimage
                        })
                    })
                }
                this.setState({
                    toList : toList
                })
            })
        }
    }
    //标题
    changeTitle=(e)=>{
        this.setState({
            title : e.target.value
        })
    }
    //保存
    submitLetter=()=>{
        // console.log(this.state.to);
        // console.log(this.state.title);
        // console.log(this.state.value);
        // console.log(this.state.toUid);
        let to = this.state.to;
        let title = this.state.title;
        let content = this.state.value;
        let id = this.state.toUid;
        let ppid = this.state.ppid;
        if( title == ""){
            alert("请填写标题");
        }else if(content == ""){
            alert("请填写信件内容");
        }else if(this.state.type == "create"){
            let timestamp = Date.parse(new Date());
            this.$api.writeLetter({Ptitle:title,Pcontent:content,toUid:id,toNick:to,Pday:timestamp,ppid:ppid}).then(res=>{
                console.log(res);
            })
            alert('WriteLetter', '保存成功', [
                { text: 'Ok', onPress: () => this.backHome },
            ])
        }else if(this.state.type == "edit"){
            let timestamp = Date.parse(new Date());
            let pid = this.state.pid;
            this.$api.editLetter({pid:pid,title:title,content:content,pday:timestamp,ppid:ppid}).then(res=>{
                console.log(res);
            })
            alert('', '修改成功', [
                { text: 'Ok', onPress: () =>{this.props.history.push('/home')} },
            ])
        }
    }
    tag = true;
    //其他收信人
    showList=()=>{
        if(this.tag){
            this.setState({
                modal : "block"
            })
            this.tag = false;
        }else{
            this.setState({
                modal : "none"
            })
            this.tag = true;
        }
    }
    //选择其他收信人
    changeTo=(item)=>{
        //console.log(item);
        this.setState({
            to : item,
            modal:"none"
        })
        this.tag = true;
    }
    //选择背景
    selback=()=>{
        //console.log(this.props.history.location.search);
        var back = this.props.history.location.search;
        this.props.history.push("/back"+back);
    }
    render() {
        //console.log(this.state.type,this.state.pid);
        //console.log(this.state.toList);
        //console.log(this.state.ppid);
        return (
            <div className="homeWrite">
                {/* 顶部 */}
                <div className="hw-top">
                    <div className="hw-top-span">
                        <span onClick={this.backHome}>取消</span>
                        <span style={{float:"right"}} onClick={this.submitLetter}>保存</span>
                    </div>
                </div>

                {/* 标题 */}
                <div className="hw-title">
                    <span className="hw_title">标题</span>
                    <input type="text" value={this.state.title} onChange={this.changeTitle} className="hw-inp" />
                </div>

                <div className="hw-to">
                    <div style={{padding:"0",margin:"0"}}>
                        To:
                        <span>
                            {this.state.to}
                        </span>
                        <button className="toElse" onClick={this.showList}>
                            给TA
                            <img style={{marginLeft:"3px"}} src={require("../imgs/Home/letter.png")} />
                        </button>
                        <div className="selectTo" style={{display:this.state.modal}}>
                            <ul>
                                {
                                    this.state.toList.map((item,index)=>{
                                        return <li key={index} onClick={()=>{this.changeTo(item)}}>
                                            {item}
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 内容 */}
                <div className="hw-write">
                <List>
                    <TextareaItem
                        value={this.state.value}
                        onChange={this.Edit}
                        style={{backgroundImage:"url("+this.state.back+")",backgroundSize:"100% 380px"}}
                        rows={17}
                        count={10000}
                    />
                </List>
                </div>

                {/* 底部 */}
                <div className="hw-bottom">
                    <img src={require("../imgs/Home/img.png")}  onClick={this.selback} />
                    <img src={require("../imgs/Home/DVR.png")}/>
                    <img src={require("../imgs/Home/music.png")}/>
                    <img src={require("../imgs/Home/set.png")} />
                </div>
            </div>
        )
    }
}

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
            toList : []// 收信人列表
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
        // console.log(info.substr(13,info.length));
        var pid = info.substr(13,info.length);
        var arr  = pid.split("&");
        var idArr = arr[0].split("=");
        var typeArr = arr[1].split("=");
        console.log(idArr);
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
                    pid : idArr[1]
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
        if( title == ""){
            alert("请填写标题");
        }else if(content == ""){
            alert("请填写信件内容");
        }else if(this.state.type == "create"){
            let timestamp = Date.parse(new Date());
            this.$api.writeLetter({Ptitle:title,Pcontent:content,toUid:id,toNick:to,Pday:timestamp}).then(res=>{
                console.log(res);
            })
            alert('WriteLetter', '保存成功', [
                { text: 'Ok', onPress: () => console.log('ok') },
            ])
        }else if(this.state.type == "edit"){
            let timestamp = Date.parse(new Date());
            let pid = this.state.pid;
            this.$api.editLetter({pid:pid,title:title,content:content,pday:timestamp}).then(res=>{
                console.log(res);
            })
            alert('EditLetter', '修改成功', [
                { text: 'Ok', onPress: () => console.log('ok') },
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
    render() {
        //console.log(this.state.type,this.state.pid);
        //console.log(this.state.toList);
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
                        className="TextArea"
                        rows={15}
                        count={10000}
                    />
                </List>
                </div>

                {/* 底部 */}
                <div className="hw-bottom">
                    <img src={require("../imgs/Home/makalong.png")} />
                    <img src={require("../imgs/Home/caomei.png")} />
                    <img src={require("../imgs/Home/caomei.png")} />
                    <img src={require("../imgs/Home/makalong.png")} />
                </div>
            </div>
        )
    }
}

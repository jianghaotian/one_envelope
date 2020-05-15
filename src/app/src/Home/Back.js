import React, { Component } from 'react';
import "../css/HomeWrite.css";
import { List, TextareaItem,Modal,Button } from 'antd-mobile';

const alert = Modal.alert;


export default class Back extends Component {
    constructor(){
        super();
        this.state = {
            imgList : []
        }
    }
    componentDidMount(){
        this.$api.selBack().then(res=>{
            //console.log(res.data.data);
            let imglist = [];
            let list = res.data.data;
            for(var i=0;i<list.length;i++){
                imglist.push(list[i]);
            }
            this.setState({
                imgList : imglist
            })
        })
        this.$api.isVip().then(res=>{
            console.log(res.data.data[0].Vip);
            this.setState({
                vip : res.data.data[0].Vip
            })
        })
    }
    back=()=>{
        var back = this.props.history.location.search;
        this.props.history.push("/homeWrite/"+back);
    }
    selImg=(item)=>{
        localStorage.setItem('customBack',false);
        let data = this.props.history.location.search;
        //console.log(data);
        let arr = data.split("&");
        //console.log(arr);
        let type = arr[1].split("=")[1];
        // console.log(type);
        let pid = arr[0].split("=");
        //console.log(item.ppid,pid[1]);
        if(this.state.vip == 0 && item.status ==1){
            alert('会员专属','是否要开通会员',
                [{
                    text:'取消',onPress:()=>{}
                },{
                    text:'看一看',onPress:()=>{ 
                        var urlinfo = this.props.history.location.search;
                        this.props.history.push('/vip'+urlinfo);
                    }
                }]);
        }
        else if(type == "edit" && arr.length<3 ){
            this.$api.changeBack({pid:pid[1],ppid : item.ppid}).then(res=>{
                //console.log(res);
            })
            this.props.history.push("/homeWrite/"+data+"&ppid="+item.ppid);
        }else if(type == "create" && arr.length<3){
            this.props.history.push("/homeWrite/"+data+"&ppid="+item.ppid);
        }else if(type == "create" && arr.length >2){
            arr.splice(2,1,"ppid="+item.ppid);
            //console.log(arr.join("&"));
            this.props.history.push("/homeWrite/"+arr.join("&"));
        }else if(type == "edit" && arr.length>2){
            arr.splice(2,1,"ppid="+item.ppid);
            //console.log(arr.join("&"));
            this.props.history.push("/homeWrite/"+arr.join("&"));
        }
        this.$api.showBgImg({pid:pid[1]}).then(res=>{
            //console.log(res);
            let data = res.data.data;
            if(data.length > 0){
                let bgImg = data[0].bgimage;
                let custom = data[0].custom;
                console.log(bgImg,custom);
                if(custom == 1){
                    console.log(bgImg,custom);
                    this.$api.delCustom({pid:pid[1],bgname : bgImg}).then(res=>{
                        console.log(res);
                    })
                }
            }
        })
    }
    vipImage=(item)=>{
        if(item.status == 1){
            return <span id="vipImage">vip</span>
        }
    }
    render() {
        //console.log(this.state.imgList);
        return (
            <div>
                <div className="back-top">
                    <span onClick={this.back}>返回</span>
                </div>
                <div className="back-img">
                    {
                        this.state.imgList.map((item,index)=>{
                            return <li key={index} onClick={()=>{this.selImg(item)}}>
                                <div className="back-imgBox">
                                    {
                                        this.vipImage(item)
                                    }
                                    <img src={"https://yf.htapi.pub/paper/"+item.ppimage}  style={{width:"100%",height:"130px"}} />
                                </div>
                            </li>
                        })
                    }
                </div>
            </div>
        )
    }
}

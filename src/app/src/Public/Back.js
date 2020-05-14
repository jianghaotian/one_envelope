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
        var urlinfo = this.props.history.location.search;
        // console.log(urlinfo);
        let arr1 = urlinfo.split("&");
        // console.log(arr1);
        if(arr1.length>1){
            //编辑：获取oid
            let type = arr1[0].split("=")[1];
            let oid = arr1[1].split("=")[1];
            this.setState({
                type : type,
                oid :oid
            })
        }else{
            //新建情况
            let type = arr1[0].split("=")[1];
            this.setState({
                type : type
            })
        }
        this.$api.selBack().then(res=>{
            // console.log(res.data.data);
            let imglist = [];
            let list = res.data.data;
            for(var i=0;i<list.length;i++){
                imglist.push(list[i]);
            }
            this.setState({
                imgList : imglist
            })
        })
    }
    back=()=>{
        var urlinfo = this.props.history.location.search;
        if(this.state.type == 'create'){
            this.props.history.push('pubWrite/'+urlinfo);
        }
    }
    selImg=(item)=>{     
        if(this.state.type == 'create'){
            this.props.history.push('/pubWrite/?type=create&ppid='+item.ppid);
        }else if(this.state.type == 'edit'){
            // console.log(this.state.oid);
            this.$api.changePubImg({oid:this.state.oid,ppid:item.ppid}).then(res=>{
                this.props.history.push('/pubWrite/?type=edit&Oid='+this.state.oid+'&ppid='+item.ppid);
            })
        }
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

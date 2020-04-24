import React, { Component } from 'react'
import "../css/HomeWrite.css"

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
        if(type == "edit" && arr.length<3 ){
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

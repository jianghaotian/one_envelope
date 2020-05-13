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
        var urlinfo = this.props.history.location.search;
        // console.log(urlinfo);
        let arr1 = urlinfo.split("&");
        // console.log(arr1);
        if(arr1.length>1){

        }else{
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
        // console.log(item);
        if(this.state.type == 'create'){
            this.props.history.push('/pubWrite/?type=create&ppid='+item.ppid);
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

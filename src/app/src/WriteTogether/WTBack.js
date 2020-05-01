import React, { Component } from 'react'
import "../css/HomeWrite.css"

export default class Back extends Component {
    constructor(){
        super();
        this.state = {
            imgList : [],
            lid:'',
            ppid:'',
            type :''
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
        let info = window.location.hash;
        let dataArr = info.split("&");
        let type = dataArr[0].split("=")[1];
        let lid = dataArr[1].split("=")[1];
        //console.log(type,lid);
        this.setState({
            lid : lid,
            type : type
        })
    }
    back=()=>{
        let lid = this.state.lid;
        let type = this.state.type;
        if(type == 'edit'){
            this.props.history.push("/togeContent/"+lid);
        }else{
            this.props.history.push("/togeContent/"+84);
        }
    }
    selImg=(item)=>{
        //console.log(item);
        let lid = this.state.lid;
        let type = this.state.type;
        if(type == 'edit'){
            this.props.history.push("/togeContent/"+lid+"?ppid="+item.ppid);
        }else{
            //this.props.history.push("/togeContent/lid"+"?ppid="+item.ppid);
        }
        
    }
    render() {
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

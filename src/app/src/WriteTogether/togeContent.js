import React, { Component } from 'react'
import '../css/togeCreate.css'
import { List, TextareaItem ,WingBlank,WhiteSpace,button} from 'antd-mobile';

import {HashRouter as Router,Link,Switch,Route} from 'react-router-dom'

export default class togeContent extends Component {
    constructor(){
        super();
        this.state={  
            data:[],
            tid:'',
            lid:'',      
            inputValue:"",        
            tit:"",
            timg:[],//图片数组
            isImgdel:false
        }        
    }
    componentDidMount(){
        //展示页面
        this.$api.showletter({lid:this.props.match.params.id}).then(res => {
            if (res.data.status === 0) {
                console.log(res);
                this.setState({
                    data:res.data.data,
                    tit:res.data.data[0].Ltitle,
                    inputValue: res.data.data[0].Lcontent,
                    tid:res.data.data[0].Tid,
                    lid:res.data.data[0].Lid,
                    isImgdel:false
                })
            }
        }) 
        this.$api.showTImg({Lid:this.props.match.params.id}).then(res => { 
            console.log(res.data)
            if (res.data.status === 0) {      
                this.setState({
                    timg:res.data.data,
                    isImgdel:false
                })
            }
        })
    }
    //更新页面
    changeLetter=(e)=>{
        var title = this.state.tit;
        var content=this.state.inputValue;
        var timestamp = Date.parse(new Date()); 
        this.$api.changeletter({lid:this.state.lid,title:title,content:content,lday:timestamp}).then(res => {
            if (res.data.status === 0) {
                console.log(res);
                this.setState({
                    data:res.data.data
                })
                this.totoge();
                console.log(this.state.data)
            }
        }) 
                // this.totoge();
    }
    totoge=()=>{
        this.props.history.push('/inviteWrite/'+this.state.tid);
    }
    textChange=(e)=>{
        console.log(e)
        this.setState({
            inputValue : e
        })
    }
    changeTit=(e)=>{
        console.log(e.target.value);
        this.setState({
            tit: e.target.value
        })
    }
    //选择背景
    selback=()=>{
        //console.log(this.props.history.location.search);
        var back = this.props.history.location.search;
        this.props.history.push("/back"+back);
    }
    //插入图片   
    onChange = (e) => {       
        console.log(e.target.files[0])          
        let picture = document.getElementById("picture").files[0];
        var reader = new FileReader();
        reader.readAsDataURL(picture);
        let src = picture.src;
        reader.onload=()=>{
            src = reader.result;
            console.log(src);
            this.$api.insertTImg({Lid:this.props.match.params.id,imgData:src}).then(res => { 
                console.log(res.data)
                if (res.data.status === 0) {      
                    this.setState({
                        timg:res.data.data,
                        isImgdel:false
                    })
                    this.$api.showTImg({Lid:this.props.match.params.id}).then(res => { 
                        if (res.data.status === 0) {      
                            this.setState({
                                timg:res.data.data,
                                isImgdel:false
                            })
                        }
                    })
                }
                console.log(this.state.timg);
            })   
        }       
    }

    delTimg=(e2)=>{
        let list = this.state.timg;
        console.log(list)
        console.log(e2)
        for(let i=0;i<list.length;i++){
            if(list[i] == e2){
                list.splice(i,1);
            }
        } 
        this.$api.delInsertTimg({lid:this.state.lid,insertImg:e2}).then(res => {      
            console.log(res)         
            if (res.data.status === 0) { 
                this.setState({
                    timg:list,
                    isImgdel:true
                }) 
                alert("删除成功");               
            }
        }) 
    }
    render() {
        console.log(this.state.lid)
        return (
            <div className='toge-body'>
                <div className="ge-body">
                    {/* 顶部 */}
                    <div className="ge-top">
                        <Link to={'/inviteWrite/'+this.state.tid}>
                            <span id="ge-cancel">
                                取消
                            </span>
                        </Link>                          
                        <span id="ge-save" onClick={this.changeLetter}>
                            保存
                        </span>                     
                    </div>

                    {/* 标题 */}
                    <div className="ge-title">
                        标题：
                        <input type="text" name="hw-title" id="ge-inp-title" value={this.state.tit} onChange={this.changeTit}/>
                    </div>

                    <span className='ge-cont'>内容：</span>
                    {/* 内容 */}
                    <div className="ge-content">                                                                               
                                <div style={{height:"100%"}}>
                                    <TextareaItem     
                                        rows={1}
                                        autoHeight
                                        placeholder="请输入内容"
                                        style={{backgroundColor:'transparent',paddingVertical: 5 }}
                                        value={this.state.inputValue}
                                        onChange={this.textChange}
                                        />                                  
                                    {this.state.timg.map((val)=> (   
                                        <div key={val} className="insertimg" style={{position:'relative'}} >                     
                                            <img src={"https://yf.htapi.pub/insertimg/"+val} alt=""style={{width: "100%",height: "90%"}}/> 
                                            <img src={require('../imgs/Home/musicCancle.png')} style={{position:'absolute',top:0,right:0}} 
                                                onClick={()=>this.delTimg(val)}
                                            />
                                        </div>
                                    ))}
                                </div>                                                  
                    </div>
                </div>

                {/* 底部 */}
                <div className="ge-bottom">
                    <img src={require("../imgs/Home/背景.png")} style={{width:"6%"}} onClick={this.selback} />
                    <img src={require("../imgs/Home/music(3).png")} style={{width:"7%"}} onClick={this.selectMusic} />
                    <label htmlFor='picture' style={{width:"7%"}}>
                        <input type="file" id='picture' style={{width:"0%"}} onChange={this.onChange}/>
                        <img src={require("../imgs/Home/tupian.png")} style={{width:"100%"}}/>
                    </label>
                </div>
                
            </div>
        )
    }
}
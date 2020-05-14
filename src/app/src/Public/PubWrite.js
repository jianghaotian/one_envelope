import React, { Component } from 'react';
import { List, TextareaItem,Modal,Button } from 'antd-mobile';

const alert = Modal.alert;

const weather = [
    {name:"晴"},
    {name:"多云"},
    {name:"小雨"},
    {name:"中雨"},
    {name:"大雨"},
    {name:"暴雨"},
    {name:"雷阵雨"},
    {name:"小雪"},
    {name:"中雪"},
    {name:"大雪"}
]

export default class PubWrite extends Component {
    constructor(){
        super();
        this.state = {
            type:'',
            title:'',
            anonymous:0,
            weatherBlock:'none',
            weather:"晴",
            value:'',
            oid : ''
        }
    }
    changeBackImg=(ppid)=>{
        this.setState({
            ppid : ppid
        })
        this.$api.selBack().then(res=>{
            let imgList = res.data.data;
            for(let i=0;i<imgList.length;i++){
                if(imgList[i].ppid == ppid){
                    this.setState({
                        back : "https://yf.htapi.pub/paper/"+imgList[i].ppimage
                    })
                }
            }
        })
    }
    //初始化
    componentDidMount(){
        let urlinfo = window.location.hash;
        let URLArr = urlinfo.split("?");
        // console.log(URLArr);
        let URLArr2 = URLArr[1].split("&");
        // console.log(URLArr2)
        //展示时获取oid
        let type = URLArr2[0].split("=")[1];
        console.log(type);
        this.setState({
            type : type
        })
        if(URLArr2.length>1 && (type == 'show' || type == 'edit')){
            //展示情况下获取oid
            var oid = URLArr2[1].split("=")[1];
            this.setState({
                oid : oid
            })
        }else if(URLArr2.length>1 && URLArr2.length<3 && type == 'create'){
            //在新建情况下切换背景
            var ppid = URLArr2[1].split("=")[1];
            // console.log(ppid);
            this.changeBackImg(ppid);
        }else if(URLArr2.length ==3 && type == 'edit'){
            console.log(this.state.type);
        }else{
            //新建信件
            this.$api.selBack().then(res=>{
                let imgList = res.data.data;
                // console.log(imgList);
                for(let i=0;i<imgList.length;i++){
                    this.setState({
                        ppid:60,
                        back : "https://yf.htapi.pub/paper/"+imgList[10].ppimage
                    })
                    
                }
            })
        }
        if(type == 'create'){
            var now = new Date().toLocaleDateString();
            this.setState({
                date : now,
                border:'2px dashed rgb(182, 182, 182)',
                bottom:"block",
                disabled : false,
                pointWeather:''
            })
        }else{
            if(type == 'show'){
                //展示信件
                this.setState({
                    bottom : 'none',
                    disabled : true,
                    pointWeather:'none'
                })
            }else if(type == 'edit'){
                //编辑信件
                this.setState({
                    border:'2px dashed rgb(182, 182, 182)',
                    disabled : false,
                    pointWeather:''
                })
            }
            this.$api.showPub({oid : oid}).then(res=>{
                console.log(res.data.data);
                if(res.data.data.length>0)
                {
                    let data = res.data.data[0];
                    if( data != "[]" ){
                        this.setState({
                            title : data.Otitle,
                            value : data.Ocontent,
                            weather:data.weather,
                            date:data.Oday,
                            ppid:data.ppid
                        })
                    }
                    if(type == 'edit'){
                        this.setState({
                            date : new Date().toLocaleDateString()
                        })
                    }
                    this.$api.selBack().then(res=>{
                        let imgList = res.data.data;
                        for(let i=0;i<imgList.length;i++){
                            if(imgList[i].ppid == data.ppid){
                                this.setState({
                                    back : "https://yf.htapi.pub/paper/"+imgList[i].ppimage
                                })
                            }
                        }
                    })
                }
            })
        }
    }
    //返回
    back=()=>{
        this.props.history.push("/Home/public");
    }
    //编辑内容
    Write=(val)=>{
        if(this.state.type == 'create' || this.state.type == 'edit'){
            this.setState({
                value : val            
            })
        }
    }
    //编辑标题
    getTitle=(val)=>{
        // console.log(val.target.value);
        this.setState({
            title : val.target.value
        })
    }
    //匿名
    setbtBg=()=>{
        if(!this.state.anonymous){
            this.setState({
                btBg : 'pink',
                anonymous:1
            })
        }else{
            this.setState({
                btBg : '',
                anonymous:0
            })
        }
    }
    //天气
    selectWeather=()=>{
        this.setState({
            weatherBlock:"block",
            disabled:true
        })
    }
    closeWeather=()=>{
        this.setState({
            weatherBlock:"none",
            disabled:false
        })
    }
    getWeather=(item)=>{
        // console.log(item.name);
        this.setState({
            weather:item.name,
            weatherBlock:"none",
            disabled:false
        })
    }
    //选择背景
    selectBack=()=>{
        if(this.state.type == 'create'){
            this.props.history.push("/pubBack?type=create");
        }else if(this.state.type == 'edit'){
            this.props.history.push("/pubBack?type=edit&Oid="+this.state.oid);
        }
    }
    //提交
    submit=()=>{
        let t = this.state.title;
        let content = this.state.value;
        // console.log(this.state.date);
        if(t==""){
            alert("标题不能为空哦")
        }else if(content==undefined){
            alert("请输入内容")
        }
        else{
           if(this.state.type == 'create'){
                alert('发布','确定发布公开信件吗',
                [{
                    text:'取消',onPress:()=>{}
                },{
                    text:'是的',onPress:()=>{ 
                        this.$api.WritePub({Otitle:t,Ocontent:content,Oday:this.state.date,ppid:this.state.ppid,weather:this.state.weather,anonymous:this.state.anonymous}).then(res=>{
                            // console.log(res);
                            alert('发布成功!');
                            this.props.history.push("/Home/public");
                        })
                        // console.log(t,content,this.state.date); 
                    }
                }]);
           }else if(this.state.type == 'edit'){
                alert('修改','确定修改信件吗',
                [{
                    text:'取消',onPress:()=>{}
                },{
                    text:'是的',onPress:()=>{ 
                        
                    }
                }]);
           }
        }
    }
    render() {
        return (
            <div>
                <div style={{backgroundImage:"url("+this.state.back+")"}} className="pw-back">
                    <img src={require('../imgs/public/返回(1).png')} id="pw-backPub" onClick={this.back} />
                    <div className="pw-title">
                        <input type='text' id="pw-title-p" value={this.state.title} onChange={this.getTitle} disabled={this.state.disabled} />
                        <p id="pw-date">{this.state.date}</p>
                        <img style={{pointerEvents:this.state.pointWeather}} src={require("../imgs/public/"+this.state.weather+".png")} id="tianqi" onClick={this.selectWeather} />
                        <div className="weather" style={{display:this.state.weatherBlock}}>
                            {/* <div> */}
                                <img onClick={this.closeWeather} id="weather-close" src={require("../imgs/public/关闭.png")} />
                            {/* </div> */}
                            <ul>
                            {
                                weather.map((item,index)=>{
                                    return <li onClick={()=>{this.getWeather(item)}}>
                                       <img src={require("../imgs/public/"+item.name+".png")} />
                                       <p style={{marginTop:"3px"}}>{item.name}</p>
                                    </li>
                                })
                            }
                            </ul>
                        </div>
                    </div>
                    <div className="pw-write" style={{border:this.state.border}}>
                        <TextareaItem
                            id="pw-textarea"
                            value={this.state.value}
                            onChange={this.Write}
                            rows={16}
                            disabled={this.state.disabled}
                            style={{color:"black"}}
                        />
                    </div>
                    <div className="pw-bottom" style={{display:this.state.bottom}}>
                        <img onClick={this.selectBack} src={require("../imgs/public/皮肤(1).png")} style={{height:'24px',marginLeft:"10px"}} />
                        <img src={require("../imgs/public/字体.png")} style={{height:'24px',marginLeft:"10px"}}  />
                        <Button id="pw-btn" onClick={this.submit}>完成</Button>
                        <Button id="pw-btn" style={{backgroundColor:this.state.btBg,color:"black"}} onClick={this.setbtBg}>匿名</Button>
                    </div>
                </div>
            </div>
        )
    }
}

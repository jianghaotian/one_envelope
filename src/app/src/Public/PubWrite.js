import React, { Component } from 'react';
import { List, TextareaItem,Modal,Button } from 'antd-mobile';
import axios from 'axios';
const alert = Modal.alert;

const ls = localStorage;

const weather = [
    {name:"晴"},
    {name:"多云"},
    {name:"阴"},
    {name:"雾"},
    {name:"沙尘"},
    {name:"小雨"},
    {name:"中雨"},
    {name:"大雨"},
    {name:"阵雨"},
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
            oid : '',
            zan:"zan1",
            like : false
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
        var URLArr2 = URLArr[1].split("&");
        // console.log(URLArr2)
        //展示时获取oid
        let type = URLArr2[0].split("=")[1];
        console.log(type);
        if(type== 'Ushow'){
            // console.log(URLArr2[2].split("=")[1])
            this.setState({
                UshowId : URLArr2[2].split("=")[1]
            })
        }
        this.setState({
            type : type
        })
        var BMap = window.BMap;//取出window中的BMap对象
        //根据城市获取天气
        var myCity = new BMap.LocalCity();
        myCity.get((res)=>{
            if (res.name) {
                // console.log(res)
                this.setState({
                    city : res.name
                })
                /*通过当前位置城市信息获取天气*/
                axios.get('http://wthrcdn.etouch.cn/weather_mini?city='+res.name)
                .then(res=>{
                    var day = res.data.data.forecast[0].type;
                    if(day.indexOf('转')>0){
                        var index = day.search('转')
                        day = day.substring(0,index);
                    }
                    this.setState({weather:day});
                });
            }
        })
        if(URLArr2.length>1 && (type == 'show'|| type == 'Ushow' || type == 'edit')){
            //展示情况下获取oid
            var oid = URLArr2[1].split("=")[1];
            this.setState({
                oid : oid
            })
            if(URLArr2.length == 3 && type == 'edit'){
                this.setState({
                    title : ls.getItem('pubTitle'),
                    value :ls.getItem('pubContent')
                })
            }
        }else if(URLArr2.length>1 && URLArr2.length<3 && type == 'create'){
            //在新建情况下切换背景
            var ppid = URLArr2[1].split("=")[1];
            // console.log(ppid);
            this.changeBackImg(ppid);
            this.setState({
                title : ls.getItem("pubTitle"),
                value : ls.getItem('pubContent')
            })
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
            if(type == 'show' || type == 'Ushow'){
                var myId;
                //展示信件
                this.setState({
                    bottom : 'none',
                    disabled : true,
                    pointWeather:'none'
                })  
                this.$api.getId().then(res=>{
                    // console.log(res.data.uid)
                    myId = res.data.uid;
                })     
                this.$api.getSignId({oid:oid}).then(res=>{
                    let likeList = res.data.data;
                    console.log(likeList);
                    for(let i =0;i<likeList.length;i++){
                        // console.log(likeList[i].uid)
                        if(likeList[i].uid == myId){
                            this.setState({
                                zan :'zan',
                                like : true
                            })
                        }
                    }
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
                // console.log(res.data.data);
                if(res.data.data.length>0)
                {
                    let data = res.data.data[0];
                    if( data != "[]" ){
                        if(URLArr2.length<3 || (URLArr2.length==3 && this.state.type =='Ushow')){
                            this.setState({
                                title : data.Otitle,
                                value : data.Ocontent
                            })
                        }
                        this.setState({
                            weather:data.weather,
                            date:data.Oday,
                            ppid:data.ppid
                        })
                        if(data.anonymous == 1){
                            this.setState({
                                btBg : 'pink',
                                anonymous:1
                            })
                        }
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
        if(this.state.type == 'Ushow'){
            this.props.history.push("/Userinfo?uid="+this.state.UshowId);
        }else{
            this.props.history.push("/Home/public");
        }
    }
    //编辑内容
    Write=(val)=>{
        ls.setItem("pubContent",val);
        if(this.state.type == 'create' || this.state.type == 'edit'){
            this.setState({
                value : ls.getItem('pubContent')         
            })
        }
    }
    //编辑标题
    getTitle=(val)=>{
        ls.setItem("pubTitle",val.target.value);
        // console.log(ls.getItem('pubTitle'));
        this.setState({
            title : ls.getItem('pubTitle')
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
        var t = this.state.title;
        var content = this.state.value;
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
                        this.$api.WritePub({Otitle:t,Ocontent:content,Oday:this.state.date,ppid:this.state.ppid,weather:this.state.weather,anonymous:this.state.anonymous,city:this.state.city}).then(res=>{
                            // console.log(res);
                            alert('发布成功!');
                            this.props.history.push("/Home/public");
                        })
                        // console.log(t,content,this.state.date); 
                    }
                }]);
           }else if(this.state.type == 'edit'){
               console.log(this.state.oid,t,content,this.state.date,this.state.weather);
                alert('修改','确定修改信件吗',
                [{
                    text:'取消',onPress:()=>{}
                },{
                    text:'是的',onPress:()=>{ 
                        this.$api.EditPubLetter({oid:this.state.oid,Otitle:t,Ocontent:content,Oday:this.state.date,weather:this.state.weather}).then(res=>{
                            alert('修改成功!');
                            this.props.history.push("/Home/public");
                            // console.log(res);
                        })
                    }
                }]);
           }
        }
    }
    Like=()=>{
        if(this.state.type == 'show' || this.state.type == 'Ushow'){
            return <div id='good' onClick={this.addLike}>
            <img src={require("../imgs/public/"+this.state.zan+".png")} id='zan' />
            </div>
        }
    }
    addLike=()=>{
        //点赞
        if(!this.state.like){
            this.setState({
                zan :'zan',
                like : true
            })
            // console.log(this.state.oid)
            this.$api.addLikes({oid : this.state.oid}).then(res=>{
                // console.log(res);
            })
        }else{
            //取消赞
            this.setState({
                zan :'zan1',
                like : false
            })
            this.$api.cancleLikes({oid : this.state.oid}).then(res=>{
                // console.log(res);
            })
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
                                       <img style={{width:'22px'}} src={require("../imgs/public/"+item.name+".png")} />
                                       <p style={{marginTop:"3px"}}>{item.name}</p>
                                    </li>
                                })
                            }
                            </ul>
                        </div>
                    </div>
                    {
                        this.Like()
                    }
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

import React, { Component } from 'react';
import "../css/HomeWrite.css";
import { List, TextareaItem,Modal,Button } from 'antd-mobile';

const alert = Modal.alert;

const color = [
    {backgroundColor:'pink'},
    {backgroundColor:'red'},
    {backgroundColor:'purple'},
    {backgroundColor:'grey'},
    {backgroundColor:'lightblue'},
    {backgroundColor:'black'},
    {backgroundColor:'green'}
];

const ls = localStorage;

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
            ppid:0,//ppid
            colorState:{display:'none'},//字体颜色
            colorTag:false,
            fontColor:"",
            musicName:'',
            musicShow:{display:'none'},
            musicTag:false,
        }
    }
    //返回Home
    backHome=()=>{
        //console.log(this.props);
        ls.setItem('color','');
        ls.setItem('LetterContent','');
        ls.setItem('LetterTitle','');
        this.props.history.push("/home?to="+this.state.to);
    }
    //编辑信件内容
    Edit=(val)=>{
        ls.setItem('LetterContent',val);
        this.setState({
            value : val
        })
    }
    setMusicUrl=(url)=>{
        let audio = document.getElementById("audio");
        audio.src = 'https://yf.htapi.pub/music/'+url;
    }
    componentDidMount(){
        var info = window.location.hash;
        // console.log(info);
        //console.log(info.substr(13,info.length));
        var dataArr = info.substr(13,info.length);
        var arr  = dataArr.split("&");
        //console.log(arr);
        //设置背景
        if(arr.length == 3){
            let ppid = arr[2].split("=")[1];
            //console.log(ppid);
            this.$api.selBack().then(res=>{
                let imgList = res.data.data;
                //console.log(imgList,ppid);
                for(let i=0;i<imgList.length;i++){
                    if(imgList[i].ppid == ppid){
                        //console.log(imgList[i].ppimage);
                        this.setState({
                            ppid : imgList[i].ppid,
                            back : "https://yf.htapi.pub/paper/"+imgList[i].ppimage
                        })
                    }
                }
            })
        }
        var idArr = arr[0].split("=");
        var typeArr = arr[1].split("=");
        //console.log(idArr);
        if(idArr[0] == "pid" ){  //编辑
            var musicUrl;
            //获取信件信息
            this.$api.getContent({pid : idArr[1]}).then(res=>{
                console.log(res.data.data);
                let resData = res.data.data[0];
                this.setState({
                    to : resData.toNick,
                    title : resData.Ptitle,
                    value : resData.Pcontent,
                    toUid : resData.toUid,
                    type : typeArr[1],
                    pid : idArr[1],
                    fontColor:resData.color
            })
            //getMusic
            this.$api.showMusic({pid:idArr[1]}).then(res=>{
                //console.log(res.data.data);
                musicUrl = res.data.data;
                let regMusic = /.*(.mp3)$/gi
                if(regMusic.test(musicUrl)){
                    this.setMusicUrl(musicUrl);
                }else{
                    console.log('dont have music');
                }
            })
                //console.log(this.state.fontColor);
                if(arr.length<3){
                    ls.setItem('LetterContent',this.state.value);
                    ls.setItem('color',this.state.fontColor);
                    ls.setItem('LetterTitle',this.state.title);
                    let bgImg;
                    let custom;
                    this.$api.showBgImg({pid:idArr[1]}).then(res=>{
                        //console.log(res.data.data);
                        let rd = res.data.data;     
                        bgImg = rd[0].bgimage;
                        custom = rd[0].custom;
                        //console.log(bgImg,custom);
                        if(custom == 1){
                            console.log('custom');         
                            this.setState({
                                back : 'https://yf.htapi.pub/pbgimage/'+bgImg
                            })          
                        }else{
                            this.$api.selBack().then(res=>{
                                let imgList = res.data.data;
                                //console.log(imgList);
                                for(let i=0;i<imgList.length;i++){
                                    if(imgList[i].ppid == resData.ppid){
                                        //console.log(imgList[i].ppid);
                                        this.setState({
                                            ppid : imgList[i].ppid,
                                            back : "https://yf.htapi.pub/paper/"+imgList[i].ppimage
                                        })
                                    }
                                }
                            })
                        }
                    }) 
                }else if(arr.length>2){
                    this.setState({
                        title : ls.getItem('LetterTitle'),
                        value : ls.getItem('LetterContent'),
                        fontColor : ls.getItem('color')
                    })
                }
            })
        }else if(idArr[0] == "toNick"){ //新建
            this.setState({
                title : ls.getItem('LetterTitle'),
                value : ls.getItem('LetterContent'),
                fontColor : ls.getItem('color'),
                type : typeArr[1]
            })
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
                    let custom = ls.getItem('customBack');
                    if(custom == 'true'){
                        this.setState({
                            back : ls.getItem('cbackSrc')
                        })
                    }
                    else{
                        this.$api.selBack().then(res=>{
                            let imgList = res.data.data;
                            //console.log(imgList);
                            this.setState({
                                ppid : imgList[0].ppid,
                                back : "https://yf.htapi.pub/paper/"+imgList[0].ppimage
                            })
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
        ls.setItem('LetterTitle',e.target.value);
    }
    //保存
    submitLetter=()=>{
        ls.setItem('color','');
        ls.setItem('LetterContent','');
        ls.setItem('LetterTitle','');
        // console.log(this.state.to);
        // console.log(this.state.title);
        // console.log(this.state.value);
        // console.log(this.state.toUid);
        let to = this.state.to;
        let title = this.state.title;
        let content = this.state.value;
        let id = this.state.toUid;
        let ppid = this.state.ppid;
        let fontColor = this.state.fontColor;
        if( title == ""){
            alert("请填写标题");
        }else if(content == ""){
            alert("请填写信件内容");
        }else if(this.state.type == "create"){
            let timestamp = Date.parse(new Date());
            let mp3 = ls.getItem('createMp3');
            this.$api.writeLetter({Ptitle:title,Pcontent:content,toUid:id,toNick:to,Pday:timestamp,ppid:ppid,color:fontColor,mp3Data:mp3}).then(res=>{
                //console.log(res);
            })
            
            alert('WriteLetter', '保存成功', [
                { text: 'Ok', onPress: () => {
                    console.log('ok');
                    this.props.history.push("/home?to="+this.state.to);
                } },
            ])
        }else if(this.state.type == "edit"){
            let timestamp = Date.parse(new Date());
            let pid = this.state.pid;
            let name ;
            this.$api.showMusic({pid : pid}).then(res=>{
                let resData = res.data.data;
                name = resData[0];
                console.log(name);
            })
            this.$api.editLetter({pid:pid,title:title,content:content,pday:timestamp,ppid:ppid,color:fontColor,music:name}).then(res=>{
                //console.log(res);
            })
            alert('EditLetter', '修改成功', [
                { text: 'Ok', onPress: () => {
                    //console.log('ok');
                    this.props.history.push("/home?to="+this.state.to);
                } },
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
    //选择音乐
    selectMusic=()=>{
        if(!this.state.musicTag){
            this.setState({
                musicShow:{display:'block'},
                musicTag:true
            })
        }else{
            this.setState({
                musicShow:{display:'none'},
                musicTag:false
            })
        }
    }
    playMusic=()=>{
        //上传音乐
        let audio = document.getElementById("audio");
        let pid = this.state.pid;
        //console.log(pid);
        //console.log(audio.src);
        let src = audio.src;
        //console.log(src);
        if(pid && src != ""){
            this.$api.postMusic({pid:pid,mp3Data:src}).then(res=>{
                //console.log(res);
                alert('插入成功');
                this.setState({
                    musicShow:{display:'none'},
                    musicTag:false
                })
            })
            
        }else if(src == ""){
            alert("您还没有选择音乐哦");
        }else{
            console.log('create');
            ls.setItem('createMp3',src);
            alert('插入成功');
            this.setState({
                musicShow:{display:'none'},
                musicTag:false
            })
        }

    }
    deleteMusic=()=>{
        let info = window.location.hash;
        let dataArr = info.substr(13,info.length);
        let arr  = dataArr.split("&");
        let idArr = arr[0].split("=");
        let typeArr = arr[1].split("=");
        let audio = document.getElementById("audio");
        let name;
        this.$api.showMusic({pid : idArr[1]}).then(res=>{
            let resData = res.data.data;
            name = resData[0];
        })
        alert('删除', '确认删除?', [
            { text: '留着', onPress: () => {
                console.log('cancel');
            } },
            { text: '不要啦', onPress: () => {
                if(typeArr[1] == "edit"){
                    this.$api.delMusic({pid:idArr[1],music:name}).then(res=>{
                        console.log(res);
                        audio.src = '';
                        alert('删除成功');
                    })
                }else{
                    //console.log('create');
                    audio.src = '';
                    this.setState({
                        musicName : ''
                    })
                }
            }},
        ]);
    }
    getMusic=()=>{
        console.log('change');
        let music = document.getElementById('MusicFile').files[0];
        //console.log(music);
        let audio = document.getElementById("audio");
        let load = document.getElementById("loading");
        //检查文件类型
        // if (!/audio\/\w+/.test(music.type)) {
        //     alert("只能选择音频文件")
        //     return false;
        // }
        //console.log(music);
        this.setState({
            musicName : music.name
        })
        
        var reader = new FileReader();
        reader.readAsDataURL(music);
        reader.onprogress=function(){
            load.style.display = "block";
        }
        reader.onload=function(){
            //console.log(reader.result);
            audio.src = reader.result;
            load.style.display = "none";
        }
    }
     
    fontColor=()=>{
        if(!this.state.colorTag){
            this.setState({
                colorState:{display:"block"},
                colorTag:true
            })
        }else{
            this.setState({
                colorState:{display:"none"},
                colorTag:false
            })
        }
    }
    changeFontColor=(item)=>{
        //console.log(item.backgroundColor);
        this.setState({
            fontColor : item.backgroundColor
        })
        ls.setItem('color',item.backgroundColor);
    }
    selectImg=()=>{
        let pid = this.state.pid;
        let type = this.state.type;
        if(type == 'edit'){
            this.props.history.push('/cback?pid='+pid+'&type='+type);
        }else{
            //console.log('create');
            //console.log(this.state.to);
            this.props.history.push('/cback?toNick='+this.state.to+'&type='+type);
        }
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
                            id="textBox"
                            value={this.state.value}
                            onChange={this.Edit}
                            style={{backgroundImage:"url("+this.state.back+")",backgroundSize:"100% 447px",color:this.state.fontColor}}
                            rows={18}
                            count={10000}
                            onClick={()=>{
                                this.setState({
                                    colorState:{display:"none"},
                                    colorTag:false,
                                    musicTag:false,
                                    musicShow:{display:"none"}
                                })
                            }}
                        />
                    </List>
                </div>

                {/* 底部 */}
                <div className="hw-bottom">
                    <img src={require("../imgs/Home/背景.png")} onClick={this.selback} />
                    <img src={require("../imgs/Home/music(3).png")} onClick={this.selectMusic} />
                    <img src={require("../imgs/Home/tupian.png")} onClick={this.selectImg} />
                    <div id="fontColor">
                        <img src={require("../imgs/Home/color.png")} onClick={this.fontColor} />
                        <div id="color" style={this.state.colorState}>
                            <ul>
                               {
                                   color.map((item,index)=>{
                                       return <li className="s-color" style={item} onClick={()=>{this.changeFontColor(item)}} ></li>
                                   })
                               }
                            </ul>
                        </div>
                    </div>
                </div>
                
                {/* 插入音乐 */}
                <div className="Music" style={this.state.musicShow}>
                    <input type= 'file' id="MusicFile" onChange={this.getMusic} />
                    <img src={require('../imgs/Home/musicCancle.png')} style={{float:"right",marginRight:'5px'}} onClick={()=>{
                        this.setState({
                            musicTag:false,
                            musicShow:{display:"none"}
                        })
                    }} />
                    <br />
                    <label htmlFor="MusicFile">
                        <span id="sp-addMusci" >选择音乐</span>
                    </label>
                    <span>{this.state.musicName}</span>
                    <audio  controls="controls" id="audio" autoPlay="autoplay" loop="loop"></audio>
                    <p style={{display:'none'}} id="loading">正在加载...</p>
                    <div className="music-up">
                        <button className="music-btn" onClick={this.playMusic}>确认添加</button>
                        <button className="music-btn" onClick={this.deleteMusic}>删除音乐</button>
                    </div>
                </div>
            </div>
        )
    }
}

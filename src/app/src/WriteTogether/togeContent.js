import React, { Component } from 'react'
import '../css/togeCreate.css'
import "../css/HomeWrite.css";

import { List, TextareaItem ,WingBlank,WhiteSpace,button,Modal} from 'antd-mobile';

import {HashRouter as Router,Link,Switch,Route} from 'react-router-dom'
const alert = Modal.alert;

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
            isImgdel:false,
            musicName:'',
            musicShow:{display:'none'},
            musicTag:false,
            backImg:'',
            ppid:null
        }        
    }
    setMusicUrl=(url)=>{
        let audio = document.getElementById("audio");
        audio.src = 'https://yf.htapi.pub/music/'+url;
    }
    componentDidMount(){
        let info = window.location.hash;
        let infoArr = info.split("=");
        let ppid = infoArr[1];
        //展示页面
        this.$api.showletter({lid:this.props.match.params.id}).then(res => {
            if (res.data.status === 0) {
                // console.log(res.data.data);
                this.setState({
                    data:res.data.data,
                    tit:res.data.data[0].Ltitle,
                    inputValue: res.data.data[0].Lcontent,
                    tid:res.data.data[0].Tid,
                    lid:res.data.data[0].Lid,
                    isImgdel:false,
                    imgId:res.data.data[0].ppid
                })
                if(this.state.imgId != null && infoArr.length<2){
                    // console.log(this.state.imgId);
                    this.$api.selBack().then(res=>{
                        let imgList = res.data.data;
                        for(let i=0;i<imgList.length;i++){
                            if(imgList[i].ppid == this.state.imgId){
                                this.setState({
                                    backImg : "https://yf.htapi.pub/paper/"+imgList[i].ppimage
                                })
                            }
                        }
                    })
                }else if(this.state.imgId == null){
                    this.setState({
                        backImg :'https://yf.htapi.pub/paper/1597538468975_22.png'
                    })
                }else if(infoArr.length == 2){
                    this.$api.selBack().then(res=>{
                        let imgList = res.data.data;
                        for(let i=0;i<imgList.length;i++){
                            if(imgList[i].ppid == ppid){
                                this.setState({
                                    imgId : ppid,
                                    backImg : "https://yf.htapi.pub/paper/"+imgList[i].ppimage
                                })
                            }
                        }
                    })
                }
            }
        }) 
        this.$api.showTImg({Lid:this.props.match.params.id}).then(res => { 
            //console.log(res.data)
            if (res.data.status === 0) {      
                this.setState({
                    timg:res.data.data,
                    isImgdel:false
                })
            }
        })
        var musicUrl;
        let name;
        this.$api.showTmus({lid:this.props.match.params.id}).then(res=>{
            //console.log(res.data.data);
            musicUrl = res.data.data;
            let resData = res.data.data;
            let regMusic = /.*(.mp3)$/gi
            if(regMusic.test(musicUrl)){
                this.setMusicUrl(musicUrl);               
                name = resData[0];            
            }else{
                //console.log('dont have music');
            }
        })
        
    }
    //更新页面
    changeLetter=(e)=>{
        var title = this.state.tit;
        var content=this.state.inputValue;
        var timestamp = Date.parse(new Date()); 
        this.$api.changeletter({lid:this.state.lid,title:title,content:content,lday:timestamp,ppid:this.state.imgId}).then(res => {
            if (res.data.status === 0) {
                // console.log(res);
                this.setState({
                    data:res.data.data
                })
                alert('EditLetter', '保存成功', [
                    { text: 'Ok', onPress: () => {
                        this.totoge();
                    } },
                ])
                
                // console.log(this.state.data)
            }
        }) 
                this.totoge();
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
        // console.log(this.state.lid)
        this.props.history.push("/wtBack?type=edit&pid="+this.state.lid);
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
        let lid = this.state.lid;
        //console.log(pid);
        //console.log(audio.src);
        let src = audio.src;
        //console.log(src);
        if(lid && src != ""){
            this.$api.InsertTmus({lid:lid,mp3Data:src}).then(res=>{
                //console.log(res);
                alert('插入成功');
            })
        }else if(src == ""){
            alert("您还没有选择音乐哦");
        }else{
            console.log('create');
        }

    }
    deleteMusic=()=>{
        let audio = document.getElementById("audio");
        let name;
        this.$api.showTmus({lid : this.props.match.params.id}).then(res=>{
            let resData = res.data.data;
            name = resData[0];
        })
        alert('删除', '确认删除?', [
            { text: '留着', onPress: () => {
                console.log('cancel');
            } },
            { text: '不要啦', onPress: () => {                
                    this.$api.delInsertTmus({lid:this.props.match.params.id,music:name}).then(res=>{
                        console.log(res);
                        audio.src = '';
                        alert('删除成功');
                    })               
                    //console.log('create');
                    audio.src = '';
                    this.setState({
                        musicName : ''
                    })
               
            }},
        ]);
    }
    getMusic=()=>{
        console.log('change');
        let music = document.getElementById('MusicFile').files[0];
        console.log(music);
        let audio = document.getElementById("audio");
        let load = document.getElementById("loading");
        //检查文件类型
        if (!/audio\/\w+/.test(music.type)) {
            alert("只能选择音频文件")
            return false;
        }
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
    //插入图片   
    selectimg = (e) => {       
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
    //删除图片
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
                alert("是否删除");               
            }
        }) 
    }
    render() {
        return (
            <div className='toge-body' style={{backgroundImage:"url("+this.state.backImg+")",backgroundSize:'100% 100%'}}>
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
                                        onClick={()=>{
                                            this.setState({
                                                colorState:{display:"none"},
                                                colorTag:false,
                                                musicTag:false,
                                                musicShow:{display:"none"}
                                            })
                                        }}
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
                        <input type="file" id='picture' style={{width:"0%"}} onChange={this.selectimg}/>
                        <img src={require("../imgs/Home/tupian.png")} style={{width:"100%"}}/>
                    </label>
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
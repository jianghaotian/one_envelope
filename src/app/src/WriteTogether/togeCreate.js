import React, { Component } from 'react'
import '../css/togeCreate.css'
import { List, TextareaItem,Toast } from 'antd-mobile';
import {HashRouter as Router,Link,Switch,Route} from 'react-router-dom'
const ls = localStorage;
export default class togeCreate extends Component {
    constructor(){
        super();
        this.state = {
            inputValue:"",
            inputTitle:"",
            data:[] ,
            files:'',
            backImg:'',
            picture:'',
            insetPic:''//插入图片名称
        }
    }
    
    addLetter=()=>{
        var title = this.state.inputTitle;
        var content=this.state.inputValue;
        var timestamp = Date.parse(new Date()); 
        let img = ls.getItem('onepic');

        if(title == undefined || title ==""){
            alert("请填写昵称");
        }else{
            this.$api.addletter({tid:this.props.match.params.id,title:title,content:content,lday:timestamp,imgArr:img}).then(res => {                     
                if (res.data.status === 0) {                
                    this.setState({
                        insetPic:res.data.data,
                        picture : "https://yf.htapi.pub/insertimg/"+res.data.data             
                    })                
                    Toast.success('创建成功', 1);
                    this.totoge();
                }         
            }) 
            ls.removeItem('onepic');
        }

    }
    totoge=()=>{
        this.props.history.push('/inviteWrite/'+this.props.match.params.id);
    }
    componentDidMount(){
        this.refs.input1.value="";
        //背景
        let info = window.location.hash;
        let infoArr = info.split("=");
        if(infoArr.length == 2){
            let ppid = infoArr[1];
            this.$api.selBack().then(res=>{
                let imgList = res.data.data;
                for(let i=0;i<imgList.length;i++){
                    if(imgList[i].ppid == ppid){
                        this.setState({
                            backImg : "https://yf.htapi.pub/paper/"+imgList[i].ppimage
                        })
                    }
                }
            })
        }else{
            this.setState({
                backImg :'https://yf.htapi.pub/paper/1597538468975_22.png'
            })
        }
    }
    textChange=(e)=>{
        // console.log(e)
        this.setState({
            inputValue : e
        })
    }
    titleChange=()=>{
        this.setState({
            inputTitle : this.refs.input1.value,
           
        })
    }
    selback=()=>{
    //    this.props.history.push("/wtBack?type=create&lid=null");
    }
    //插入图片
    selectimg = (e) => {       
        console.log(e.target.files[0])          
        let picture = document.getElementById("picture").files[0];
        var reader = new FileReader();
        reader.readAsDataURL(picture);
        reader.onload=()=>{
            this.src = reader.result;
            ls.setItem('onepic',this.src);

        }  
    }
    // 删除图片
    delTimg=(e2)=>{
        let pic = this.state.insetPic;
        if(e2 == pic){
            this.setState({
                imgArr:''
            }) 
        }
    }
    render() {
        return (
            // <script type='text/javascript' src='jquery-1.9.js'></script>
            <div className='toge-body' style={{backgroundImage:"url("+this.state.backImg+")",backgroundSize:'100% 100%'}}>
                <div className="ge-body">
                    {/* 顶部 */}
                    <div className="ge-top">
                        <Link to={'/inviteWrite/'+this.props.match.params.id}>
                            <span id="ge-cancel">
                                取消
                            </span>
                        </Link>
                        <span id="ge-save" onClick={this.addLetter}>
                            保存
                        </span>
                    </div>
                    {/* 标题 */}
                    <div className="ge-title">
                        标题：
                        <input type="text" name="ge-title" ref="input1" onChange={this.titleChange.bind(this)} id="ge-inp-title" />
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
                            <div className="insertimg" style={{position:'relative'}}>  
                                <img src={this.state.picture} alt=""style={{width: "100%",height: "90%"}}/> 
                                {
                                    this.state.insetPic=='' ? <div></div> : 
                                    <img src={require('../imgs/Home/musicCancle.png')} style={{position:'absolute',top:0,right:0}} 
                                    onClick={()=>this.delTimg(this.state.insetPic)}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* 底部 */}
                <div className="ge-bottom">
                    <img src={require("../imgs/Home/背景.png")} style={{width:"6%"}} onClick={this.selback} />
                    <img src={require("../imgs/Home/music(3).png")} style={{width:"7%"}} onClick={this.selectMusic} />
                    <label htmlFor='picture' style={{width:"7%"}}>
                        <input type="file" id='picture' style={{width:"0%"}} onChange={this.selectimg} />
                        <img src={require("../imgs/Home/tupian.png")} style={{width:"100%"}}/>
                    </label>
                </div>
                
            </div>
        )
    }
}
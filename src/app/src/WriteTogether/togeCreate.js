import React, { Component } from 'react'
import '../css/togeCreate.css'
import { List, TextareaItem } from 'antd-mobile';
import {HashRouter as Router,Link,Switch,Route} from 'react-router-dom'

export default class togeCreate extends Component {
    constructor(){
        super();
        this.state = {
            inputValue:"",
            inputTitle:"",
            data:[{}] ,
        }
    }
    
    addLetter=()=>{
        var title = this.state.inputTitle;
        var content=this.state.inputValue;
        var timestamp = Date.parse(new Date()); 
        if(content == undefined || content ==""){
            alert("请填写昵称");
        }else{
            this.$api.addletter({tid:this.props.match.params.id,title:title,content:content,lday:timestamp}).then(res => {                     
                if (res.data.status === 0) {                
                    this.setState({
                        data:res.data.data                   
                    })                    
                    alert("创建成功~");
                    this.totoge();
                    console.log(this.state.data);
                }         
            }) 
            
        }
    }
    totoge=()=>{
        this.props.history.push('/inviteWrite/'+this.props.match.params.id);
    }
    componentDidMount(){
        this.refs.input1.value=""
    }
    textChange=(e)=>{
        console.log(e)
        this.setState({
            inputValue : e
        })
    }
    titleChange=()=>{
        this.setState({
            inputTitle : this.refs.input1.value,
           
        })
    }
    render() {
        return (
            <div className='toge-body'>
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
                            <TextareaItem     
                                rows={17}
                                placeholder="请输入内容"
                                style={{backgroundColor:'transparent'}}
                                value={this.state.inputValue}
                                onChange={this.textChange}
                            />
                        
                    </div>
                </div>

                {/* 底部 */}
                <div className="ge-bottom">
                    <div>
                        <img src={require("../imgs/Home/img.png")} style={{width:"90%",height:"27px"}} />
                    </div>
                    <div>
                        <img src={require("../imgs/Home/DVR.png")}style={{width:"100%",height:"30px"}} />
                    </div>
                    <div>
                        <img src={require("../imgs/Home/music.png")}style={{width:"90%",height:"27px"}} />
                    </div>
                    <div>
                        <img src={require("../imgs/Home/set.png")}style={{width:"90%",height:"27px"}} />
                    </div>
                </div>
            </div>
        )
    }
}
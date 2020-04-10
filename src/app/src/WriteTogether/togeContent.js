import React, { Component } from 'react'
import '../css/togeCreate.css'
import { List, TextareaItem } from 'antd-mobile';
import {HashRouter as Router,Link,Switch,Route} from 'react-router-dom'

export default class togeContent extends Component {
    constructor(){
        super();
        this.state={  
            data:[{Ltitle:''}],
            tid:'',
            lid:'',      
            inputValue:"",        
            tit:""
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
                    lid:res.data.data[0].Lid
                })
                console.log(this.state.data)

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
    render() {
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
                        {/* <img src={require("../imgs/Home/music.png")}style={{width:"90%",height:"27px"}} /> */}
                    </div>
                    <div>
                        <img src={require("../imgs/Home/set.png")}style={{width:"90%",height:"27px"}} />
                    </div>
                </div>
            </div>
        )
    }
}
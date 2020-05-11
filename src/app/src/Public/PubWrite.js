import React, { Component } from 'react';
import { List, TextareaItem,Modal,Button } from 'antd-mobile';

const alert = Modal.alert;

export default class PubWrite extends Component {
    constructor(){
        super();
        this.state = {
            type:''
        }
    }
    componentDidMount(){
        let urlinfo = window.location.hash;
        let URLArr = urlinfo.split("?");
        let type = URLArr[1].split("=")[1];
        console.log(type);
        this.setState({
            type : type
        })
        if(type == 'create'){
            var now = new Date().toLocaleDateString();
            this.setState({
                date : now,
                border:'2px dashed rgb(182, 182, 182)',
                bottom:"block",
                disabled : false
            })
        }else{
            this.setState({
                bottom : 'none',
                disabled : true
            })
        }
    }
    back=()=>{
        this.props.history.push("/Home");
    }
    Write=(val)=>{
        if(this.state.type == 'create'){
            this.setState({
                value : val            
            })
        }
    }
    submit=()=>{
        alert('发布','确定发布公开信件吗',
        [{
            text:'取消',onPress:()=>{}
        },{
            text:'是的',onPress:()=>{}
        }]);
    }
    render() {
        return (
            <div>
                <div style={{}} className="pw-back">
                    <img src={require('../imgs/public/返回.png')} id="pw-backPub" onClick={this.back} />
                    <div className="pw-title">
                        <p id="pw-title-p">写给亲爱的大傻逼</p>
                        <p id="pw-date">{this.state.date}</p>
                        <img src={require('../imgs/public/晴.png')} id="tianqi" />
                    </div>
                    <div className="pw-write" style={{border:this.state.border}}>
                        <TextareaItem
                            id="pw-textarea"
                            value={this.state.value}
                            onChange={this.Write}
                            rows={16}
                            disabled={this.state.disabled}
                        />
                    </div>
                    <div className="pw-bottom" style={{display:this.state.bottom}}>
                        <img src={require("../imgs/public/皮肤(1).png")} style={{height:'24px',marginLeft:"10px"}} />
                        <img src={require("../imgs/public/字体.png")} style={{height:'24px',marginLeft:"10px"}}  />
                        <Button id="pw-btn" onClick={this.submit}>完成</Button>
                    </div>
                </div>
            </div>
        )
    }
}

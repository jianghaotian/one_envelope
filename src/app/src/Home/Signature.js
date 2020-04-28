import React, { Component } from 'react'
import '../css/home.css';
import { List, TextareaItem,Modal,Button } from 'antd-mobile';

const alert = Modal.alert;

export default class Signature extends Component {
    constructor(){
        super();
        this.state = {
            signature :''
        }
    }
    edit = (val)=>{
        this.setState({
            signature : val
        })
    }
    back=()=>{
        this.props.history.push('/home');
    }
    publish=()=>{
        console.log(this.state.signature);
        this.$api.changeSignature({signature:this.state.signature}).then(res=>{
            console.log(res);
        })
        alert('修改个签','修改成功!',[
            {text:'确定',onPress:()=>{
                this.props.history.push('/home');
            }}
        ]);
    }
    render() {
        return (
            <div className="sig-body">
                <div className='sig-top'>
                    <span id='sig-back' onClick={this.back}>返回</span>
                    <span>编辑个签</span>
                    <span id='sig-pub' onClick={this.publish}>发布</span>
                </div>
                <div className="sig-edit">
                    <List>
                        <TextareaItem
                            value = {this.state.signature}
                            id="signatureValue"
                            rows={5}
                            count={30}
                            style={{backgroundColor:'rgb(241, 240, 240)'}}
                            onChange={this.edit}
                        />
                    </List>
                </div>
            </div>
        )
    }
}

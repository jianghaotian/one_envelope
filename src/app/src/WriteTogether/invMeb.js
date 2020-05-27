import React, { Component } from 'react'
import '../css/inviteMember.css'
import {NavBar,Button,TextareaItem} from 'antd-mobile';

export default class invMeb extends Component {
    constructor(){
        super();
        this.state={                                                          
                data:[{}]  ,
                phone:"" ,
                inputValue:''
               
        }
    }
    addmember=()=>{
        var phone=this.refs.input.value;
        // var name = this.name.state.value;
        if(phone == undefined || phone ==""){
            alert("请输入电话号码");
        }else{
            this.$api.addmember({tid:this.props.match.params.id,phone:phone,inviteMessage:this.state.inputValue}).then(res => {                     
                // if (res.data.status === 0) { 
                //     this.setState({
                //         data:res.data.data                   
                //     })                    
                //     // alert("创建成功~");                   
                //     console.log(this.state.data);
                // }
                this.totoge();
            })  
        }

    }
    totoge=()=>{
        this.props.history.push('/inviteMember/'+this.props.match.params.id);
    }
    textChange=(e)=>{
        this.setState({inputValue:e})
    }
    render() {
        return (
            <div className="member">
                <NavBar className='together-navback1'>                                      
                    <span>邀请好友</span>      
                    <img src={require("../imgs/WriteTogether/return1.png")} className='member-return1' onClick={this.totoge}/>

                   
                </NavBar>  
                <ul style={{width:"100%"}}>
                    <li className="lba">
                        邀请人：
                        <input type="text" name="phone"  ref='input'  className='lb' placeholder='请输入对方的手机号'/>
                    </li>
                    <li className="lbb">
                        邀请信息：<br/>
                        <TextareaItem   
                                className='la'  
                                rows={5}
                                autoHeight
                                placeholder="这里有一个小故事~等你一起来写哦，快来加入我吧！！！"
                                style={{backgroundColor:'transparent',paddingVertical: 5 }}
                                value={this.state.inputValue}
                                onChange={this.textChange}
                            />
                        
                    </li>                   
                </ul> 
                <div className="btnbox">
                <Button className='membtn' onClick={this.addmember}>发送邀请</Button>        

                    </div>   
            </div>
        )
    }
}

import React, { Component } from 'react'
import '../css/inviteMember.css'
import {NavBar,Button} from 'antd-mobile';

export default class invMeb extends Component {
    constructor(){
        super();
        this.state={                                                          
                data:[{}]  ,
                phone:""       
        }
    }
    addmember=()=>{
        var phone=this.refs.input.value;
        // var name = this.name.state.value;
        if(phone == undefined || phone ==""){
            alert("请输入电话号码");
        }else{
            this.$api.addmember({tid:this.props.match.params.id,phone:phone}).then(res => {                     
                console.log("11")                
                // if (res.data.status === 0) { 
                //     this.setState({
                //         data:res.data.data                   
                //     })                    
                //     // alert("创建成功~");                   
                //     console.log(this.state.data);
                // }         
            })  
        }

    }
    render() {
        return (
            <div className="member">
                <NavBar className='together-navback1'>                                      
                    <span>邀请好友</span>      
                    {/* <img src={require("../imgs/WriteTogether/return1.png")} className='member-return1' onClick={this.props.history.push('/inviteMember/?tid='+this.props.match.params.id)}/> */}

                    {/* <Link to={'/inviteWrite/'+this.state.data[0].tid}><img src={require("../imgs/WriteTogether/return1.png")} className='member-return'/></Link> */}
                </NavBar>  
                <ul style={{width:"100%"}}>
                    <li className="lba">
                        邀请人：
                        <input type="text" name="phone"  ref='input'  className='lb' placeholder='请输入对方的手机号'/>
                    </li>
                    <li className="lbb">
                        邀请信息：<br/>
                        <textarea className='la'>
                            这里有一个小故事~等你一起来写哦，点击链接，快来加入我吧！！！

                        </textarea>
                    </li>                   
                </ul> 
                <div className="btnbox">
                <Button className='membtn' onClick={this.addmember}>发送邀请</Button>        

                    </div>   
            </div>
        )
    }
}

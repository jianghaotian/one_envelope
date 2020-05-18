import React, { Component } from 'react'
import { List, InputItem, Toast } from 'antd-mobile';
import { Link } from 'react-router-dom';
import '../css/letterSend.css'
import { Alert } from 'antd';
export default class LetterSend extends Component {
    constructor(){
        super();
        this.state={
            data:[],
            hasError: 0,
            value: '',
            pid:''
        }
    }
    componentDidMount(){
        var pid = this.props.location.search;
        console.log(this.props.location.search);
        pid=pid.substr(5);
        this.setState({pid:pid});
        this.$api.getsendletter({pid:pid}).then(res=>{
            this.setState({data:res.data.data[0]})
            console.log(res.data.data[0]);
        })
    }
    sendClick = ()=>{
        this.$api.sendletter({pid:this.state.pid,phone:this.state.value}).then(res=>{
            console.log(res);
            if(res.data.status === 0){
                    Toast.success('发送成功', 1);
                    this.props.history.push('/home');
            }else{
                Toast.fail('该用户不存在', 1);
                console.log("error");
            }
        })
    }           
    onErrorClick = () => {
        if (this.state.hasError ==0) {
          Toast.info('请输入11位电话号码！');
        }else if(this.state.hasError == 2){
            Toast.info('请输入正确的手机号');
        }
    }
    onChange = (value) => {
        // 0:表示少于11位
        // 1：表示正确
        // 2：格式不对
        var str;
        str = value.replace(/\s*/g,"");
        if (/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(str)) {
            if(value.length ==11){
                this.setState({
                    hasError: 1,
                  });
            }else{
                this.setState({
                    hasError: 0,
                });
            }
            
        } else {
          this.setState({
            hasError: 2,
          });
        }
        this.setState({
          value:str
        });
    }
    render() {
        return (
            <div>
                <div style={{
                    height:'50px',
                    width:'100%',
                    backgroundColor:'#fff',
                    boxShadow:'2px 2px 2px #888888',
                    fontSize:'18px',
                    textAlign:'center',
                    lineHeight:'50px',
                    }}>
                        <Link to='/home'>
                         <i className="icon-fanhui iconfont"
                            style={{                                                                  
                                fontSize:'1.2em',
                                width:"10%",
                                float:'left',
                                color:"grey",
                            }}
                        />
                        </Link>
                        信件发送
                        <img src={require('../imgs/Home/send.png')}
                            style={{                                                                  
                                fontSize:'1.2em',
                                width:"10%",
                                marginTop:'5px',
                                marginRight:'5px',
                                float:'right',
                                color:"grey",
                            }}
                            onClick={this.sendClick}
                        />
                </div>
                <div style={{height:'100%',backgroundColor:'#f2f2f2'}}>
                    <div style={{height:'60px',lineHeight:'60px',paddingTop:'10px',fontSize:'17px',fontFamily:'微软雅黑'}}>
                        <List className='am-list-item am-input-item am-list-item-middle'>
                            <div style={{width:'100%',height:'60px',backgroundColor:'#f2f2f2'}}>
                            <InputItem
                                type="phone"
                                placeholder="请输入收件人的手机号码"
                                error={this.state.hasError}
                                onErrorClick={this.onErrorClick}
                                onChange={this.onChange}
                                value={this.state.value}
                            >收件人:</InputItem>
                            </div>
                        </List>
                    </div>
                    <div style={{height:'60px',width:'100%',lineHeight:'60px',paddingLeft:'20px',fontSize:'17px',borderTop:'1px solid #ddd',borderBottom:'1px solid #ddd'}}>
                        <span style={{color:'#000'}}>标题:&nbsp;&nbsp;&nbsp;</span>
                        {this.state.data.Ptitle}
                    </div>
                </div>
            </div>
        )
    }
}

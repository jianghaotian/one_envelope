import React, { Component } from 'react'
import '../css/WriteTogether.css'
import { Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import {HashRouter as Router,Link,Switch,Route} from 'react-router-dom'
import { white } from 'ansi-colors';

const alert = Modal.alert;

export default class InviteWrite extends Component {
    constructor(){
        super();
        this.state={                                           
                // img:require("../imgs//WriteTogether/toge2.jpg"),
                show : false,
                data:[{}]   ,
                theme:[{}] ,     
        }
    }
    //删除主题
    delectTheme=(e1)=>{       
        let list = this.state.data;
        console.log(list);                
        console.log(e1,'e1');
            for(let i=0;i<list.length;i++){
                if(list[i].tid == e1){
                    list.splice(i,1);
                }
        } 
        this.$api.thdelect({tid:e1}).then(res => {   
            if (res.data.status === 0) {                                
                this.setState({
                    data:list
                }) 
                alert("删除成功");
                this.totoge();   
            }
        }) 

}
    //删除信件
    delectLetter=(e)=>{       
            //主题内容详情列表
            let list = this.state.data;
            for(let i=0;i<list.length;i++){
                if(list[i].lid == e){
                    list.splice(i,1);
                }
            } 
            this.$api.wrdelect({lid:e}).then(res => {                
                if (res.data.status === 0) {                                
                    this.setState({                        
                        data:list
                    })
                    
                }
            }) 

    }
    componentDidMount(){
        //主题内容详情列表        
        this.$api.themeContent({tid:this.props.match.params.id}).then(res => {         
            console.log(res.data.data);
            if (res.data.status == 0) {    
                //console.log(res.data.data)  
                this.setState({
                    data:res.data.data,
                    // data: [{}]
                })
                console.log(this.state.data,'content');
            }
        }) 
        this.$api.themetitle({tid:this.props.match.params.id}).then(res => {          
            if (res.data.status === 0) {      
                this.setState({
                    theme:res.data.data
                })
                console.log(this.state.theme,'title');
            }
        })
        window.addEventListener('scroll' , ()=>{   
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;    
          if(scrollTop > 50){    
            this.setState({    
              show : true    
            })    
          }else{    
            this.setState({    
              show : false    
            })   
          }    
        })    

      }
      goTo=()=>{
        let scrollToTop = window.setInterval(function() {    
          let pos = window.pageYOffset;    
          if ( pos > 0 ) {    
              window.scrollTo( 0, pos - 20 ); // how far to scroll on each step    
          } else {    
              window.clearInterval( scrollToTop );   
          }   
          }, 2);    
      }
    //跳转页面
    totoge=()=>{
        this.props.history.push("/home/writeTogether");
    }

    render() {
        //console.log(this.state.data);
        return (
            <div id="invite-back">
                {/* 背景图块 */}
                <div className="invite-top">
                    <img src={"https://yf.htapi.pub/theme/"+this.state.theme[0].Timage}className='invite-img'/>
                    <span className="invite-title">{this.state.theme[0].Tname}</span>
                    <Link to='/home/writeTogether'>
                    <i className="icon-fanhui iconfont"
                                    style={{                                                    
                                        zIndex:'5',
                                        fontSize:'1.5em',
                                        position: "absolute",
                                        top:"8%",
                                        left:"5%",
                                        color:"white",}}/>
                        {/* <img src={require("../imgs//WriteTogether/return.png")} className='invite-return'/> */}
                        </Link>
                    <WingBlank >   
                        <WhiteSpace size="sl" />
                        <button
                        onClick={(e) =>
                            alert('', '您将删除整个主题内容，请确认', [
                            { text: '取消', onPress: () => console.log('取消') },
                            { text: '确定', onPress:()=>this.delectTheme(this.state.theme[0].Tid) },

                            ])
                        }
                        >
                        <i className="icon-icon7 iconfont"
                                    style={{                                                    
                                        zIndex:'5',
                                        fontSize:'1.7em',
                                        color:"rgb(240, 235, 235)",
                                        position:"absolute",
                                        top:"6%",
                                        right:"5%"}}/>
                        </button>  
                    </WingBlank>
                    <ul className='invite-mid'>
                        <Link to={"/inviteMember/"+this.state.theme[0].Tid}><li className='invite-one'>成员</li></Link>                       
                        
                        <li className='invite-one'>打包成信</li>
                    </ul>
                </div>
                {/* 主要内容块 */}
                <div className='inviteyear'>
                    {/* __{new Date(this.state.theme[0].lday).getFullYear()}__ */}
                </div>
                <div>
                {this.state.data.map((val)=> (                   
                        <div key={val}  id='invite-content'>                            
                            
                            <div className="content-time">
                                <span className="c-day">{new Date(val.lday).getFullYear()}</span>
                                <br/>
                                <span className="c-month">[{new Date(val.lday).getMonth()+1}/{new Date(val.lday).getDate()}]</span>
                            </div>
                            <Link to={'/togeContent/'+val.lid}>
                            <div className="content-title">
                                <span>{val.ltitle}</span>                                
                            </div>
                            </Link>   
                            <div className="content-content">
                                <Link to={'/togeContent/'+val.lid}>
                                <div className="c-span">
                                {val.lcontent}
                                </div>
                                </Link>   
                                <WingBlank style={{
                                    width:"8%",
                                    position:"absolute",
                                    right:"0",
                                    top:"10%",
                                    
                                }}>   
                                    <WhiteSpace size="sl" />
                                    <button
                                    onClick={(e) =>
                                        alert('', '确认删除这封信嘛', [
                                        { text: '取消', onPress: () => console.log('cancel') },
                                        // { text: '确定', onPress: () => {this.delectLetter} },
                                        { text: '确定', onPress:()=>this.delectLetter(val.lid) },

                                        ])
                                    }
                                    >
                                    <i className="icon-shanchu1 iconfont"
                                                style={{                                                    
                                                    zIndex:'2',
                                                    fontSize:'1.4em',
                                                    color:"black"
                                                }}
                                                />
                                    </button>  
                                </WingBlank>
                                
                            </div> 
                        </div>
                    
                    ))}
                    
                </div>
                
                {/* 回到顶部 */}
                <div className='invite-totop' onClick={this.goTo}>
                <i className="icon-huidaodingbu iconfont"
                                                style={{                                                                  
                                                    fontSize:'2.1em',
                                                    color:"black",
                                                    width:"100%",
                                                    height:"30px"
                                                }}
                                                />
                    {/* <img src={require("../imgs//WriteTogether/totop.png")} style={{width:"100%",height:"30px"}}/> */}
                </div>
                {/* 写内容 */}
                <div className="invite-pencil">
                    <Link to={"/togeCreate/"+this.props.match.params.id}>
                    <i className="icon-qianbi1 iconfont"
                                    style={{                                                    
                                        fontSize:'2em',
                                        width:"100%",height:"30px",
                                        color:"white",}}/>
                        {/* <img src={require("../imgs/WriteTogether/pencil.png")} style={{width:"100%",height:"30px"}} /> */}
                    </Link>
                </div>
              
                
            </div>
        )
    }
}

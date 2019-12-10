import React, { Component } from 'react'
import '../css/WriteTogether.css'

import {HashRouter as Router,Link,Switch,Route} from 'react-router-dom'
export default class InviteWrite extends Component {
    constructor(){
        super();
        this.state={                                           
                img:require("../imgs//WriteTogether/toge0.jpg"),
                show : false,
                data:[{}]         
        }
    }
    
    componentDidMount(){
        //主题内容详情列表
        this.$api.themeContent({tid:"1"}).then(res => {          
            if (res.data.status === 0) {                
                this.setState({
                    data:res.data.data
                })
                // console.log(this.state.data);
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
    render() {
        return (
            <div id="invite-back">
                {/* 背景图块 */}
                <div className="invite-top">
                    <img src={this.state.img}className='invite-img'/>
                    <span className="invite-title">{this.state.data[0].tname}</span>
                    <Link to='/home/writeTogether'><img src={require("../imgs//WriteTogether/return.png")} className='invite-return'/></Link>
                    <ul className='invite-mid'>
                        <Link to="/inviteMember"><li className='invite-one'>成员</li></Link>
                        
                        <li className='invite-one'>打包成信</li>
                    </ul>
                </div>
                {/* 主要内容块 */}
                <div className='inviteyear'>
                    __{new Date(this.state.data[0].lday).getFullYear()}__
                </div>
                <div>
                {this.state.data.map((val)=> (                   
                        <div key={val}  id='invite-content'>                            
                            {/* <img src={val.img} alt="" className="invite-content-img"/> */}
                            {/* <div className="invite-content-title"><Link to="/invitewrite" style={{color:"black"}}>{val.contenttitle}</Link></div>  */}                            
                            <div className="content-time">
                                <span className="c-day">{new Date(val.lday).getDate()}日</span>
                                <br/>
                                <span className="c-month">{new Date(val.lday).getMonth()}月</span>
                            </div>
                            <Link to='/togeContent'>
                            <div className="content-title">
                                <span>{val.ltitle}</span>
                            </div>
                            <div className="content-content">
                                <div className="c-span">
                                {val.lcontent}
                                </div>
                            </div> 
                            </Link>   
                        </div>
                    
                    ))}
                    
                </div>
                
                {/* 回到顶部 */}
                <div className='invite-totop' onClick={this.goTo}>
                    <img src={require("../imgs//WriteTogether/totop.png")} style={{width:"100%",height:"30px"}}/>
                </div>
                {/* 写内容 */}
                <div className="invite-pencil">
                    <Link to="/togeCreate">
                        <img src={require("../imgs/WriteTogether/pencil.png")} style={{width:"100%",height:"30px"}} />
                    </Link>
                </div>

                    
                
                
                
                
            </div>
        )
    }
}

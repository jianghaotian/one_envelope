import React, { Component } from 'react'
import '../css/WriteTogether.css'

import {HashRouter as Router,Link,Switch,Route} from 'react-router-dom'
export default class InviteWrite extends Component {
    constructor(){
        super();
        this.state={                            
                title:"快邀请ta一起写",
                img:require("../imgs//WriteTogether/toge0.jpg"),
                data:[
                    {
                        contentId:0,
                        contenttitle:'这里有“一封”给你的信',
                        letter:"我们都是生活的作者，用纸张留存温度，让生活更有仪式感，写给自己记录生活，写给ta记录情感，亦或通过一起写，记录二人世界、毕业纪念、宝贝成长……与心爱的人共同记录美好回忆。",                        
                        img:require("../imgs//WriteTogether/toge0.jpg"),
                    },
                    {
                        contentId:0,
                        contenttitle:'这里有“一封”给你的信',
                        letter:"我们都是生活的作者，用纸张留存温度，让生活更有仪式感，写给自己记录生活，写给ta记录情感，亦或通过一起写，记录二人世界、毕业纪念、宝贝成长……与心爱的人共同记录美好回忆。",                        
                        img:require("../imgs//WriteTogether/toge0.jpg"),
                    },
                    {
                        contentId:0,
                        contenttitle:'这里有“一封”给你的信',
                        letter:"我们都是生活的作者，用纸张留存温度，让生活更有仪式感，写给自己记录生活，写给ta记录情感，亦或通过一起写，记录二人世界、毕业纪念、宝贝成长……与心爱的人共同记录美好回忆。",                        
                        img:require("../imgs//WriteTogether/toge0.jpg"),
                    },
                    {
                        contentId:0,
                        contenttitle:'这里有“一封”给你的信',
                        letter:"我们都是生活的作者，用纸张留存温度，让生活更有仪式感，写给自己记录生活，写给ta记录情感，亦或通过一起写，记录二人世界、毕业纪念、宝贝成长……与心爱的人共同记录美好回忆。",                        
                        img:require("../imgs//WriteTogether/toge0.jpg"),
                    },
                    {
                        contentId:0,
                        contenttitle:'这里有“一封”给你的信',
                        letter:"我们都是生活的作者，用纸张留存温度，让生活更有仪式感，写给自己记录生活，写给ta记录情感，亦或通过一起写，记录二人世界、毕业纪念、宝贝成长……与心爱的人共同记录美好回忆。",                        
                        img:require("../imgs//WriteTogether/toge0.jpg"),
                    }
                    ]  
        
        }

    }
    render() {
        return (
            <div id="invite-back">
                {/* 背景图块 */}
                <div className="invite-top">
                    <img src={this.state.img}className='invite-img'/>
                    <span className="invite-title">{this.state.title}</span>
                    <Link to='/writeTogether'><img src={require("../imgs//WriteTogether/return.png")} className='invite-return'/></Link>
                    <ul className='invite-mid'>
                        <li className='invite-one'>成员</li>
                        <li className='invite-one'>打包成信</li>
                    </ul>
                </div>
                {/* 主要内容块 */}
                <div>
                {this.state.data.map((val)=> (
                        <div key={val}  id='invite-content'>                            
                            {/* <img src={val.img} alt="" className="invite-content-img"/> */}
                            {/* <div className="invite-content-title"><Link to="/invitewrite" style={{color:"black"}}>{val.contenttitle}</Link></div>  */}                            
                            <div className="content-time">
                                <span className="c-day">20日</span>
                                <span className="c-month">11月</span>
                            </div>
                            <div className="content-title">
                                <span>今天想对自己说</span>
                            </div>
                            <div className="content-content">
                                <div className="c-span">
                                    往者不可谏，来者犹可追
                                </div>
                            </div>    
                        </div>
                    ))}
                </div>
                {/* 回到顶部 */}
                <div className='invite-totop'>
                    <img src={require("../imgs//WriteTogether/totop.png")} style={{width:"100%",height:"30px"}}/>
                </div>

                    
                
                
                
                
            </div>
        )
    }
}

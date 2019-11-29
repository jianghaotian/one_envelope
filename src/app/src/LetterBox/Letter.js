import React, { Component } from 'react'
import { List } from 'antd-mobile'
import {Link} from 'react-router-dom'

const arr=[
    {
        id:'1',
        img:require("../imgs/LetBox/lb-1.png"),
        fm_user:'姐姐',
        fm_date:'2019/11/27',
        fm_title:'偷走那瓶橘子汽水',
        fm_content:'当时我手从键盘上挪开，屏幕那头没了声，可能对方在笑，可能觉得她无聊，更可能两者都有。这种情况夏笛早就习惯了，在家里，她和骆扬的对话几乎都是如此收场——骆扬觉得她可笑，骆扬觉得她无聊，骆扬觉得她可笑又无聊。最后，骆扬都会用老练的沉默回敬妻子，继续缩回他那电脑和电脑椅包围的一方小天地里，弓着腰，驼着背，腆着肚子，活脱脱一只在婚姻老卤里熬过了头的虾。'
    },
    {
        id:'2',
        img:require("../imgs/my-bg.jpg"),
        fm_user:'姑姑',
        fm_date:'2019/11/28',
        fm_title:'年轻',
        fm_content:'当我年轻的时候，我想成为任何人，除了我自己'
    }]

export default class Letter extends Component {
    render() {
        var id = this.props.match.params.id
        return (
            <div className="lt">
                {/* tab */}
                <div className="col-tab">
                    {arr[id-1].fm_user}
                    <Link to="/home/letterbox" 
                    style={{
                        float:"left",
                        height:"3em",
                        width:"3em",
                        position:"absolute",
                        left:"0",
                        top:"0",
                        zIndex:"1"
                    }}
                    onClick={()=>console.log("letter to LetterBox")}
                    ></Link>
                    <i                           
                    className="iconfont icon-fanhui" 
                    style={{
                        position:"absolute",
                        left:"5%",
                        height:"2%",
                        fontSize:"1.2em"    
                    }}></i>
                </div>
                {/* content */}
                <div className="lt-title"><b>{arr[id-1].fm_title}</b></div>
                <div className='lt-content'>{arr[id-1].fm_content}</div>
                              
                {/* buttom-choice */}
                <List style={{
                    position:'fixed',
                    bottom:'1em',
                    left:'0',
                    width:'100%',
                    height:'2em',
                    backgroundColor:'pink'
                }}>
                    <List.Item style={{
                        width:"33.3%",
                        float:'left'
                    }}>
                        <i className='iconfont icon-collection' style={{
                            paddingLeft:"45%"
                        }}></i>
                    </List.Item>
                    <List.Item style={{
                        width:"33.3%",
                        float:'left'
                    }}>
                        <i className='iconfont icon-lajixiang' style={{
                            paddingLeft:"45%"
                        }}></i>
                    </List.Item>
                    <List.Item style={{
                        width:"33.3%",
                        float:'left'
                    }}>
                        <i className='iconfont icon-huifu' style={{
                            paddingLeft:"45%",
                            fontSize:'1.3em'
                        }}></i>
                    </List.Item>
                </List>
            </div>
        )
    }
}

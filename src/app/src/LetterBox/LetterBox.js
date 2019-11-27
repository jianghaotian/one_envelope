import React, { Component } from 'react'
import '../css/LetterBox.css'
import { NavBar, Icon,SearchBar } from 'antd-mobile';

const arr=[
    {
        img:require("../imgs/my-bg.jpg"),
        fm_user:'蓝天雨',
        fm_date:'2019/11/27',
        fm_title:'偷走那瓶橘子汽水',
        fm_content:'夏笛的手从键盘上挪开，屏幕那头没了声，可能对方在笑，可能觉得她无聊，更可能两者都有。这种情况夏笛早就习惯了，在家里，她和骆扬的对话几乎都是如此收场——骆扬觉得她可笑，骆扬觉得她无聊，骆扬觉得她可笑又无聊。最后，骆扬都会用老练的沉默回敬妻子，继续缩回他那电脑和电脑椅包围的一方小天地里，弓着腰，驼着背，腆着肚子，活脱脱一只在婚姻老卤里熬过了头的虾。'
    },
    {
        img:require("../imgs/my-bg.jpg"),
        fm_user:'蓝天雨',
        fm_date:'2019/11/27',
        fm_title:'偷走那瓶橘子汽水',
        fm_content:'夏笛的手从键盘上挪开，屏幕那头没了声，可能对方在笑，可能觉得她无聊，更可能两者都有。这种情况夏笛早就习惯了，在家里，她和骆扬的对话几乎都是如此收场——骆扬觉得她可笑，骆扬觉得她无聊，骆扬觉得她可笑又无聊。最后，骆扬都会用老练的沉默回敬妻子，继续缩回他那电脑和电脑椅包围的一方小天地里，弓着腰，驼着背，腆着肚子，活脱脱一只在婚姻老卤里熬过了头的虾。'
    }]

export default class LetterBox extends Component {
    render() {
        return (
            <div>
                {/* tab */}
                <NavBar
                style={{
                    color:'black',
                    backgroundColor: 'whitesmoke'
                }}
                >信箱</NavBar>
                {/* 搜索框 */}
                <SearchBar  maxLength={8} style={{backgroundColor:'whitesmoke'}}/>
                {/* 列表页 */}
                <ul>
                    {arr.map((item,index)=>{
                        return(
                            <li className='lb-text'>
                                <img src={item.img} style={{
                                    borderRadius:'50%',
                                    height:'50%',
                                    width:'15%',
                                    margin:'1em'
                                }} />
                                <span className="lb-user"><b>{item.fm_user}</b></span>
                                <span className="lb-date">{item.fm_date}</span>
                                <span className="lb-title"><b>{item.fm_title}</b></span>
                                <span className="lb-content">
                                    {item.fm_content}
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

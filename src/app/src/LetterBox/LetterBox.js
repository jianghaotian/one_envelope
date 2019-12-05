import React, { Component } from 'react'
import '../css/LetterBox.css'
import { NavBar,SearchBar, List } from 'antd-mobile';
import {Link} from 'react-router-dom';


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
        id:'1',
        img:require("../imgs/LetBox/lb-2.png"),
        fm_user:'哥哥',
        fm_date:'2019/11/28',
        fm_title:'热爱',
        fm_content:'热爱，就是一种天赋。你不一定最优秀，但是你有一股冲劲，哪怕是自己干的不行，也不想放弃，这就是天赋'
    }
]

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
                <List>
                    {arr.map((item,index)=>{
                        return(
                            <List.Item className='lb-text' onClick={() => {}} 
                            key={index}>
                                <Link to={`/letter/${item.id}`} style={{
                                    color:'black'
                                }}>
                                <img src={item.img} style={{
                                    borderRadius:'50%',
                                    height:'50%',
                                    width:'15%',
                                    margin:'1em'
                                }} />
                                <span className="lb-user">{item.fm_user}</span>
                                <span className="lb-date">{item.fm_date}</span>
                                <span className="lb-title">{item.fm_title}</span>
                                <span className="lb-content">
                                    {item.fm_content}
                                </span>
                                </Link>
                            </List.Item>
                        )
                    })}
                </List>
            </div>
        )
    }
}

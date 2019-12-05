import React, { Component } from 'react'
import '../css/LetterBox.css'
import {Link} from 'react-router-dom';
import { SwipeAction, List } from 'antd-mobile';

const arr=[
    {
        id:'1',
        fm_date:'2019/11/27',
        fm_title:'偷走那瓶橘子汽水',
        fm_content:'当时我手从键盘上挪开，屏幕那头没了声，可能对方在笑，可能觉得她无聊，更可能两者都有。这种情况夏笛早就习惯了，在家里，她和骆扬的对话几乎都是如此收场——骆扬觉得她可笑，骆扬觉得她无聊，骆扬觉得她可笑又无聊。最后，骆扬都会用老练的沉默回敬妻子，继续缩回他那电脑和电脑椅包围的一方小天地里，弓着腰，驼着背，腆着肚子，活脱脱一只在婚姻老卤里熬过了头的虾。'
    },
    {
        id:'2',
        fm_date:'2019/11/28',
        fm_title:'热爱',
        fm_content:'热爱，就是一种天赋。你不一定最优秀，但是你有一股冲劲，哪怕是自己干的不行，也不想放弃，这就是天赋'
    }
]

export default class Articalnum extends Component {
    render() {
        return (
            <div>
                {/* tag；计数 */}
                <div className="col-tab">
                    文章数
                    <Link to="/home/my" 
                    style={{
                        float:"left",
                        height:"3em",
                        width:"3em",
                        position:"absolute",
                        left:"0",
                        top:"0",
                        zIndex:"1"
                    }}
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
                {/* 滑动列表页 */}
                <List>
                    {arr.map((item,index)=>{
                        return(
                            <SwipeAction
                            style={{ backgroundColor: 'gray' }}
                            autoClose
                            right={[
                                {
                                text: '取消',
                                style: { backgroundColor: '#ddd', color: 'white' },
                                },
                                {
                                text: '删除',
                                style: { backgroundColor: '#F4333C', color: 'white' },
                                },
                            ]}
                            key={index}
                            >
                            <List.Item
                                onClick={e => console.log(e)}
                                className='me-text'
                            >
                                <Link to={`/letter/${item.id}`} style={{
                                    color:'black'
                                }}>
                                <span className="me-date">{item.fm_date}</span>
                                <span className="me-title">{item.fm_title}</span>
                                <span className="me-content">
                                    {item.fm_content}
                                </span>
                                </Link>
                            </List.Item>
                            </SwipeAction>
                        )})}
                </List>
            </div>
        )
    }
}

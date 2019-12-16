import React, { Component } from 'react'
import '../css/inviteMember.css'
import {HashRouter as Router,Link,Switch,Route} from 'react-router-dom'
import { SwipeAction, List } from 'antd-mobile';
import { NavBar} from 'antd-mobile';


export default class inviteMember extends Component {
    constructor(){
        super();       
        this.state={
            data:[
                {
                    id:0,
                    title:"快邀请ta一起写",
                    member:2,
                    paper:2,
                    img:require("../imgs//WriteTogether/toge0.jpg"),
                },
                {
                    id:1,
                    title:'致我们的宝贝',
                    member:2,
                    paper:26,
                    img:require("../imgs//WriteTogether/toge1.jpg"),
                }
                ]       
        }
    }
    
    render() {
        return (
            <div className="member">
                <NavBar className='together-navback'>                                      
                    <span>成员</span>
                    <img src={require("../imgs//WriteTogether/tianjia.png")} className='together-img'/>
                    <Link to='/inviteWrite'><img src={require("../imgs/WriteTogether/return1.png")} className='member-return'/></Link>
                </NavBar>
                <List>
                <SwipeAction
                    style={{ backgroundColor: 'gray' ,border:"0.2px solid gray"}}
                    autoClose
                    right={[
                        {
                        text: 'Cancel',
                        onPress: () => console.log('cancel'),
                        style: { backgroundColor: '#ddd', color: 'white' },
                        },
                        {
                        text: 'Delete',
                        onPress: () => console.log('delete'),
                        style: { backgroundColor: '#F4333C', color: 'white' },
                        },
                    ]}
                    >
                    <List.Item
                        extra=""
                        arrow="horizontal"
                        onClick={e => console.log(e)}
                    >
                        妈妈
                    </List.Item>                   
                    </SwipeAction>
                    <SwipeAction
                    style={{ backgroundColor: 'gray' ,border:"0.2px solid gray"}}
                    autoClose
                    right={[
                        {
                        text: 'Cancel',
                        onPress: () => console.log('cancel'),
                        style: { backgroundColor: '#ddd', color: 'white' },
                        },
                        {
                        text: 'Delete',
                        onPress: () => console.log('delete'),
                        style: { backgroundColor: '#F4333C', color: 'white' },
                        },
                    ]}
                    >
                    <List.Item
                        extra=""
                        arrow="horizontal"
                        onClick={e => console.log(e)}
                    >
                        爸爸
                    </List.Item>                   
                    </SwipeAction>
                </List>
                
            </div>
        )
    }
}

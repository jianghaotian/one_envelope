import React, { Component } from 'react'
import '../css/inviteMember.css'
import {HashRouter as Router,Link,Switch,Route} from 'react-router-dom'
import { SwipeAction, List } from 'antd-mobile';
import { NavBar} from 'antd-mobile';


export default class inviteMember extends Component {
    constructor(){
        super();
        this.state={                                                          
                data:[{}]         
        }
    }
    componentDidMount(){
        console.log("4")
        this.$api.member({tid:"2"}).then(res => {                     
            if (res.data.status === 0) {                
                this.setState({
                    data:res.data.data
                })
                console.log(this.state.data);
            }         
        }) 
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
                    {this.state.data.map((val)=>(
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
                        onClick={e => console.log(e)}>
                        {val.uname}
                    </List.Item>  
                                     
                    </SwipeAction>
                 ))}   
                </List>
                
                
            </div>
            
        )
    }
}

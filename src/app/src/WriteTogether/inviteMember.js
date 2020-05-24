import React, { Component } from 'react'
import '../css/inviteMember.css'
import {HashRouter as Router,Link,Switch,Route} from 'react-router-dom'
import { SwipeAction, List, Modal, Button, WhiteSpace, WingBlank,NavBar } from 'antd-mobile';

const alert = Modal.alert;
const showAlert = () => {
  const alertInstance = alert('邀请好友', '是否要邀请一起写???', [
    { text: '不了', onPress: () => console.log('cancel'), style: 'default' },
    { text: '是的', onPress: () => {this.props.history.push('/invMeb/?tid='+this.props.match.params.id)}},
  ]);
  setTimeout(() => {
    // 可以调用close方法以在外部close
    console.log('auto close');
    alertInstance.close();
  }, 5000);
};

export default class inviteMember extends Component {
    constructor(){
        super();
        this.state={                                                          
                data:[{}]         
        }
    }
    //删除成员
    delectMember=(e1,e2)=>{       
        //主题内容详情列表
        let list = this.state.data;
        console.log(list)                
        console.log(e1,e2)
            for(let i=0;i<list.length;i++){
                if(list[i].tid == e1 && list[i].uid == e2){
                    list.splice(i,1);
                }
        } 
        this.$api.mbdelect({tid:e1,uid:e2}).then(res => {   
            if (res.data.status === 0) {                                
                this.setState({
                    data:list
                })    
            }
        }) 

    }
    componentDidMount(){
        // console.log("4")
        this.$api.member({tid:this.props.match.params.id}).then(res => {                     
            if (res.data.status === 0) {                
                this.setState({
                    data:res.data.data
                })
                console.log(this.state.data);
            }         
        }) 
    }
    
    toinvm=()=>{
        // this.props.history.push('/lettersend/?uid='+uid) 
    }
    render() {
        return (
            <div className="member">
                <NavBar className='together-navback'>                                      
                    <span>成员</span>
                    <Link to={'/invMeb/'+this.state.data[0].tid}><img src={require("../imgs//WriteTogether/tianjia.png")} className='together-img'/></Link>

                    {/* <div className='together-img'>
                    <Button onClick={showAlert} style={{fontSize:"37px",}}>+
                    </Button>   
                    </div> */}
                    <Link to={'/inviteWrite/'+this.state.data[0].tid}><img src={require("../imgs/WriteTogether/return1.png")} className='member-return'/></Link>
                </NavBar>
                
                    <List>
                    {this.state.data.map((val)=>(
                    <SwipeAction
                    style={{ backgroundColor: 'gray' ,border:"0.2px solid gray"}}
                    autoClose
                    right={[
                        {
                        text: '取消',
                        onPress: () => console.log('cancel'),
                        style: { backgroundColor: '#ddd', color: 'white' },
                        },
                        {
                        text: '删除',
                        onPress: ()=>this.delectMember(val.tid,val.uid),                       
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



  

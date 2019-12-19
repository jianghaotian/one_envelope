import React, { Component } from 'react'
import '../css/LetterBox.css'
import { NavBar,SearchBar, List } from 'antd-mobile';
import {Link} from 'react-router-dom';

export default class LetterBox extends Component {
    constructor(){
        super();
        this.state={
            arr:[]
        }
    }
    componentDidMount(){
        this.$api.mailbox().then(res => {
            // 获取数据成功后的其他操作
            this.setState({
                arr:res.data.data
            })
            // console.log(this.state.arr)
        }) 
    }
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
                    {this.state.arr.map((item,index)=>{
                        return(
                            <List.Item className='lb-text' onClick={() => {}} 
                            key={index}
                            >
                                <Link 
                                to={`/letter/${item.Pid}`} style={{
                                    color:'black'
                                }} key={index}
                                >
                                <img src={"http://localhost:8000/head/" + item.uimage} style={{
                                    borderRadius:'50%',
                                    height:'64px',
                                    width:'64px'
                                }} />
                                <span className="lb-user">{item.toNick}</span>
                                <span className="lb-date">{new Date(item.Pday).getFullYear()+'-'+(new Date(item.Pday).getMonth()+1)+'-'+new Date(item.Pday).getDate()}</span>
                                <span className="lb-title">{item.Ptitle}</span>
                                <span className="lb-content">
                                    {item.Pcontent}
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

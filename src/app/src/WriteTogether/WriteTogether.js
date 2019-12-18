import React, { Component } from 'react'
import '../css/WriteTogether.css'
import {HashRouter as Router,Link,Switch,Route} from 'react-router-dom'
import { NavBar} from 'antd-mobile';
import { validate } from '@babel/types';

export default class WriteTogether extends Component {
    constructor(){
        super();
        
        this.state={
            data:[                
                
            ]       
        }
    }   
    componentDidMount(){
        this.$api.theme().then(res => {
            if (res.data.status === 0) {
                console.log(res);
                this.setState({
                    data:res.data.data
                })
            }
        }) 
        
    }
    render() {
        console.log(this.state.data);

        return (
            <div style={{backgroundColor:"rgb(240, 233, 233)"}}>
                <NavBar className='together-back'>
                    <Link to="/addressee">
                    {/* <img src={require("../imgs/WriteTogether/tianjia.png")} className='together-imge'/> */}
                    <i className="icon-jia iconfont"
                                                style={{                                                                  
                                                    fontSize:'1.2em',
                                                    width:"17px",
                                                    position:"absolute",
                                                    top:"32%",
                                                    right:"6%",
                                                    color:"black",
                                                }}
                                                />
                    </Link>
                    <span>一起写</span>
                </NavBar>
                <div>
                    {/* block */}
                    {this.state.data.map((val)=> (                           
                        <Link to={"/invitewrite/"+val.Tid} style={{color:"white"}}>
                        <div key={val} className="together-block">                            
                            <img src={"http://10.7.84.116:8000/theme/"+val.Timage} alt="" className="together-bacimg"/>
                            <div className="together-title">{val.Tname}</div>                            
                            <div className="together-paper">
                            <span>—{new Date(val.Tday).toLocaleDateString()}</span>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>      
            
                
            </div>    
        )
    }
}

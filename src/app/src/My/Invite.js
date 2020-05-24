import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { NavBar,Modal, List ,Button} from 'antd-mobile';
export default class Invite extends Component {
    render() {
        return (
            <div>
                <div className="col-tab">
                    邀请通知
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
                
            </div>
        )
    }
}

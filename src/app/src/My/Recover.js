import React, { Component } from 'react'
import '../css/My.css'
import {BrowserRouter as Router,NavLink,Link,Switch} from 'react-router-dom'

export default class Recover extends Component {
    render() {
        return (
            <div>
                {/* tab */}
                <div className="col-tab">
                    回收箱
                    <Link to="/my" 
                    style={{
                        float:"left",
                        height:"3em",
                        width:"3em",
                        position:"absolute",
                        left:"0",
                        top:"0",
                        zIndex:"1"
                    }}
                    onClick={()=>console.log("recover to my")}
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
                {/* 内容 */}
                <ul style={{marginTop:"0.6em"}}>
                    <li className='lb-text'>
                        <img src={require("../imgs/my-bg.jpg")} style={{
                            borderRadius:'50%',
                            height:'50%',
                            width:'15%',
                            margin:'1em'
                        }} />
                        <span className="lb-user"><b>小萌妹</b></span>
                        <span className="lb-date">2019/10/20</span>
                        <span className="lb-content">
                            今天学会了一首诗——观沧海，东临碣石以观沧海
                            水何澹澹，山岛竦峙，树木丛生，百草丰茂，秋风萧瑟
                            洪波涌起。
                        </span>
                    </li>
                </ul>
            </div>
        )
    }
}

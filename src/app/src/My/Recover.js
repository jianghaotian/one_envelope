import React, { Component } from 'react'
import '../css/My.css'

export default class Recover extends Component {
    render() {
        return (
            <div>
                {/* tab */}
                <div className="col-tab">
                    回收箱
                    <i                           className="iconfont icon-fanhui" 
                    style={{
                        position:"absolute",
                        left:"5%",
                        height:"2%",
                        fontSize:"1.2em"    
                    }}></i>
                </div>
                {/* 内容 */}
            </div>
        )
    }
}

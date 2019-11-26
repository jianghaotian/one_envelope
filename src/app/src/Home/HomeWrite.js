import React, { Component } from 'react'
import '../css/WriteBox.css'

export default class Write extends Component {
    constructor(){
        super();
    }
    toHome=()=>{
        this.props.history.push('/home');
    }
    render() {
        return (
            <div>
                <div className="hw-body">
                    {/* 顶部 */}
                    <div className="hw-top">
                        <span onClick={this.toHome}>
                            取消
                        </span>
                        <span id="hw-save">
                            保存
                        </span>
                    </div>

                    {/* 标题 */}
                    <div className="hw-title">
                        标题：
                        <input type="text" name="hw-title" id="hw-inp-title" />
                    </div>

                    <span style={{color:"black",fontSize:"17px"}}>内容：</span>
                    {/* 内容 */}
                    <div className="hw-content">
                        <textarea name="hw-content" id="hw-content" >

                        </textarea>
                    </div>
                </div>

                {/* 底部 */}
                <div className="hw-bottom">
                    <div>
                        <img src={require("../imgs/Home/img.png")} />
                    </div>
                    <div>
                        <img src={require("../imgs/Home/DVR.png")} />
                    </div>
                    <div>
                        <img src={require("../imgs/Home/music.png")} />
                    </div>
                    <div>
                        <img src={require("../imgs/Home/set.png")} />
                    </div>
                </div>
            </div>
        )
    }
}

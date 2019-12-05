import React, { Component } from 'react'
import '../css/togeCreate.css'
import { Picker, List, WhiteSpace } from 'antd-mobile';



export default class togeCreate extends Component {
    constructor(){
        super();
        
    }
    
    toInviteWrite=()=>{
        this.props.history.push('/inviteWrite');
    }
    
    render() {
        return (
            <div className='toge-body'>
                <div className="ge-body">
                    {/* 顶部 */}
                    <div className="ge-top">
                        <span id="ge-cancel" onClick={this.toInviteWrite}>
                            取消
                        </span>
                        <span id="ge-save">
                            保存
                        </span>
                    </div>

                    {/* 标题 */}
                    <div className="ge-title">
                        标题：
                        <input type="text" name="ge-title" id="ge-inp-title" />
                    </div>
                    {/* <Picker data={district} cols={1} {...getFieldProps('district3')} className="forss">
          <List.Item arrow="horizontal">Single</List.Item>
        </Picker> */}

                    <span className='ge-cont'>内容：</span>
                    {/* 内容 */}
                    <div className="ge-content">
                        <textarea name="ge-content" id="ge-content" >

                        </textarea>
                    </div>
                </div>

                {/* 底部 */}
                <div className="ge-bottom">
                    <div>
                        <img src={require("../imgs/Home/img.png")} style={{width:"90%",height:"27px"}} />
                    </div>
                    <div>
                        <img src={require("../imgs/Home/DVR.png")}style={{width:"100%",height:"30px"}} />
                    </div>
                    <div>
                        <img src={require("../imgs/Home/music.png")}style={{width:"90%",height:"27px"}} />
                    </div>
                    <div>
                        <img src={require("../imgs/Home/set.png")}style={{width:"90%",height:"27px"}} />
                    </div>
                </div>
            </div>
        )
    }
}
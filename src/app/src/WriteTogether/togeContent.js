import React, { Component } from 'react'
import '../css/togeCreate.css'

export default class togeContent extends Component {
    constructor(){
        super();
        this.state={
            title:"今天想对自己说",
            content:"往者不可谏，来者犹可追，“楚狂接舆歌而过孔子曰：“凤兮，凤兮！何德之衰？往者不可谏，来者犹可追。已而，已而！今之从政者殆而！” 孔子下，欲与之言。趋而辟之，不得与之言。”",

            data:[
                {
                    title:"今天想对自己说",
                    content:"往者不可谏，来者犹可追，“楚狂接舆歌而过孔子曰：“凤兮，凤兮！何德之衰？往者不可谏，来者犹可追。已而，已而！今之从政者殆而！” 孔子下，欲与之言。趋而辟之，不得与之言。”",
                    background:""
                }

            ]           

        }
            
        
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
                        <input type="text" name="hw-title" id="ge-inp-title" value={this.state.title}/>
                    </div>

        <span className='ge-cont'>内容：</span>
                    {/* 内容 */}
                    <div className="ge-content">
                        <textarea name="ge-content" id="ge-content" value={this.state.content}>
                        

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
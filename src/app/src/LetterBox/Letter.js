import React, { Component } from 'react'
import { List } from 'antd-mobile'
import {Link} from 'react-router-dom'

export default class Letter extends Component {
    constructor(){
        super()
        this.state={
            isLike:0,
            arr:[{
                "toNick":"属性值",
                "Ptitle":"一个小标题奥",
                "Pcontent":'这是内容奥',
                'ppimage':'1234567891234_56.jpg'
            }]
        }
    }
    componentDidMount(){
        this.$api.showmail({pid:this.props.match.params.Pid}).then(res => {
            // 获取数据成功后的其他操作
            this.setState({
                arr:res.data.data
            });

            console.log(this.state.arr)
            // 获取当前状态值
            this.setState({
                isLike:res.data.data[0].isCollection
            })
        }) 
    }
    collec = () => {
        if(this.state.isLike){
            // 后台取消收藏
            this.$api.delcollect({pid:this.props.match.params.Pid}).then(res => {});
            this.setState({
                isLike:!this.state.isLike
            })
        }else{
            // 后台收藏
            this.$api.collec({pid:this.props.match.params.Pid}).then(res => {})
            this.setState({
                isLike:!this.state.isLike
            })
        }
    }
    // 删除
    deleEmail =(e)=>{
        this.$api.deletemail({pid:this.props.match.params.Pid}).then(res => {}) 
    }
    render() {
        return (
            <div className="lt">
                {/* tab */}
                <div className="col-tab" style={{
                    color:'black',
                    backgroundColor: 'whitesmoke'
                }}>
                        {this.state.arr[0].toNick}
                    <Link to="/home/letterbox" 
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
                
                {/* content */}
                <div className="lt-title" style={{
                    backgroundColor: 'rgb(247, 245, 245)',
                    width: '100%',
                    fontSize: '1.7em',
                    padding:'0.5em 0.8em'
                }}><b>{this.state.arr[0].Ptitle}</b></div>
                <hr style={{
                    borderWidth:'0.4px',
                    color:'lightgrey'
                }}/>
                <div className='lt-content'>
                    <img src={"http://10.7.84.116:8000/paper/"+this.state.arr[0].ppimage} className="lt-img"/>
                    <span className="lt-span">{this.state.arr[0].Pcontent}</span>
                </div>
                              
                {/* buttom-choice */}
                <List style={{
                    position:'fixed',
                    bottom:'1em',
                    left:'0',
                    width:'100%',
                    height:'2em'
                }}>
                    <List.Item style={{
                        width:"33.3%",
                        float:'left'
                    }}>
                        <i 
                        className={ this.state.isLike ? 'iconfont icon-collection-b':'iconfont icon-collection'} 
                        onClick={this.collec.bind(this)}
                        style={{
                            paddingLeft:"45%"
                        }}></i>
                    </List.Item>
                    <Link to='/home/letterbox'><List.Item style={{
                        width:"33.3%",
                        float:'left'
                    }}
                    onClick={(e)=>this.deleEmail(e)}
                    >
                        <i className='iconfont icon-lajixiang' style={{
                            paddingLeft:"45%"
                        }}></i>
                    </List.Item></Link>
                    <List.Item style={{
                        width:"33.3%",
                        float:'left'
                    }}>
                        <i className='iconfont icon-huifu' style={{
                            paddingLeft:"45%",
                            fontSize:'1.3em'
                        }}></i>
                    </List.Item>
                </List>
            </div>
        )
    }
}

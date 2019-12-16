import React, { Component } from 'react'
import { List } from 'antd-mobile'
import {Link} from 'react-router-dom'

export default class Collecletter extends Component {
    constructor(){
        super()
        this.state={
            isLike:true,
            arr:[{
                "toNick":"属性值",
                "Ptitle":"一个小标题奥",
                "Pcontent":'这是内容奥'
            }]
        }
    }
    collec = () => {
        this.setState({
            isLike:!this.state.isLike
        })
    }
    componentDidMount(){
        this.$api.showmail({pid:this.props.match.params.Pid}).then(res => {
            // 获取数据成功后的其他操作
            this.setState({
                arr:res.data.data
            });
            // 不能将数组直接赋值到state中
            // console.log(this.state.arr);
        }) 
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
                    <Link to="/collection" 
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
                <div className='lt-content'>{this.state.arr[0].Pcontent}</div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import { NavBar, Icon,List,Switch,Item } from 'antd-mobile'
import '../css/My.css'
import { createForm } from 'rc-form';

export default class Setting extends Component {
    constructor(props){
        super(props)
        this.state={
            isToggleOn:true
        };
        this.bindClick=this.bindClick.bind(this);
    }
    bindClick=()=>{
        this.setState(
            prevState =>{
                return {isToggleOn : !prevState.isToggleOn}
            }
        )       
    }
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         checked: false,
    //         checked1: true,
    //     };
    // }
    render() {
        // const {getFieldProps} = this.props.form;
        return (
             
            <div className='my-set'>
                {/* 标题栏 */}
                <div className="col-tab">
                    设置
                    <i                           className="iconfont icon-fanhui" 
                    style={{
                        position:"absolute",
                        left:"5%",
                        height:"2%",
                        fontSize:"1.2em"    
                    }}></i>
                </div>

                {/* 按钮 */}
                <ul>
                    <li>消息通知*
                        <div className="set-btn">
                            <button onClick={this.bindClick}>
                                {this.state.isToggleOn ? "ON" : "OFF"}
                            </button>
                        </div>
                    </li>
                    <li>版本号*
                        <Icon type="right" style={{float:"right"}}/>  
                    </li>
                    <li>账号管理
                        <Icon type="right" style={{float:"right"}}/>  
                    </li>
                    <li>意见反馈
                        <Icon type="right" style={{float:"right"}}/>
                    </li>
                    <li>清除缓存
                    <Icon type="right" style={{float:"right"}}/>  

                    </li>
                    <li>护眼模式
                    <Icon type="right" style={{float:"right"}}/> 
                    </li>
                </ul>

                <div className="my-unlogin">
                    <button>退出登录</button>
                </div>
               
                {/* <List renderHeader={() => 'Form switch'} >         <List.Item
                    extra={<Switch
                        {...getFieldProps('Switch1', {
                        initialValue: this.state.checked1,
                        valuePropName: 'checked',
                        onChange: (val) => {
                            console.log(val);
                            // Do not `setState` with rc-form
                            // this.setState({ checked1: val });
                        },
                        })}
                        onClick={(checked) => {
                        // set new value
                        this.props.form.setFieldsValue({
                            Switch1: checked,
                        });
                        }}
                    />}
                    >On </List.Item></List> */}
                    {/* <List>
                        <List.Item
                            arrow="horizontal"
                            extra={'已关闭'}
                            onClick={this.onQRBarrage}
                            >选项
                        </List.Item> 
                        <List.Item
                            extra={<Switch
                                {...getFieldProps('Switch8', {
                                initialValue: true,
                                valuePropName: 'checked',
                            })}
                                onClick={(checked) => { console.log(checked); }}
                            />}
                        >开关</List.Item>
                    </List>  */}
            </div>
        )
    }
}
 
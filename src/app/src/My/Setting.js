import React, { Component } from 'react'
import {Icon,List,Switch } from 'antd-mobile'
import '../css/My.css'
import { createForm } from 'rc-form';
import {Link} from 'react-router-dom'

class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            checked1: true,
        };
    }
    render() {
        const {getFieldProps} = this.props.form;
        return (
            <div className='my-set'>
                {/* 标题栏 */}
                <div className="col-tab">
                    设置
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
                    onClick={()=>console.log("setting to my")}
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
                {/* 选项 */}
                <List style={{marginTop:"1em"}}>
                    <List.Item
                    extra={<Switch
                        {...getFieldProps('Switch1', {
                        initialValue: this.state.checked1,
                        valuePropName: 'checked',
                        onChange: (val) => {
                            console.log(val);
                        },
                        })}
                        onClick={(checked) => {
                        this.props.form.setFieldsValue({
                            Switch1: checked,
                        });
                        }}
                    />}
                    >消息通知</List.Item>
                    <List.Item>版本号
                        <Icon type="right" style={{float:"right",paddingTop:"0.3em"}} />
                        <span style={{float:"right",fontSize:'1em',color:"grey"}}>1.0.0</span>
                    </List.Item>
                </List>
                <div className="my-unlogin">
                    <button><Link to="login">退出登录</Link></button>
                </div>  
            </div>
        )
    }
}

export default createForm()(Setting);
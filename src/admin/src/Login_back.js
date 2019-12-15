import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {NavLink} from 'react-router-dom';
import {setTokenAll} from './redux/actions';
import { Alert } from 'antd';
import '../src/css/login_back.css'


class NormalLoginForm extends Component {
    constructor(){
        super();
        this.state={
            show : false
        }
    }
    change = ()=>{
        this.setState({
            show:false
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (err) {
            console.log(err);
          }else{
            this.$api.login({account:values.username,password:values.password}).then(res => {
                if (res.data.status === 0) { 
                    this.$store.dispatch(setTokenAll(res.data.data.token, res.data.data.aid));
                    this.props.history.push("/backhome");         
                }else{
                    this.setState({
                        show:true
                    })                    
                }
              })
          }
        });
      }
    render() {
        const {getFieldDecorator} = this.props.form;
        const show = this.state.show;
        return (
            <div className="container">
                <img src={require("./image/yifeng.jpg")} alt={"logo"} className="myLogin"/>
                <Form onSubmit={this.handleSubmit} className="login-form">
                <div style={{display:show?'block':'none'}}>
                    <Alert message="请输入正确的手机号和密码"  showIcon />
                </div>
                    <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入您的手机号' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="手机号"
                        onChange={this.change}
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入您的密码' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="请输入密码"
                        onChange={this.change}

                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button"  >
                        登录
                    </Button>
                    </Form.Item>
                </Form>
                
        </div>
        )
    }
}
const Login_Back = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Login_Back;


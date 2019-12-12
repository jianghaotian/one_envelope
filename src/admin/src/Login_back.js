import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {NavLink} from 'react-router-dom';

import '../src/css/login_back.css'
class NormalLoginForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }
    render() {
        console.log(this.props.form)
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="container">
                <img src={require("./image/yifeng.jpg")} alt={"logo"} className="myLogin"/>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {/* {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>记住它</Checkbox>)} */}
                    <Button type="primary" htmlType="submit" className="login-form-button" to='/backhome'>
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


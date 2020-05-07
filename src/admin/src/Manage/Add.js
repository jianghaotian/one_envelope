import React, { Component } from 'react'
import {Form,Input,Tooltip,Icon,Select,Button,message} from 'antd';
import { Alert } from 'antd';

const { Option } = Select;
const success = () => {
    message.success('添加成功');
};
class Add extends Component {
    constructor(){
        super();
        this.state={
            confirmDirty: false,
            autoCompleteResult: [],
            show:false,
            exiterr:false,

        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log(err);
            }else{
                console.log('values');
                var num =values.phone + '';
                const regTel = /^1\d{10}$/;
                if(regTel.test(num) && num.length==11){
                    this.$api.checkphone({aphone:num}).then(res => {
                        if(res.data.data.length>=1){
                            console.log("已存储在")
                            this.setState({
                                exiterr:true
                            })
                        }else{
                            let day = new Date().getTime();
                            console.log(values);
                            this.$api.addadmin({aphone:values.phone,apassword:values.password,aname:values.nickname,aday:day}).then(res => {
                                console.log(res.data);
                                this.props.history.push("/backhome/administrator");         

                            })
                            this.setState({
                                exiterr:false
                            })
                        }
                    })
                    this.setState({
                        show:false
                    })
                }else{
                    console.log("手机号不对")
                    this.setState({
                        show:true
                    })
                }
                
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('请再次确认密码!');
        } else {
          callback();
        }
    };
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })
        (
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{float:'left',paddingLeft:250}}>
               
                <Form.Item label="手机号">
                    <div style={{display:this.state.show?'block':'none'}}>
                        <Alert message="请输入正确的手机号"  showIcon />
                    </div>
                    <div style={{display:this.state.exiterr?'block':'none'}}>
                        <Alert message="此号码已存在"  showIcon />
                    </div>
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请输入手机号!' },],
                    })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="密码" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="确认密码" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: '请再次确认密码!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
                <Form.Item
                    label={
                        <span>
                            昵称&nbsp;
                            <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    }
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '请输入用户昵称!', whitespace: true }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        添加
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
export const Addform = Form.create({ name: 'register' })(Add);

import React, { Component } from 'react'
import {Form,Input,Button} from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
class BackMessage extends Component {
    constructor(){
        super();
        this.state={
            data:[],
            feedback:'',
        }
    }
    componentDidMount(){
        let data = this.props.location.state.data;
        this.setState({data:data})
        console.log(this.props.location.state.data.Uid);
        this.$api.searchFeedback({uid:this.props.location.state.data.Uid}).then(res =>{
            console.log(res.data);
            this.setState({feedback:res.data.data[0].feedback})
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log(err);
            }else{
                console.log(values.back); 
                this.$api.saveBack({uid:this.state.data.Uid,backMessage:values.back}).then(res=>{
                  console.log(res.data);
                  this.props.history.push("/backhome/help");
                })
            }
        });
    }
    render() {
      const {TextArea } = Input
        const { getFieldDecorator } = this.props.form;
        return (
            <Form {...layout}
                initialValues={{ remember: true }}
                onSubmit={this.handleSubmit}
                style={{float:'left',paddingLeft:250}}>
                <Form.Item label="用户名">
                    <div>{this.state.data.Uname}</div>
                </Form.Item>
                <Form.Item label="帮助信息" >
                    <div>{this.state.feedback}</div>
                </Form.Item>
                <Form.Item
                    label="反馈">
                    {this.state.data.backMessage?
                        getFieldDecorator('back', {
                          rules: [{ required: true, message: this.state.data.backMessage, whitespace: true }],
                        })(<TextArea rows={4} style={{width:'300px'}} placeholder={this.state.data.backMessage}/>)
                        :getFieldDecorator('back', {
                          rules: [{ required: true, message: '请输入反馈信息', whitespace: true }],
                        })(<TextArea rows={4} style={{width:'300px'}}/>)
                    }
                  
                </Form.Item>
                <Form.Item {...tailLayout} valuePropName="checked">
                    <Button type="primary" htmlType="submit">
                        反馈
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export const Backform = Form.create({ name: 'register' })(BackMessage);
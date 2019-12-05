import React, { Component } from 'react'
import { Button,WhiteSpace,InputItem,ImagePicker, WingBlank, SegmentedControl} from 'antd-mobile'
import {NavLink,Link,Switch} from 'react-router-dom'

export default class Changename extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputValue: 'XueueCu',
        }
    }
    handleChange = (e) => {
    //     const inpVal = this.input.value;
    //     console.log(inpVal);
    //     // console.log(e);
    //     // // this.setState({
    //     // //     inputValue: e.target.value,
    //     // // })
    //     // if(e===''){
    //     //         alert("11")
    //     // }
    }

    // 页面拿数据
    render() {
        return (
            <div>
                {/* tag */}
                <div className="col-tab">
                    更改昵称
                    <Link to="/myedit" 
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
                <WhiteSpace size="lg" />
                {/* 输入框 */}
                <InputItem
                defaultValue={this.state.inputValue}
                placeholder="好的昵称可以让你的朋友更容易记住你"
                data-seed="logId"
                autoFocus
                onChange={(e)=>this.handleChange(e)}
                
                ></InputItem>

                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <Button style={{
                    color:'black',
                    margin:"0 8vw" 
                }}
                // onChange={(e)=>this.handleChange(e)}
                >保存</Button>
            </div>
        )
    }
}

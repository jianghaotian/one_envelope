import React, { Component } from 'react'
import "../css/togeCreate.css"
import "antd/dist/antd.css"
import {Input,Button} from 'antd'
// import * as data from './data'

var src="";
export default class Addressee extends Component {
    constructor(){
        super();
        this.state = {
            src : "",
            name : ""
        }
    }
    totoge=()=>{
        this.props.history.push("/home/writeTogether");
    }
    submit=()=>{
        var name = this.name.state.value;
        if(name == undefined || name ==""){
            alert("请填写昵称");
        }else{
            this.setState({
                name : name
            })
            console.log(name);
        }
        var obj = {
            "to" : name,
            "profile" : this.state.src,
            "num" : 0
        }
        // data.userList.unshift(obj);
        //this.props.history.push("/tomy");
    }
    addImg=()=>{
        var file = document.getElementById("add-file").files[0];
        console.log(file);
        var img = document.getElementById("addImg");
        img.style.display="block";
        var reader=new FileReader();
        // 图片预览
        if(file){
            reader.readAsDataURL(file);
        }
        reader.addEventListener("load",function(){
            img.src=reader.result;
            src = img.src;
            console.log(src);
        })
        console.log(src);
    }
    render() {
        //console.log(this.state.src);
        return (
            <div>
                <div className="add-top">
                    <span>
                        <img src={require("../imgs/Home/back.png")} style={{width:"25px",height:"25px"}} className="add-back" onClick={this.totoge} />
                    </span>
                    <span className="add-title">
                        新建主题
                    </span>
                </div>
                <div className="add-body">
                    <div className="add-img">
                        <label for="add-file">
                            <div className="add-label">
                            </div>
                        </label>
                        <img src="" style={{height:"300px",width:"300px",display:"none"}} id="addImg" />
                    </div>
                    <Input type="file" id="add-file" onChange={this.addImg} />
                    <Input type="text" name="name" ref={(inp)=>{this.name=inp}} placeholder="昵称" />
                    <br/>
                    <Button id="add-btn" onClick={this.submit}>确 认 添 加</Button>
                </div>
                
            </div>
        )
    }
}

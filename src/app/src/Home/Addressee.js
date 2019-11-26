import React, { Component } from 'react'
import "../css/WriteBox.css"
import "antd/dist/antd.css"
import $ from 'jquery'
import {Input,Button} from 'antd'

export default class Addressee extends Component {
    constructor(){
        super();
    }
    tomy=()=>{
        this.props.history.push("/tomy");
    }
    toWrite=()=>{
        var name = $("#add-name").val();
        var reg = /^\w{1,10}$/;
        if(name == ""){
            alert("请添加收信人");
        }else{
            this.props.history.push("/homeWrite");
        }
    }
    addImg=()=>{
        var file = document.getElementById("add-file").files[0];
        var img = document.getElementById("addImg");
        img.style.display="block";
        var reader=new FileReader();
        // 图片预览
        if(file){
            reader.readAsDataURL(file);
        }
        reader.addEventListener("load",function(){
            img.src=reader.result;
        })
    }
    render() {
        return (
            <div>
                <div className="add-top">
                    <span>
                        <img src={require("../imgs/Home/back.png")} style={{width:"25px",height:"25px"}} className="add-back" onClick={this.tomy} />
                    </span>
                    <span className="add-title">
                        给 Ta
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
                    <Input type="text" name="name" id="add-name" placeholder="昵称" />
                    <br/>
                    <Button id="add-btn" onClick={this.toWrite}>立 即 写 信</Button>
                </div>
                
            </div>
        )
    }
}

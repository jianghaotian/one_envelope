import React, { Component } from 'react'
import "antd/dist/antd.css"
import "../css/togeCreate.css"
import { ImagePicker } from 'antd-mobile';
import { Input,Button } from 'antd';


const data = [{}];
export default class Addressee extends Component {
    constructor(){
        super();
        this.state = {
            files: [],
            name:''
        }
    }
    onChange = (files, type, index) => {
        
        if(type=='add'){
            // console.log(files, type, index);
            // console.log(files[0].url)
             this.$api.addimage({imgData:files[0].url}).then(res=>{
                console.log(res.data);
                this.setState({
                    name:res.data
                })
        })
        }
        this.setState({
          files,
        });
      }

      addTheme=()=>{
        var name = this.name.state.value;
        var timestamp = Date.parse(new Date()); 
        if(name == undefined || name ==""){
            alert("请填写昵称");
        }else{
            console.log(this.state.name);
            console.log("ndoweiakls")
            // let name = this.state.name+'.png'
            this.$api.addtheme({tname:name,timage:this.state.name,tday:timestamp}).then(res => {                     
                if (res.data.status === 0) {                
                    this.setState({
                        data:res.data.data                   
                    })                    
                    // alert("创建成功~");
                    this.totoge();
                    console.log(this.state.data);
                }         
            }) 
            
        }
    }
    totoge=()=>{
        this.props.history.push("/home/writeTogether");
    }
    
    
    render() {
        //console.log(this.state.src);
        const { files } = this.state;
 
        return (
            <div>
                <div className="add-top">
                    <span>
                        {/* <img src={require("../imgs/Home/back.png")} style={{width:"25px",height:"25px"}} className="add-back" onClick={this.totoge} /> */}
                        <i className="icon-fanhui iconfont"
                                    style={{   
                                        width:"25px",
                                        height:"25px" ,                                                
                                        fontSize:'1.5em',
                                        position:"fixed",
                                        left:"20px"}}
                                        onClick={this.totoge}/>
                    </span>
                    <span className="add-title">
                        新建主题
                    </span>
                </div>
                <div className="add-body">
                
                <ImagePicker
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 1}
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                    />
                   
                    <Input type="text" name="name"  ref={(inp)=>{this.name=inp}} placeholder="请输入主题名称" style={{marginTop:"15%"}}/>
                  
                    <Button id="add-btn" onClick={this.addTheme}>确 认 添 加</Button>
                </div>
                
            </div>
        )
    }
}

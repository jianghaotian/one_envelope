import ReactDOM from "react-dom";
import React, { Component } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import '../css/cback.css';
import { Button,Modal } from "antd-mobile";

const alert = Modal.alert;

var obj=null;

export default class CustomBack extends Component {
  constructor(){
    super();
    this.state = {
      src: null,
      crop: {
        aspect: 1/1.5,
        //width: 100,
      },
      to : '',
      pid : null,
      type : ''
    };
  }
  componentDidMount(){
    let info = window.location.hash;
    //console.log(info);
    if(info.indexOf('to=')>0){
      let toType = info.split('=')[1];
      let to = decodeURI(toType);
      //console.log(to);
      this.setState({
        to : to,
        crop : {
          aspect : 2/1.2
        }
      })
    }else{
      //获取pid
      let dataArr = info.substr(8,info.length);
      let arr = dataArr.split("&");
      let pid = arr[0].split("=");
      let type = arr[1].split("=");
      console.log(pid[1],type[1]);
      this.setState({
        pid : pid[1],
        type : type[1]
      })
    }
  }
  //选择图片
  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
    }
  };

  onImageLoaded = (image, pixelCrop) => {
      this.imageRef = image;
  };

  onCropComplete = (crop, pixelCrop) => {
    this.makeClientCrop(crop, pixelCrop);
    //console.log(pixelCrop);
  };

  onCropChange = (crop,precentCrop) => {
    this.setState({ crop });
  };

  async makeClientCrop(crop, pixelCrop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        pixelCrop,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, pixelCrop, crop,fileName) {
    let h = image.naturalHeight;
    let w = image.naturalWidth;
    let pixelh = pixelCrop.height.toFixed() * 0.01;
    let pixelw = pixelCrop.width.toFixed() * 0.01;
    let pixelx = pixelCrop.x.toFixed() * 0.01;
    let pixely = pixelCrop.y.toFixed() * 0.01;
    //console.log(pixelh);
    //绘画
    const canvas = document.createElement("canvas");
    canvas.width = crop.width;
    canvas.height =crop.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      image,
      pixelx * w,
      pixely * h,
      pixelw * w,
      pixelh * h,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        obj = blob;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
        //console.log(this.fileUrl);
      }, "image/jpeg");
    });
  }
  //确定
  upBack=()=>{
    //console.log(obj);
    var reader = new FileReader();
    reader.readAsDataURL(obj);
    let info = window.location.hash;
    //获取pid
    let dataArr = info.substr(8,info.length);
    // let arr = dataArr.split("&");
    // let pid = arr[0].split("=");
    // let type = arr[1].split("=");
    //上传
    reader.addEventListener("load", () =>
        {
          //console.log(type);
          if(this.state.type == 'create'){
            localStorage.setItem('customBack',true);
            localStorage.setItem('cbackSrc',reader.result);
            alert('修改背景','修改成功!',[
              {text:'确定',onPress:()=>{
                this.props.history.push('homeWrite/?'+dataArr);
              }}
            ]);
          }else if(this.state.type == 'edit'){
            this.$api.postBgImg({pid:this.state.pid,bgData:reader.result}).then(res=>{
              console.log(res);
            })
            alert('修改背景','修改成功!',[
              {text:'确定',onPress:()=>{
                this.props.history.push('homeWrite/?'+dataArr);
              }}
            ]);
          }else{
            this.$api.changeHomeBg({imgData : reader.result}).then(res=>{
              //console.log(res);
            })
            alert('修改背景','修改成功!',[
              {text:'确定',onPress:()=>{
                  this.props.history.push('/home');
              }}
            ]);
          } 
        }
    );
  }
  //取消
  back=()=>{
    //修改路由
    let info = window.location.hash;
    let dataArr = info.substr(8,info.length);
    if(this.state.type == 'edit' || this.state.type == 'create'){
      this.props.history.push('homeWrite/?'+dataArr);
    }else{
      this.props.history.push('home/?to='+this.state.to);
    }
  }
  render() {
    const { crop, croppedImageUrl, src } = this.state;
    //console.log(this.state);
    return (
      <div className="App">
        <div>
          <input type="file" onChange={this.onSelectFile} />
        </div>
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        {croppedImageUrl && (
          <img alt="Crop" style={{ maxWidth:'100%',display:'none',maxHeight:'400'}} src={croppedImageUrl} />
        )}
        <div className='cb-bottom'>
          <Button  style={{width:'50%',float:'left'}} onClick={this.upBack}>确定</Button>
          <Button  style={{width:'50%'}} onClick={this.back}>返回</Button>
        </div>
      </div>
    );
  }
}



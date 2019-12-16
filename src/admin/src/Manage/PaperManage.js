import React, { Component } from 'react'
import { Upload, Icon, Modal } from 'antd';
import '../css/analy.css';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
export default class PaperManage extends Component {
    constructor(){
        super();
        this.state={
            previewVisible: false,
            previewImage: '',
            fileList: [],
            num:''
        }
    }
    componentDidMount(){
        this.$api.getpaper().then(res => {
            this.setState({
                num:res.data.data[0].num
            })
        })
        this.$api.paperlist().then(res => {
            let list = res.data.data;
            for(var i=0;i<list.length;i++){
                list[i].url = "http://localhost:8000/head/" + list[i].ppimage
                list[i].uid =-(i+1);
            }
            this.setState({
                fileList:list
            })
        })
    }
    //     fileList: [
    //       {
    //           uid: '-1',
    //           name: 'image.png',
    //           status: 'done',
    //           url: 'http://photocdn.sohu.com/20111111/Img325292992.jpg',
    //       },

    handleCancel = () => this.setState({ previewVisible: false });
    handlePreview = async file => {
        console.log(file);
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
        });
    };
    handleChange = ({ fileList }) =>{
        // console.log(fileList);
        // var num = fileList.length-1;
        // let name = fileList[num].name
        // this.$api.addpaper({file:name}).then(res => {
        //     console.log(res.data)
        // })
         this.setState({ fileList })
        };
    handleRemove = async file =>{
        // console.log(fileList)
        this.$api.delpaper({ppid:file.ppid}).then(res=>{
            console.log(res)
        })
        // this.setState({ fileList })

    }
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                 <div className='bmuser'>
                    <span className='bmanage_user'>信纸管理</span>
                    <span className='buser_sum'>总信纸数：{this.state.num}</span>
                    <div className="clearfix">
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                            onRemove={this.handleRemove}
                        >
                            {fileList.length >= 50 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '250px',height:'250px',overflow:'hidden'}} src={previewImage} />
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}


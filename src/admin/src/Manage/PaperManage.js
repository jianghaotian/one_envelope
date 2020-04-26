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
                list[i].url = "https://yf.htapi.pub/paper/" + list[i].ppimage
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
    handleChange = ({ fileList ,event}) =>{
        console.log(event)
        if(event){
            this.setState({ num:this.state.num+1 })

        }
        this.setState({ fileList })

        };
    handleRemove = file =>{
        console.log(file);
        this.$api.delpaper({ppid:file.ppid,ppimage:file.ppimage}).then(res=>{
        })
        this.setState({ num:this.state.num -1 })

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
                            action="https://yf.htapi.pub/v1/image/paper"
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


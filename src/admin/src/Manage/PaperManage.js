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
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [
          {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: 'http://photocdn.sohu.com/20111111/Img325292992.jpg',
          },
          {
              uid: '-2',
              name: 'image.png',
              status: 'done',
              url:'http://photocdn.sohu.com/20111111/Img325292992.jpg',
          },
          {
              uid: '-3',
              name: 'image.png',
              status: 'done',
              url: 'http://b-ssl.duitang.com/uploads/item/201507/13/20150713153609_YKU8V.jpeg',
          },
          {
              uid: '-4',
              name: 'image.png',
              status: 'done',
              url: 'http://b-ssl.duitang.com/uploads/item/201303/14/20130314101209_4HRcn.jpeg'
          },
        ],
    };
    handleCancel = () => this.setState({ previewVisible: false });
    handlePreview = async file => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
        });
    };
    handleChange = ({ fileList }) => this.setState({ fileList });
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
                    <span className='buser_sum'>总信纸数：</span>
                    <div className="clearfix">
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
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


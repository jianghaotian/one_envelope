import React, { Component } from 'react'
import '../css/analy.css'
import { Table, Input, Button, Icon,Avatar,Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import {Link,Route} from 'react-router-dom';
const { Search } = Input;
export default class Help extends Component {
    constructor(){
        super();
        this.state={
            searchText: '',
            searchedColumn: '',
            data: [],
            num:''
        }
    }
    
    componentDidMount(){
        this.$api.helpUser().then(res=>{
            console.log(res.data.data)
            this.setState({
                data:res.data.data,
                num:res.data.data.length
            })
            let list = this.state.data;
            for(var i=0;i<list.length;i++){
                // console.log(list[i].Uimage);
                list[i].Uimage = <img src={"https://yf.htapi.pub/head/" + list[i].Uimage} style={{width:'48px',height:'48px',textAlign:'center',lineHeight:'48px',borderRadius:'50%'}} />
                if(list[i].feedback.length>=15){
                    list[i].feedback=list[i].feedback.substring(0,10)+'...'
                }
                // http://localhost:8000/head/1234567891234_56.jpg
            }
            this.setState({
                data:list
            })
        })

    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block',overflow:'heidden'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    搜索
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    恢复
                </Button>
            </div>
            ),
        filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
        record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            (this.state.searchedColumn === dataIndex) ?
            <Highlighter
                highlightStyle={{ backgroundColor: '#00bcd48c', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
            : text
        ),
    });
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };
    
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    }
    // 
    render() {
        const columns = [
            {
                title: '昵称',
                dataIndex: 'Uname',
                key: 'Uname',
                ...this.getColumnSearchProps('Uname'),
            },
            {
                title: '用户id',
                dataIndex: 'Uid',
                key: 'Uid',
                ...this.getColumnSearchProps('Uid'),
            },
            {
                title: '手机号',
                dataIndex: 'Uphone',
                key: 'Uphone',
                ...this.getColumnSearchProps('Uphone'),
            },
            {
                title: '帮助',
                dataIndex: 'feedback',
                key: 'feedback',
                ...this.getColumnSearchProps('feedback'),
            },
            {
                title: '反馈',
                dataIndex: 'Uback',
                key: 'Uback',
                ...this.getColumnSearchProps('Uback'),
                render: (text, record) => 
                <Button style={{marginLeft:'20px'}} onClick={()=>console.log(text,record)}><Link to={{pathname:`/backhome/backmessage`,state:{data:record}}} >添加</Link></Button>
            }
        ];
        return (
            <div>
                <div className='bmuser'>
                    <span className='bmanage_user'>帮助与反馈</span>
                    <span className='buser_sum'>帮助总数:{this.state.num}</span>
                </div>
                <div style={{background:'rgb(238, 238, 238)',height:10}}></div>
                <div className='if_search'>
                    <span className='if_search_child'>按条件搜索</span>
                    <i className='iconfont iconzhuyi'style={{float:'right',margin:'15px 50px 0'}}></i>
                </div>
                <div className='buser_list'>
                    <span className='buser_list_title'>帮助列表</span>
                    <Table columns={columns} dataSource={this.state.data} />
                </div>
            </div>
        )
    }
}

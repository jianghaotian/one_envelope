import React, { Component } from 'react'
import '../css/analy.css'
import { Table, Input, Button, Icon,Avatar,Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { compose } from 'redux';

const { Search } = Input;
export default class UserManage extends Component {
    constructor(){
        super();
        this.state = {
            searchText: '',
            searchedColumn: '',
            totalpid:'',
            data:[
                {
                    key: '1',
                    Pid:1,
                    Uid:1,
                    toUid:1,
                    Ptitle:'致自己',
                    paper:'1',
                    Pday:'2019-11-30',
                    link:'无连接',
                    // operation:<a>删除</a> && <a>预览</a>
                }
            ]
        }
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
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
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
    };
    handleDelete = (e) => {
        console.log(e);
        this.$api.delpletter({pid:e}).then(res=>{
            if(res.data.status === 0){
                let arr = this.state.data;
                for(var i=0;i<arr.length;i++){
                    if(arr[i].Pid == e){
                       arr.splice(i,1);
                    }
                }
                console.log(arr);
                this.setState({
                    data:arr
                })
                
            }
        });
    }
    componentDidMount(){
        this.$api.adminletman({}).then(res => {
            if (res.data.status === 0) { 
                let arr = res.data.data;
                // console.log(arr);
                for(var i=0;i<arr.length;i++){
                    arr[i].key = i+1; 
                    arr[i].paper = 1; 
                    arr[i].Pday=new Date(arr[i].Pday).getFullYear()+'-'+(new Date(arr[i].Pday).getMonth()+1)+'-'+new Date(arr[i].Pday).getDate(); 
                    if(arr[i].isSend == 1){
                        arr[i].link ='有链接';
                    }else{
                        arr[i].link = '无链接';
                    }
                    if(arr[i].toUid == null){
                        arr[i].toUid = 'NULL';
                    }
                }
                this.setState({
                    data:arr
                })
            } else {
                console.log("error")
            }
        });
        this.$api.totalpid({}).then(res => {
            if (res.data.status === 0) { 
                let arr = res.data.data;
                console.log(arr);
                this.setState({
                    totalpid:arr[0].totalpid
                })
            } else {
                console.log("error")
            }
        });
    }
    render() {
        const columns = [
            {
                title: '信件id',
                key: 'Pid',
                dataIndex: 'Pid',
            },
            {
                title: 'from',
                dataIndex: 'Uid',
                key: 'Uid ',
                ...this.getColumnSearchProps('Uid'),
            },
            {
                title: 'to',
                dataIndex: 'toUid',
                key: 'toUid',
                ...this.getColumnSearchProps('toUid'),
            },
            {
                title: '标题',
                dataIndex: 'Ptitle',
                key: 'Ptitle',
                ...this.getColumnSearchProps('Ptitle'),
            },
            {
                title: '信纸',
                dataIndex: 'paper',
                key: 'paper',
            },
            {
                title: '创建时间',
                dataIndex: 'Pday',
                key: 'Pday',
                ...this.getColumnSearchProps('Pday'),
            },
            {
                title: '链接',
                dataIndex: 'link',
                key: 'link',
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record) => 
                    this.state.data.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" 
                        onConfirm={() => this.handleDelete(record.Pid)}
                        >
                          <a>删除</a>
                        </Popconfirm>
                ) : null,
            }
        ];
        return (
            <div>
                <div className='bmuser'>
                    <span className='bmanage_user'>私密信管理</span>
                    <span className='buser_sum'>总信件数：{this.state.totalpid}</span>
                </div>
                <div style={{background:'rgb(238, 238, 238)',height:10}}></div>
                <div className='if_search'>
                    <span className='if_search_child'>按条件搜索</span>
                    <i className='iconfont iconzhuyi'style={{float:'right',margin:'15px 50px 0'}}></i>
                </div>
                <div className='buser_list'>
                    <span className='buser_list_title'>信件列表</span>
                    <Table columns={columns} dataSource={this.state.data} />
                </div>
            </div>
        )
    }
}

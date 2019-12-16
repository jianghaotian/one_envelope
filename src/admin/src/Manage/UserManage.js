import React, { Component } from 'react'
import '../css/analy.css'
import { Table, Input, Button, Icon,Avatar,Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';

const { Search } = Input;
export default class UserManage extends Component {
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
        this.$api.getusers().then(res => {
            this.setState({
                num:res.data.data[0].num
            })
        })
        this.$api.userlist().then(res=>{
            this.setState({
                data:res.data.data
            })
            let list = this.state.data;
            for(var i=0;i<list.length;i++){
                // console.log(list[i].Uimage);
                list[i].Uimage = <img src={"http://localhost:8000/head/" + list[i].Uimage} style={{width:'48px',height:'48px',textAlign:'center',lineHeight:'48px',borderRadius:'50%'}} />
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
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
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
    handleDelete =(uid) =>{
        this.$api.checkuid({uid:uid}).then(res =>{
            let tidlist = res.data.data
            console.log(tidlist);
            if(res.data.data.length > 0){
                for(var i=0;i<tidlist.length;i++){
                    this.$api.deluser({uid:uid,tid:tidlist[i].tid}).then((res)=>{
                        console.log(res.data.status);
                        if(res.data.status === 0){
                            let list = this.state.data;
                            for(var i=0;i<list.length;i++){
                                if(list[i].Uid == uid){
                                    console.log(list.splice(i,1));
                                    list.splice(i,1);
                                }
                            }
                            console.log(list);
                            this.setState({
                                data:list
                            })
                        }
                    })
                
                }      
            }else{
                console.log(this.state.data);

                this.$api.deluser({uid:uid,tid:0}).then((res)=>{
                    console.log(uid)
                    if(res.data.status === 0){
                        var list = this.state.data;
                        console.log(list);
                        for(var i=0;i<list.length;i++){
                            if(list[i].Uid == uid){
                                console.log(list.splice(i,1));
                                list.splice(i,1);
                            }
                        }
                        console.log(list);
                        this.setState({
                            data:list
                        })
                    }
                })
            }
        })
    }
    render() {
        const columns = [
            {
                title: '用户头像',
                key: 'Uimage',
                dataIndex: 'Uimage'
            },
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
                title: '注册时间',
                dataIndex: 'Uday',
                key: 'Uday',
                ...this.getColumnSearchProps('Uday'),
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record) => 
                this.state.data.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" 
                    onConfirm={() => this.handleDelete(record.Uid)}
                    >
                      <a>删除</a>
                    </Popconfirm>
                  ) : null,
                
            }
        ];
        return (
            <div>
                <div className='bmuser'>
                    <span className='bmanage_user'>用户管理</span>
                    <span className='buser_sum'>总用户数：{this.state.num}</span>
                </div>
                <div style={{background:'rgb(238, 238, 238)',height:10}}></div>
                <div className='if_search'>
                    <span className='if_search_child'>按条件搜索</span>
                    <i className='iconfont iconzhuyi'style={{float:'right',margin:'15px 50px 0'}}></i>
                </div>
                <div className='buser_list'>
                    <span className='buser_list_title'>用户列表</span>
                    <Table columns={columns} dataSource={this.state.data} />
                </div>
            </div>
        )
    }
}

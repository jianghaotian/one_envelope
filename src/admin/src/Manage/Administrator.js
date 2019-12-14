import React, { Component } from 'react'
import '../css/analy.css'
import { Table, Input, Button, Icon,Avatar,Popconfirm,Form } from 'antd';
import Highlighter from 'react-highlight-words';
import {Link} from 'react-router-dom'
import { Alert } from 'antd';
const { Search } = Input;
export default class UserManage extends Component {
    constructor(){
        super();
        this.state={
            searchText: '',
            searchedColumn: '',
            data:[],
            show:false
        }
      }
    componentDidMount(){
        this.$api.showadmin().then(res=>{
            let list = res.data.data;
            for(var i=0;i<list.length;i++){
                list[i].Aday = new Date(list[i].Aday).getFullYear()+'-'+(new Date(list[i].Aday).getMonth()+1)+'-'+new Date(list[i].Aday).getDate();
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
    handleDelete = (e) => {
        this.$api.deladmin({aid:e}).then(res=>{
            if(res.data == 0){
                this.setState({
                    show:true
                })
            }
            if(res.data.status === 0){
                let list = this.state.data;
                for(var i=0;i<list.length;i++){
                    if(list[i].Aid == e){
                       list.splice(i,1);
                    }
                }
                this.setState({
                    data:list
                })
            }
        });
    }
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    render() {
        const columns = [
            {
                title: '昵称',
                dataIndex: 'Aname',
                key: 'Aname',
            },
            {
                title: '管理员id',
                dataIndex: 'Aid',
                key: 'Aid',
            },
            {
                title: '手机号',
                dataIndex: 'Aphone',
                key: 'Aphone',
                ...this.getColumnSearchProps('Aphone'),
            },
            {
                title: '注册时间',
                dataIndex: 'Aday',
                key: 'Aday',
                ...this.getColumnSearchProps('Aday'),
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record) => 
                this.state.data.length >= 1 ? (
                    <Popconfirm title="确定删除?" 
                    onConfirm={() => this.handleDelete(record.Aid)}
                    >
                        <a>删除</a>   
                    </Popconfirm>
                    
                  ) : null,
                
            }
        ];
        return (
            <div>
                <div className='bmuser'>
                    <span className='bmanage_user'>管理员管理</span>
                    <Button style={{float:'right',marginRight:20}}><Link to='/backhome/add'>添加</Link></Button>
                </div>
                <div style={{border:'1px solid rgb(238, 238, 238)'}}></div>
                <div className='buser_list'>
                    <span className='buser_list_title'>管理员列表</span>
                    <Table columns={columns} dataSource={this.state.data} />
                </div>
            </div>
        )
    }
}
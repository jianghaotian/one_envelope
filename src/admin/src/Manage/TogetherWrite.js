import React, { Component } from 'react'
import '../css/analy.css'
import { Table, Input, Button, Icon,Avatar, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';

const { Search } = Input;
export default class UserManage extends Component {
    state = {
        searchText: '',
        searchedColumn: '',
        data: [
            {
                key: '1',
                Lid:1,
                Uid:1,
                Tid:1,
                Ltitle:'致自己',
                Pday:'2019-11-30',
                link:'无连接',
            },
            {
                key: '2',
                Lid:2,
                Uid:2,
                Tid:2,
                Ltitle:'致自己',
                Pday:'2019-11-30',
                link:'无连接',
            },
            {
                key: '3',
                Lid:3,
                Uid:3,
                Tid:3,
                Ltitle:'致自己',
                Pday:'2019-11-30',
                link:'无连接',
            },
        ]
    };
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
            data:this.state.data
        });
    };
    
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    // handleDelete = key => {
    //     const data = [...this.state.data];
    //     this.setState({ data: data.filter(item => item.key !== key) });
    // };
    handleSee = key => {
        const data = [...this.state.data];
        console.log(data[key-1]);
    };
    render() {
        const columns = [
            {
                title: '信件id',
                key: 'Lid',
                dataIndex: 'Lid'
            },
            {
                title: '写信人id',
                key: 'Uid',
                dataIndex: 'Uid'
            },
            {
                title: '主题id',
                dataIndex: 'Tid',
                key: 'Tid ',
                ...this.getColumnSearchProps('Tid'),
            },
            {
                title: '标题',
                dataIndex: 'Ltitle',
                key: 'Ltitle',
            },
            {
                title: '创建时间',
                dataIndex: 'Pday',
                key: 'Pday',
                ...this.getColumnSearchProps('Pday'),
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render: (text, record) => 
                this.state.data.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" 
                    // onConfirm={() => this.handleDelete(record.key)}
                    >
                      <a>删除</a>
                    </Popconfirm>
                  ) : null,
                
            },
           
                //   <span>
                //     <a onClick={(e)=>{this.deleteRow(e)}}>删除 </a>
                //     <span>|</span>
                //     {/* <Divider type="vertical" /> */}
                //     <a> 预览</a>
                //   </span>
        ];
        return (
            <div>
                <div className='bmuser'>
                    <span className='bmanage_user'>一起写管理</span>
                    <span className='buser_sum'>总信件数：</span>
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

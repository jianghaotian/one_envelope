import React, { Component } from 'react'
import '../css/analy.css';
import {Table, Input, Button, Icon} from 'antd';
import Highlighter from 'react-highlight-words';

export default class UserAnaly extends Component {
    constructor(){
        super();
        this.state = {
            searchText: '',
            searchedColumn: '',
            newuser:'',
            totalusers:'',
            data:[
                {
                    key: '1',
                    Uday: '2019-11-26',
                    newregist: 100,
                    dayVisit:800,
                    registSum: 1000,
                },
            ]
        };
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

    onChange=(value,dateString)=>{
        console.log(dateString);
    }
    componentDidMount(){
        this.$api.newuser({}).then(res => {
            if (res.data.status === 0) { 
                let arr = res.data.data;
                console.log(arr[0].usernum);
                this.setState({
                    newuser:arr[0].usernum,
                })
            } else {
                console.log("error")
            }
        })
        this.$api.totalnum({}).then(res => {
            if (res.data.status === 0) { 
                let arr = res.data.data;
                console.log(arr)
                console.log(arr[0].totalnum);
                this.setState({
                    totalusers:arr[0].totalnum
                })
            } else {
                console.log("error")
            }
        })
        this.$api.userdata({}).then(res => {
            if (res.data.status === 0) { 
                let arr = res.data.data;
                console.log(arr);
                for(var i=0;i<arr.length;i++){
                    arr[i].key = i+1;
                    arr[i].dayVisit = 3;
                    arr[i].registSum = this.state.totalusers;   
                }
                this.setState({
                    data:arr
                })
            } else {
                console.log("error")
            }
        })
    }
    render() {
        const columns = [
            {
                title: '时间',
                dataIndex: 'Uday',
                key: 'Uday',
                ...this.getColumnSearchProps('Uday'),
            },
            {
                title: '新注册数',
                dataIndex: 'newregist',
                key: 'newregist',
                ...this.getColumnSearchProps('newregist'),
            },
            {
                title: '日访问',
                dataIndex: 'dayVisit',
                key: 'dayVisit',
            },
            {
                title: '累计注册',
                dataIndex: 'registSum',
                key: 'registSum'
            }
        ];
        return (
            <div className='right-con'>
               <div className='ruseranaly'>
                   <div className='bruser-title'>用户分析</div>
                   <div className='bruser-con1'>
                       <li>
                           <span>昨日新注册用户</span>
                           <span className='usernum'>{this.state.newuser}</span>
                       </li>
                       <li id='usertr'>
                           <span>累计注册</span>
                           <span className='usernum'>{this.state.totalusers}</span>
                       </li>
                   </div>
               </div>
                <div className='rdata-inquire'>
                    <div className='bruser-title'>历史数据查询</div>
                    <Table columns={columns} dataSource={this.state.data} />             
                </div>
            </div>
        )
    }
}









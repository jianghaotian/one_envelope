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
            newletnum:0,
            totalletnum:'',
            sharenum:'',
            data:[
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
    onChange=(value,dateString)=>{
        console.log(dateString);
    }
    componentDidMount(){
        this.$api.addpletternum({}).then(res => {
            if (res.data.status === 0) { 
                let arr = res.data.data;
                console.log(arr);
                this.setState({
                    newletnum:arr[0].newtletnum+arr[1].newpletnum
                })

            } else {
                console.log("error")
            }
        })
        this.$api.shareletternum({}).then(res => {
            if (res.data.status === 0) { 
                let arr = res.data.data;
                console.log(arr[0].sharenum);
                this.setState({
                    sharenum:arr[0].sharenum,
                })
            } else {
                console.log("error")
            }
        })
        this.$api.totalletnum({}).then(res => {
            if (res.data.status === 0) { 
                let arr = res.data.data;
                this.setState({
                    totalletnum:arr[0].totaltletnum+arr[1].totalpletnum
                })
            } else {
                console.log("error")
            }
        });
        this.$api.letterdata({}).then(res => {
            if (res.data.status === 0) { 
                let simixie = res.data.data.p;
                let yiqixie = res.data.data.t;
                console.log(yiqixie);
                let d = [];
                for (var i = 0; i > -10; i--) {
                    let date = this.GetDateStr(i);
                    let simixieNum = 0;
                    let yiqixieNum = 0;
                
                    simixie.forEach(item => {
                        if (item.date == date) {
                            simixieNum += item.pidnum;
                        }
                    })
        
                    yiqixie.forEach(item => {
                        if (item.date1 == date) {
                            yiqixieNum += item.lidnum;
                        }
                    })
                    console.log(yiqixieNum);
                    d.push({key:i+1,date: date, simixieNum: simixieNum, yiqixieNum: yiqixieNum,letterSum:simixieNum+yiqixieNum});
                }
                this.setState({
                    data: d
                })
            } else {
                console.log("error")
            }
        })
    }
    GetDateStr=(c)=>{   
        var dd = new Date();  
        dd.setDate(dd.getDate() + c);
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) <10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
        return y + "-" + m + "-" + d;   
    }
    render() {
        const columns = [
            {
                title: '时间',
                dataIndex: 'date',
                key: 'date',
                ...this.getColumnSearchProps('date'),
            },
            {
                title: '新增私密写信',
                dataIndex: 'simixieNum',
                key: 'simixieNum',
                ...this.getColumnSearchProps('simixieNum'),
            },
            {
                title: '新增一起写信',
                dataIndex: 'yiqixieNum',
                key: 'yiqixieNum',
                ...this.getColumnSearchProps('yiqixieNum'),
            },
            {
                title: '累计写信',
                dataIndex: 'letterSum',
                key: 'letterSum'
            }
        ];
        return (
            <div className='right-con'>
               <div className='ruseranaly'>
                   <div className='bruser-title'>信件分析</div>
                   <div className='bruser-con'>
                       <li>
                           <span>昨日新增加写信数</span>
                           <span className='usernum'>{this.state.newletnum}</span>
                       </li>
                       <li>
                            <span>昨日新增分享链接数</span>
                            <span className='usernum'>{this.state.sharenum}</span>
                       </li>
                       <li id='usertr'>
                            <span>累计写信数</span>
                            <span className='usernum'>{this.state.totalletnum}</span>
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









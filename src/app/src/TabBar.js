import { TabBar } from 'antd-mobile';
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css'
import My from './My/My'
import WriteTogether from './WriteTogether/WriteTogether'
import Home from './Home/Home'
import LetterBox from './LetterBox/LetterBox'

export default class Tabbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'yellowTab'
    };
  }
  render() {
    return (
      <div style={ { position: 'fixed', height: '100%', width: '100%', top: 0 } }>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
        <TabBar.Item
            title="私密写"
            key="home"
            icon={
                <i className="iconfont icon-qianbi"></i>
            }
            selectedIcon={
                <i className="iconfont icon-qianbi"></i>
            }
            selected={this.state.selectedTab === 'home'}
            onPress={() => {
              this.setState({
                selectedTab: 'home',
              });
            }}
            data-seed="logId"
          >
            <Home />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <i className="iconfont icon-ERP_directory_classification"></i>
            }
            selectedIcon={
              <i className="iconfont icon-ERP_directory_classification"></i>
            }
            title="一起写"
            key="writeTogether"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}     
            data-seed="logId"      
          >
            <WriteTogether />
          </TabBar.Item>

          

          <TabBar.Item
            icon={
              <i className="iconfont icon-xinxiang"></i>
            }
            selectedIcon={
              <i className="iconfont icon-xinxiang"></i>
            }
            title="信箱"
            key="letterBox"
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
            data-seed="logId"
          >
            <LetterBox />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <i className="iconfont icon-ren"></i>
            }
            selectedIcon={
              <i className="iconfont icon-ren"></i>
            }
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
            data-seed="logId"
          >
            <My />
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

//ReactDOM.render(<TabBarExample />, mountNode);
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
      selectedTab: this.props.match.params.tab || 'home'
    };
  }
  render() {
    console.log(this.props.match.params.id);
    return (
      <div style={ { position: 'fixed', height: '100%', width: '100%', top: 0 } }>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="black"
          barTintColor="white"
          style={{borderTop:"0.5px solid  rgb(105, 104, 102)"}}
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
            selected={this.state.selectedTab === 'writeTogether'}
            onPress={() => {
              this.setState({
                selectedTab: 'writeTogether',
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
            selected={this.state.selectedTab === 'letterbox'}
            onPress={() => {
              this.setState({
                selectedTab: 'letterbox',
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
            selected={this.state.selectedTab === 'my'}
            onPress={() => {
              this.setState({
                selectedTab: 'my',
              });
            }}
            data-seed="logId"
          >
            <My history={this.props.history}/>
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

//ReactDOM.render(<TabBarExample />, mountNode);
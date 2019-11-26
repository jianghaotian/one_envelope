import React, { Component } from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import BackHeader from './component/BackHeader'
import BackMenu from './component/BackMenu';
import UserAnaly from './Statistics/UserAnaly';
import LetterAnaly from './Statistics/LetterAnaly';
import UserManage from './Manage/UserManage';
import LetterManage from './Manage/LetterManage';
import PaperManage from './Manage/PaperManage';
export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <BackHeader/>
                </div>
                <div className='backcontent'>
                    <div className='left'>
                        <BackMenu/>
                    </div>
                    <div className='right'>
                        <Switch>
                            <Route path='/buseranaly' component={UserAnaly}/>
                            <Route path='/bletteranaly' component={LetterAnaly}/>
                            <Route path='/busermanage' component={UserManage}/>
                            <Route path='/blettermanage' component={LetterManage}/>
                            <Route path='/bpapermanage' component={PaperManage}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

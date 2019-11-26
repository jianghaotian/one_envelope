import React from 'react'
import ReactDOM from 'react-dom'
import Login from './Login/Login'
import Tabbar from './TabBar'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import My from './My/My'
import Collection from './My/Collection'
import Setting from './My/Setting'
import Recover from './My/Recover'
import LetterBox from './LetterBox/LetterBox'
import TabBar from "./TabBar"

ReactDOM.render(
    <Router>
        <TabBar />
        <Switch>
            <Route path="/home" component={Tabbar} />
            <Route path="/recover" component={Recover} />
            <Route exact path="/setting" component={Setting}/>
            <Route exact path='/collection' component={Collection}/> 
        </Switch>
    </Router>,
    document.getElementById("root")
)
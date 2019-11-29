import React from 'react'
import ReactDOM from 'react-dom'
import Login from './Login/Login'
import Tabbar from './TabBar'
import ToMy from './Home/ToMy'
import HomeWrite from './Home/HomeWrite'
import Addressee from './Home/Addressee'
import Content from './Home/Content'
import {HashRouter as Router,Switch,Route} from 'react-router-dom'
import My from './My/My'
import Collection from './My/Collection'
import Setting from './My/Setting'
import Recover from './My/Recover'
import LetterBox from './LetterBox/LetterBox'
import TabBar from "./TabBar"
import Letter from './LetterBox/Letter'

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/home/:tab" component={Tabbar} />
            <Route path="/home" component={Tabbar} />
            <Route path="/tomy" component={ToMy} />
            <Route path="/homeWrite" component={HomeWrite} />
            <Route path="/content" component={Content} />
            <Route path="/addressee" component={Addressee} />
            {/* lxc */}
            <Route path="/recover" component={Recover} />
            <Route path="/setting" component={Setting}/>
            <Route path='/collection' component={Collection}/>
            <Route path="/letterbox" component={LetterBox} />
            <Route path='/my' component={My} />
            <Route path="/login" component={Login} />
            <Route path="/letter/:id" component={Letter} />
        </Switch>
    </Router>,
    document.getElementById("root")
)
import React from 'react'
import ReactDOM from 'react-dom'
import Login from './Login/Login'
import Tabbar from './TabBar'
import ToMy from './Home/ToMy'
import HomeWrite from './Home/HomeWrite'
import Addressee from './Home/Addressee'
import Content from './Home/Content'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

ReactDOM.render(
    <Router>
        <Login />
        <Switch>
            <Route path="/home" component={Tabbar} />
            <Route path="/tomy" component={ToMy} />
            <Route path="/homeWrite" component={HomeWrite} />
            <Route path="/content" component={Content} />
            <Route path="/addressee" component={Addressee} />
        </Switch>
    </Router>,
    document.getElementById("root")
)
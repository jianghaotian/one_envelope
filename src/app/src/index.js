import React from 'react'
import ReactDOM from 'react-dom'
import Login from './Login/Login'
import Tabbar from './TabBar'
import ToMy from './Home/ToMy'
import HomeWrite from './Home/HomeWrite'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

ReactDOM.render(
    <Router>
        <Login />
        <Switch>
            <Route path="/home" component={Tabbar} />
            <Route path="/tomy" component={ToMy} />
            <Route path="/homeWrite" component={HomeWrite} />
        </Switch>
    </Router>,
    document.getElementById("root")
)
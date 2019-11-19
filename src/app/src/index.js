import React from 'react'
import ReactDOM from 'react-dom'
import Login from './Login/Login'
import Tabbar from './TabBar'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

ReactDOM.render(
    <Router>
        <Login />
        <Switch>
            <Route path="/home" component={Tabbar} />
        </Switch>
    </Router>,
    document.getElementById("root")
)
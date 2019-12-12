import React, { Component } from 'react';
import {HashRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import Login_Back from './Login_back';
import TotalLetter from './component/TotalLetter';
export default class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path='/' component={Login_Back}/>
                <Route path='/backhome' component={TotalLetter}/>
                <Route path='/backhome'  render={()=><Redirect to='/backhome/buseranaly'/>}/>  
            </Router>
        )
    }
}



 



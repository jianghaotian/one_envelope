import React from 'react'
import ReactDOM from 'react-dom'
import Login from './Login/Login'
import Tabbar from './TabBar'
import ToMy from './Home/ToMy'
import HomeWrite from './Home/HomeWrite'
import Addressee from './Home/Addressee'
import Content from './Home/Content'
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
<<<<<<< HEAD
            <Route path="/recover" component={Recover} />
            <Route exact path="/setting" component={Setting}/>
            <Route exact path='/collection' component={Collection}/> 
=======
            <Route path="/tomy" component={ToMy} />
            <Route path="/homeWrite" component={HomeWrite} />
            <Route path="/content" component={Content} />
            <Route path="/addressee" component={Addressee} />
>>>>>>> 5b5bee290c2faddf7ab171099f8c362ed82cbbb7
        </Switch>
    </Router>,
    document.getElementById("root")
)
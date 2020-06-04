import React from 'react'
import ReactDOM from 'react-dom'
import Tabbar from './TabBar'
import Login from './Login/Login'
import Register from "./Login/Register"
import MsgLogin from "./Login/MsgLogin"
import {HashRouter as Router,Switch,Route} from 'react-router-dom'

import My from './My/My'
import Collection from './My/Collection'
import Setting from './My/Setting'
import Recover from './My/Recover'
import LetterBox from './LetterBox/LetterBox'
import Letter from './LetterBox/Letter'
import Message from './My/Message'
import Myedit from './My/Myedit'
import Changename from './My/Changename'
import Changeimg from './My/Changeimg'
import Changepsw from './My/Changepsw'
import Articalnum from './My/Articalnum'
import Feedback from './My/Feedback'
import Sharenum from './My/Sharenum'
import Awesome from './My/Awesome'



import InviteWrite from './WriteTogether/InviteWrite'
import WriteTogether from './WriteTogether/WriteTogether'
import togeCreate from './WriteTogether/togeCreate'
import togeContent from './WriteTogether/togeContent'
import Addressee from './WriteTogether/Addressee'
import inviteMember from './WriteTogether/inviteMember'
import invMeb from './WriteTogether/invMeb'


import Touxiang from './My/Touxiang'
import Cropimg from './My/Cropimg'


import api from './request/api';
import store from './redux/store';
import Collecletter from './My/Collecletter'
import HomeWrite from './Home/HomeWrite'
import Back from './Home/Back'
import CustomBack from './Home/CustomBack'
import Signature from './Home/Signature'
import Mysig from './My/Signature'
import WTBack from './WriteTogether/WTBack'
import PubWrite from './Public/PubWrite'
import PubBack from './Public/Back'
import Vip from './My/Vip'
import Myorder from './My/Myorder'
import UserInfo from './Public/UserInfo'

import LetterSend from './Home/LetterSend'
import Fanslist from './My/Fanslist'
import Attention from './My/Attention'
import Invite from './My/Invite'
import Myself from './My/Myself'
import Sharelist from './My/Sharelist'
import SignIn from './Home/SignIn'
import Inviteconfirm from './My/Inviteconfirm'
React.Component.prototype.$api = api;
React.Component.prototype.$store = store;

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/home/:tab" component={Tabbar} />

            <Route exact path="/" component={Login} />   
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/msgLogin" component={MsgLogin} />
            <Route path="/home" component={Tabbar} />
            <Route exact path="/homeWrite" component={HomeWrite} />
            <Route path="/back" component={Back} />
            <Route path='/cback' component={CustomBack} />
            <Route path='/signature' component={Signature} />
            <Route path="/pubWrite" component={PubWrite} />
            <Route path="/pubBack" component={PubBack} />
            <Route path="/UserInfo" component={UserInfo} />
            <Route path='/SignIn' component={SignIn} />
            {/* lxc */}
            <Route path="/recover" component={Recover} />
            <Route path="/setting" component={Setting}/>
            <Route path='/collection' component={Collection}/>
            <Route path="/letterbox" component={LetterBox} />
            <Route path='/my' component={My} />
            <Route path="/login" component={Login} />
            <Route path="/letter/:id" component={Letter} />
            <Route path="/collecletter/:id" component={Collecletter} />
            <Route path="/mymessage" component={Message} />
            <Route path="/myedit" component={Myedit} />
            <Route path="/changename" component={Changename} />
            <Route path="/changeimg" component={Changeimg} />
            <Route path="/changepsw" component={Changepsw} />
            <Route path="/articalnum" component={Articalnum} />
            <Route path='/feedback' component={Feedback} />
            <Route path='/mysig' component={Mysig} />
            <Route path='/sharenum' component={Sharenum} />
            <Route path="/vip" component={Vip} />
            <Route path="/myorder" component={Myorder} />
            <Route path="/sharelist" component={Sharelist} />
            <Route path="/awesome" component={Awesome}/>

            {/* zym */}
            <Route exact path="/invitewrite" component={InviteWrite}/>
            <Route exact path="/invitewrite/:id" component={InviteWrite}/>
            <Route exact path="/writeTogether" component={WriteTogether}/>
            <Route exact path="/togecreate" component={togeCreate} />
            <Route exact path="/togecreate/:id" component={togeCreate} />

            <Route exact path="/togeContent" component={togeContent} />
            <Route exact path="/togeContent/:id" component={togeContent} />

            <Route exact path="/inviteMember" component={inviteMember} />
            <Route exact path="/inviteMember/:id" component={inviteMember} />
            <Route exact path="/invMeb" component={invMeb} />
            <Route exact path="/invMeb/:id" component={invMeb} />

            <Route path="/addressee" component={Addressee} />


            <Route path="/touxiang" component={Touxiang} />
            <Route path="/cropimg" component={Cropimg} />
            <Route path='/wtBack' component={WTBack} />

            <Route path='/lettersend' component={LetterSend}/>
            <Route path='/lettersend/:id' component={LetterSend}/>

            <Route path='/fanslist' component={Fanslist}/>
            <Route path='/attentionlist' component={Attention}/>

            <Route path='/invite' component={Invite}/>
            <Route path='/inviteconfirm/' component={Inviteconfirm}/>
            <Route exact path='/myself' component={Myself}/>
            <Route exact path='/myself/:id' component={Myself}/>
        </Switch>
    </Router>,
    document.getElementById("root")
)
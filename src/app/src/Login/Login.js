import React, { Component } from 'react'
import 'antd/dist/antd.css'
import {Input,Button} from 'antd'
import '../css/Login.css'
import $ from 'jquery'
import {BrowserRouter as Router,Link,Switch,Route} from 'react-router-dom'

//手机,邮箱,密码正则表达式
let regTel = /^1\d{10}$/;
let regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
let regPwd = /^\w{6,20}$/;//包含英文，数字，下划线，6-20位

function pwdLogin(props){
    function loginSubmit(){
        //获取用户输入
        let uc = $("#U-login").val();
        let pwd = $("#Upassword").val();

        //验证格式
        if( uc == "" || pwd == ""){
            alert("请填写登录信息!");
        }else if(regTel.test(uc) && (regPwd.test(pwd)) ){
            //手机号码登录
            let Uphone = uc;
            alert("phone");
        }else if(regEmail.test(uc) && (regPwd.test(pwd)) ){
            //email登录
            let Uemail = uc;
            alert("email");
        }else if( !(regPwd.test(pwd)) ){
            alert("密码错误!");
        }else if( !(regTel.test(uc)) || !(regEmail.test(uc)) ){
            alert("手机号码或邮箱格式错误!");
        }
    }

    return(
       <div>
        <Input type="text" id="U-login" placeholder="请输入手机号/邮箱" />
        <Input type="password" id="Upassword" placeholder="请输入密码" style={{marginTop:"15px"}}/>
        <div style={{fontWeight:"bold",marginTop:"5px"}}>
            <span>
                短信登录
            </span>
            <span style={{float:"right"}}>
                忘记密码?
            </span>
        </div>
        <Button id="login-btn" type="submit" onClick={loginSubmit}>登录</Button>
       </div>
    )
}

function Register(props){
    function registerSubmit(){
        //获取用户输入
        let uc = $("#U-register").val();
        let pwd = $("#Upassword").val();
        let rpwd = $("#r-pwd").val();
        let name = $("#name").val();
        //验证
        if( uc=="" || pwd=="" || rpwd=="" || name==""){
            alert("请填写完整的注册信息!")
        }else if( !(regPwd.test(pwd)) ){
            alert("密码格式错误,请输入6-20位的数字，英文或下划线");
        }else if(pwd != rpwd){
            alert("两次输入的密码不一致");
        }else if(regTel.test(uc) && (regPwd.test(pwd)) ){
            //手机号码登录
            let Uphone = uc;
            alert("phone");
        }else if(regEmail.test(uc) && (regPwd.test(pwd)) ){
            //email登录
            let Uemail = uc;
            alert("email");
        }else if( !(regTel.test(uc)) || !(regEmail.test(uc)) ){
            alert("手机号码或邮箱格式错误!");
        }
    }
    return(
        <div>
            <div id="register-input">
                <Input type="text" id="U-register" placeholder="请输入手机号/邮箱" />
                {/* 验证码 */}
                <div id="Vcode-div">
                    <Input type="text" id="Vcode" placeholder="请输入验证码" />
                    <Button id="vcode-btn">获取验证码</Button>
                </div>
                <Input type="password" id="Upassword" placeholder="请输入密码(6-20位英文和数字)"/>
                <Input type="password" id="r-pwd" placeholder="请再次输入密码"/>
                <Input type="text" placeholder="昵称" id="name" />
                <Button id="register-btn" type="submit" onClick={registerSubmit} >注册</Button>
            </div>
        </div>
    )
}

export default class Login extends Component {
    componentDidMount(){
        let pathname = window.location.pathname;
        if(pathname == "/login" || pathname == "/register"){
            $("#login").css("display","block");
        }else{
            $("#login").css("display","none");
        }
    }
    //点击切换样式
    choice=(e)=>{
        var id = e.target.id;
        if(id == "pwd-login"){
            $("#pwd-login").css("color","black");
            $("#register").css("color","grey");
        }else{
            $("#pwd-login").css("color","grey");
            $("#register").css("color","black");
        }
    }
    render() {
        return (
            <div>
                {/* 登录界面 */}
                <div id="login">
                        <div id="login-choice">
                            <Link to="/login" id="pwd-login" style={{color:"black"}} onClick={this.choice}>密码登录</Link>&nbsp;|&nbsp;
                            <Link to="/register" id="register" onClick={this.choice}>立即注册</Link>
                        </div>
                        <div id="login-input">
                            <Switch>
                                <Route exact path="/" component={pwdLogin} />
                                <Route path="/login" component={pwdLogin} />
                                <Route path="/register" component={Register} />
                             </Switch>
                        </div>
                        <div id="icon-login">
                            <span>
                                <img src={require("../imgs/qq.png")} style={{float:'left'}}/>
                            </span>
                            <span>
                                <img src={require("../imgs/weixin.png")} style={{float:'right'}}/>
                            </span>
                        </div>
                </div>
            </div>
        )
    }
}

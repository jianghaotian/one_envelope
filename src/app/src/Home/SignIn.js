import React, { Component } from 'react';
import "../css/sign.css";
import { Modal } from 'antd-mobile';
import { List, Switch, Calendar } from 'antd-mobile';
import enUS from 'antd-mobile/lib/calendar/locale/en_US';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';

const alert = Modal.alert;

const sentence = ['世上最好的保鲜就是不断进步，让自己成为一个更好和更值得爱的人。',
'我疯狂收集每一个快乐的瞬间，用它们回击每一个糟糕的日子。',
'人生中有些事是不得不做的，于不得不做中勉强去做，是毁灭；于不得不做中做得好，是勇敢。',
'先笑一下，说不定你所期待的事等等就来了。',
'成年人的世界，不存在永恒的靠山，你最强的靠山，就是你的努力和独立。',
'理想好比星辰，用手是摸不着的。但你们就像航行在一片汪洋里的水手，可以把它当作指南针。',
'青春的路上少不了奔波和汗水，梦想的路上少不了质疑和嘲笑。不要因艰辛而放弃，更不要因阻塞而退缩。',
'去做自己喜欢的事，因为不快乐才是最累的。',
'我们在黑暗里摸索人生，只要心中有光就能找到路。',
'春有百花秋有月，夏有凉风冬有雪。若无闲事挂心头，便是人间好时节。',
'春有百花秋有月，夏有凉风冬有雪。若无闲事挂心头，便是人间好时节。',
];

var dayList = [];
for(let i=0;i<37;i++){
  let ele = {day:i,sign:0}
  dayList.push(ele)
}
// console.log(dayList);

const now = new Date();

export default class SignIn extends Component {
    constructor(){
        super();
        this.state = {
            id: 0,
            deg : 0,
            sign : '签',
            show: 'none',
            disabled:false
        }
    }
    componentDidMount(){
        //签到卡
        let DateArr = now.toDateString().split(" ");
        this.setState({
            day : DateArr[2],
            month : DateArr[1],
            year : DateArr[3],
            y : now.getFullYear(),
            m : now.getMonth()+1,
            SignList : []
        })
        var id;
        if(DateArr[2] >= 10){
            id = DateArr[2]%10;
        }else{
            id = DateArr[2];
        }
        // console.log(id);
        this.setState({
            id : id
        })
        //获取签到情况
        this.$api.getSign({month:now.getMonth()+1}).then(res=>{
          // console.log(res.data.data);
          let list = res.data.data;
          for(let i=0;i<list.length;i++){
            console.log(list[i].sday);
            let tag = list[i].sday;
            if(tag == this.state.day){
              this.setState({
                sign : '√',
                disabled : true
              })
            }
            // console.log(dayList[tag]);
            dayList[tag] = { day : Number(tag),sign : 1};
          }
        })
    }
    refresh=()=>{
        var timer;
        timer = setInterval(() => {
            let num = this.state.deg+10;
            this.setState({
                deg : num
            })
            if(num > 180){
                let r = Math.random().toFixed(1)*10;
                if(r == this.state.id){
                    ++r;
                }
                clearInterval(timer);
                this.setState({
                    deg : 0,
                    id : r
                })
            }
        },30);
    }
    qiandao=()=>{
        this.setState({
            sign : '√',
            disabled : true
        })
        this.$api.sign({sday:this.state.day,month:this.state.m}).then(res=>{
          console.log(res);
        })
    }
    showCalendar=()=>{
      this.setState({
        show : 'block'
      })
    }
    CloseCalendar=()=>{
      this.setState({
        show : 'none'
      })
    }
    render() {
        return (
            <div>
                {/* 顶部 */}
                {/* 日历 */}
                <div className='c-box' style={{display:this.state.show}}>
                  <div className="hah" onClick={this.CloseCalendar}>

                  </div>
                <div className="calendar">
                  <p>
                    <span id='c-year'>{this.state.y}&nbsp;年&nbsp;</span>
                    <span>{this.state.m}&nbsp;月&nbsp;</span>
                  </p>
                  <ul id="c-title">
                    <li>日</li>
                    <li>一</li>
                    <li>二</li>
                    <li>三</li>
                    <li>四</li>
                    <li>五</li>
                    <li>六</li>
                    <li>七</li>
                  </ul>
                  <ul id="c-date">
                    {
                      dayList.map((item,index)=>{
                        let zhouji = new Date(this.state.y,this.state.m,1).getDay();
                        let days = new Date(this.state.y,this.state.m,-1).getDate();
                        if(index < zhouji){
                          return <li className="dayLi"></li>
                        }else if(index > days){
                          return
                        }else if(index+1-zhouji == this.state.day){
                          if(item.sign == 1){
                            return <li className="dayLi" style={{
                              fontWeight:"bold",color:"#6fdfca",
                              border:'1.5px solid #6fdfca'
                            }}>
                              {item.day+1-zhouji}
                            </li>
                          }else{
                            return <li className="dayLi" style={{
                              fontWeight:"bold",color:"rgb(67, 197, 169)"
                            }}>
                              {item.day+1-zhouji}
                            </li>
                          }
                        }else{
                          if(item.sign == 1){
                            return <li className="dayLi" style={{
                              border:'1.5px solid #6fdfca'
                            }}>
                              {item.day+1-zhouji}
                            </li>
                          }else{
                            return <li className="dayLi">
                              {item.day+1-zhouji}
                            </li>
                          }
                        }
                      })
                    }
                  </ul>
                </div>
                </div>
                <div className='sign-top'>
                    <img src={require("../imgs/public/返回.png")} style={{width:"25px"}} onClick={()=>{
                        this.props.history.push("/home")
                    }}/>
                    <span>今天</span>
                    <span onClick={this.showCalendar}>日历</span>
                </div>   
                {/* 签到卡 */}
                <div className="sign-Box">
                    <div className='sb-top'>
                        <span id="day">{this.state.day}</span>
                        <span id="month">{this.state.month}.</span>
                        <span id='year'>{this.state.year}</span>
                    </div>
                    <img className="sb-img" src={require("../imgs/public/sig"+this.state.id+".jpg")} />
                    <div className="sig-p">
                       { sentence[this.state.id]}
                    </div>
                    <p id='sb-bottom'>·   一封签到    ·</p>
                    <img id='refresh' src = {require("../imgs/public/刷新(2).png")}
                    style={{transform:"rotate("+this.state.deg+"deg)"}}
                    onClick={this.refresh} />
                </div>
                <button id='signBtn' onClick={this.qiandao} disabled={this.state.disabled}>
                    {this.state.sign}
                </button>
            </div>
        )
    }
}

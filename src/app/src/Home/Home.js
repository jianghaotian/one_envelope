import React, { Component } from 'react'
import "../css/home.css";
import * as data from './data';
import { Popover,Button,Modal,List} from 'antd-mobile';

const Item = Popover.Item;
var bodyStartX,bodyEndX;
const prompt = Modal.prompt;
var list = data.dataList;
const alert = Modal.alert;
const LiItem = List.Item;

export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            toType : "",
            silder : {},
            dataList : [],
            toList : [],
            visible:false,
            selected: ''
        }
    }
    //点击气泡项
    onSelect = (opt) => {
        console.log(opt.props.value);
        var item = opt.props.item;
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
        if(opt.props.value == "del"){
            alert('Delete', '确认删除此信件?', [
                { text: 'Cancel', onPress: () => console.log('cancel') },
                { text: 'Ok', onPress: () => {
                    console.log('ok');
                } },
            ]);
        }else if(opt.props.value == "add-del"){
            var item = opt.props.item;
            console.log(item);
            alert('Delete', '确认删除给Ta的所有信?', [
                { text: 'Cancel', onPress: () => console.log('cancel') },
                { text: 'Ok', onPress: () => {
                    console.log('ok');
                } },
            ]);
        }else if(opt.props.value == "add-edit"){
            prompt(
                'ReName',
                'Please input name',
                [
                    { text: '取消' },
                    { text: '提交', onPress: text =>{var addName = `${text}`;
                                                    if(addName=="" || addName==undefined){
                                                        console.log("name为空");
                                                    }else{
                                                        let newList = [...this.state.toList,text];
                                                        this.setState({
                                                            toList : newList
                                                        })
                                                    }}   },
                ],
                'default',
                )
        }else if(opt.props.value == "add-write"){
            console.log("写信");
        }
      };
    // 显示slider
    select=()=>{
        this.setState({
            silder:{left:"0",transitionDuration:"1s"}
        })
    }
    //添加收信人
    addTo=()=>{
        prompt(
            'Name',
            'Please input name',
            [
                { text: '取消' },
                { text: '提交', onPress: text =>{var addName = `${text}`;
                                                if(addName=="" || addName==undefined){
                                                    console.log("name为空");
                                                }else{
                                                    let newList = [...this.state.toList,text];
                                                    this.setState({
                                                        toList : newList
                                                    })
                                                }}   },
            ],
            'default',
        )
    }
    // 返回主页
    cancel=()=>{
        this.setState({
            silder:{left:"-70%",transitionDuration:"1s"}
        })
    }
    //滑动事件
    bodyTouchStart=(e)=>{
        bodyStartX = e.touches[0].pageX;
        //console.log(bodyStartX);
    }
    bodyTouchMove=(e)=>{
        bodyEndX = e.changedTouches[0].pageX;
        var distance = bodyStartX - bodyEndX;
        if(distance < -50){
            this.setState({
                silder:{left:"0",transitionDuration:"1s"}
            })
        }else if(distance > 50){
            this.setState({
                silder:{left:"-70%",transitionDuration:"1s"}
            })
        }
    }
    componentDidMount(){
        //body滑动
        document.ontouchstart = this.bodyTouchStart;
        document.ontouchmove = this.bodyTouchMove;
        //获取toList
        let toList = [];
        for(var i=0;i<list.length;i++){
            if(toList.indexOf(list[i].to) == -1){
                toList.push(list[i].to);
            }
        }
        this.setState({ 
            dataList : list,
            toList : toList,
            toType : toList[0]
        })
    }
    selTo=(item)=>{
        //console.log(item);
        this.setState({
            toType : item,
            silder:{left:"-70%",transitionDuration:"1s"}
        })
    }
    //跳转编辑页
    toWrite=()=>{
        console.log("write");
    }
    //跳转到我的页面
    toMy=()=>{
        console.log("tomy");
    }
    render() {
        return (
            <div>
                {/* 顶部 */}
                <div className="home-back">
                    <div className="home-toType" onClick={this.select}>
                        <span>{this.state.toType}</span>
                    </div>
                </div>

                {/* 信件动态 */}
                <div className="home-body">
                    <ul>
                        {
                            this.state.dataList.map((item,index)=>{
                                if(item.to == this.state.toType){
                                    return <li className="content" key={index}>
                                            <div className="c-top">
                                                <div className="title">
                                                    <span style={{fontSize:"15px",color:"rgb(75, 76, 141)",fontWeight:"bold"}}>
                                                        {item.title}
                                                    </span>
                                                    {/* <br /> */}
                                                    <p style={{margin:"0",marginTop:"3px"}}>
                                                        {item.publishYear}年{item.publishMonth}月{item.publishDay}日
                                                        &nbsp;&nbsp;&nbsp;
                                                        {item.publishHour}:{item.publishTime}
                                                    </p>
                                                </div>
                                                <div className="home-down">
                                                    <Popover mask
                                                        visible={this.state.visible}
                                                        onSelect={this.onSelect}
                                                        overlay={[
                                                        (<Item value="share" item={item}><p className="DM-p" ><img className="DM-img" src={require("../imgs/Home/share.png")} />分享</p></Item>),
                                                        (<Item value="edit" item={item}><p className="DM-p" ><img className="DM-img" src={require("../imgs/Home/direct.png")} />编辑</p></Item>),
                                                        (<Item value="del" item={item}><p className="DM-p" ><img className="DM-img" src={require("../imgs/Home/del.png")} />删除</p></Item>),

                                                        ]}
                                                        align={{overflow: { adjustY: 0, adjustX: 0 },offset: [-10, 0],}}>
                                                        <div>
                                                            <img src={require("../imgs/Home/down(1).png")} />
                                                        </div>
                                                    </Popover>
                                                </div>
                                            </div>
                                            <div className="c-content">
                                                {item.content}
                                            </div>
                                        </li>
                                }
                            })
                        }
                    </ul>
                </div>

                {/* 向右滑动 */}
                <div className="slider" style={this.state.silder}>
                    {/* 返回键 */}
                    <div className="slider-top">
                        <img src={require("../imgs/Home/cancel.png")} onClick={this.cancel} style={{float:"right",padding:"5px"}} />
                    </div>

                    {/* 用户信息 */}
                    <div className="slider-user" onClick={this.toMy}>
                        {/* 用户头像 */}
                        <div className="slider-profile">
                            <img src={require("../imgs/Home/girl.png")} style={{width:"50px",height:"50px"}} />
                        </div>
                        {/* 用户名 */}
                        <span className="slider-userName">
                            一封
                        </span>
                    </div>

                    {/* 私密写分类 */}
                    <div className="slider-toList">
                        <div className="add_top">
                            <span>收件人</span>
                            <button className="addTo" onClick={this.addTo}>
                                <img src={require("../imgs/Home/addTo.png")} />
                            </button>
                        </div>
                            <List>
                                {
                                    this.state.toList.map((item,index)=>{
                                        return <li key={index} className="addli">
                                                <LiItem arrow="horizontal" multipleLine onClick={()=>{this.selTo(item)}} className="addressee">
                                                    <span style={{fontSize:"16px"}}>{item}</span>
                                                </LiItem>
                                                <div className="add-edit">
                                                    <Popover mask
                                                    visible={this.state.visible}
                                                    onSelect={this.onSelect}
                                                        overlay={[
                                                                (<Item value="add-edit" item={item} ><button className="DM-p" ><img className="DM-img" src={require("../imgs/Home/direct.png")} />编辑</button></Item>),
                                                                (<Item value="add-del" item={item}  ><button className="DM-p" ><img className="DM-img" src={require("../imgs/Home/del.png")} />删除</button></Item>),
                                                                (<Item value="add-write" item={item}  ><button className="DM-p" ><img className="DM-img" src={require("../imgs/Home/write.png")} />写信</button></Item>)
            
                                                        ]}
                                                        align={{overflow: { adjustY: 0, adjustX: 0 },offset: [-10, 0],}}>
                                                        <div>
                                                            <img src={require("../imgs/Home/yinhua(1).png")} style={{marginTop:"10px",marginLeft:"8px"}} />
                                                        </div>
                                                    </Popover>
                                                </div>
                                                </li>
                                    })
                                }
                            </List>
                    </div>
                </div>

                {/* pencil */}
                <div className="pencil" onClick={this.toWrite}>

                </div>
            </div>
        )
    }
}

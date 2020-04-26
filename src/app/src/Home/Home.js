import React, { Component } from 'react'
import "../css/home.css";
import { Popover,Button,Modal,List} from 'antd-mobile';
import { ActionSheet, Toast } from 'antd-mobile';
import {HashRouter as Router,Route,Link} from 'react-router-dom'

const Item = Popover.Item;
const prompt = Modal.prompt;
const alert = Modal.alert;
const LiItem = List.Item;

//触摸事件变量
var bodyStartX,bodyEndX,bodyStartY;

export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            toUid:0,
            toType : "",//toNick
            silder : {},//滑动样式
            dataList : [],//信件列表
            toList : [],//收件人列表
            visible:false,//滑动事件
            selected: '',
            clicked: 'none',
            headImg:"",//用户头像
            Uname:""//用户名
        }
    }
    //点击气泡项
    onSelect = (opt) => {
        //console.log(opt);
        console.log(opt.props.value);
        var item = opt.props.item;
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
        //信件删除
        if(opt.props.value == "del"){
            //console.log(item);
            var pid = item.Pid;
            alert('删除', '确认丢弃此信件?', [
                { text: '留着', onPress: () => {
                    console.log('cancel');
                } },
                { text: '不要啦', onPress: () => {
                    console.log('ok');
                    //改变state
                    let list = this.state.dataList;
                    //console.log(list);
                    for(let i=0;i<list.length;i++){
                        if(list[i].Pid == pid){
                            list.splice(i,1);
                        }
                    }
                    //console.log(list);
                    this.setState({
                        dataList : list
                    })
                    //后端删除
                    this.$api.delPrivateLetter({pid:pid}).then(res=>{
                        console.log(res.data);
                    })
                } },
            ]);
        }else if(opt.props.value == "share"){//分享
            // this.showShareActionSheet();
            var pid = item.Pid;
            var shareModel1 = {
                shareQQ: function (pid,type) {
                    var param = {
                        pid:pid,
                        type:type
                    };
                    var s = [];
                    for (var i in param) {
                        s.push(i + '=' + encodeURIComponent(param[i] || ''));
                    }
                    // http://localhost:3000/#/homeWrite/?pid=97&type=edit
                    var targetUrl = "https://yf.htapi.pub/v1/private/share?pid="+pid;
                    return targetUrl;
                }
            }
            var shareUrl = shareModel1.shareQQ(pid,'edit');
            // console.log(shareUrl);
            alert('分享链接', shareUrl, [
                { text: '取消分享', onPress: () => console.log('cancel') },
                { text: '复制链接', onPress: () => {this.handleCopy()
                    // am-modal-alert-content
                    alert('复制成功','',[
                        {text:'确定',onPress:()=>{console.log('确定')}},
                        {text:'打开链接',onPress:()=>{window.open(shareUrl,'一封','height=640, width=360')}}
                    ])
                    
                } },
            ]);
        }else if(opt.props.value == "add-del"){//删除收信人
            var item = opt.props.item;
            //console.log(item);
            alert('Delete', '确认删除给Ta的所有信?', [
                { text: 'Cancel', onPress: () => console.log('cancel') },
                { text: 'Ok', onPress: () => {
                    console.log('ok');
                    let newTo = this.state.toList;
                    newTo.splice(newTo.indexOf(item),1);
                    this.$api.delAddressee({toNick : item}).then(res=>{
                        console.log(res);
                        alert('Delete','删除成功',[
                            {text : 'ok',onPress:()=>{}}
                        ])
                        this.setState({
                            toList : newTo
                        })
                    })
                } },
            ]);
        }else if(opt.props.value == "add-edit"){//重命名
            prompt(
                '编辑',
                '请输入昵称',
                [
                    { text: '取消' },
                    { text: '提交', onPress: text =>{var addName = `${text}`;
                                                    if(addName=="" || addName==undefined){
                                                        console.log("name为空");
                                                    }else{
                                                        let list = this.state.toList;
                                                        var old = item;
                                                        for(var i=0;i<list.length;i++){
                                                            if(list[i] == item){
                                                                list[i]= addName;
                                                            }
                                                        }
                                                        this.$api.reName({newtoNick:addName,oldtoNick:old}).then(res=>{
                                                        })
                                                        this.setState({
                                                            toList : list
                                                        })    
                                                        if(old = this.state.toType){
                                                            this.props.history.push("/home?to="+addName);
                                                            this.setState({
                                                                toType : addName
                                                            })
                                                        }  
                                                    }}   },
                ],
                'default',
                )
        }else if(opt.props.value == "add-write"){
            console.log("写信");
        }
    };
    handleCopy = () => {
        const spanText = document.getElementsByClassName('am-modal-alert-content')[0].innerText;
        const oInput = document.createElement('input');
        oInput.value = spanText;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand('Copy'); // 执行浏览器复制命令
        oInput.className = 'oInput';
        oInput.style.display = 'none';
        document.body.removeChild(oInput);
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
            '请输入昵称',
            [
                { text: '取消' },
                { text: '提交', onPress: text =>{var addName = `${text}`;
                                                if(addName=="" || addName==undefined){
                                                    console.log("name为空");
                                                }else{
                                                    let timestamp = Date.parse(new Date());
                                                    this.$api.addAddressee({toNick :addName,pday:timestamp}).then(res=>{
                                                        console.log(res);
                                                        this.$api.getToUList().then(res=>{
                                                            console.log(res.data.data);
                                                            //改变state
                                                            let list = res.data.data;
                                                            let toUArr = [];
                                                            for(let i=0;i<list.length;i++){
                                                                toUArr.push(list[i].toNick)
                                                            }
                                                            //console.log(toUArr);
                                                            this.setState({
                                                                toList : toUArr
                                                            })
                                                        })
                                                    })
                                                }}   },
            ],
            'default',
        )
    }
    //收回Slider
    cancel=()=>{
        this.setState({
            silder:{left:"-70%",transitionDuration:"1s"}
        })
    }
    //滑动事件
    bodyTouchStart=(e)=>{
        bodyStartX = e.touches[0].pageX;
        bodyStartY = e.touches[0].pageY;
        //console.log(bodyStartX,bodyStartY);
        if(bodyStartX > 245 || bodyStartY > 510){
            this.setState({
                silder:{left:"-70%",transitionDuration:"1s"}
            })
        }
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
        
        //getToUListData
        this.$api.getToUList().then(res=>{
            //console.log(res);
            let toU = [];
            let list = res.data.data;
            this.setState({
                Uname : list[0].uname,
                headImg : list[0].uimage
            })

            //getToUList
            for(let i=0;i<list.length;i++){
                toU.push(list[i].toNick);
            }
            //Set toType
            var search = this.props.history.location.search;
            let to = decodeURI(search.substr(4,search.length));
            if(to == ""){
                //无参数时,显示第一个收件人
                this.$api.getLetter({toNick:toU[0]}).then(res =>{
                    //console.log(res.data.data);
                    this.setState({
                        dataList : res.data.data,
                        toType:toU[0]
                    })
                })
            }else{
                //有参数时，显示对应收件人
                this.$api.getLetter({toNick:to}).then(res =>{
                    //console.log(res.data.data);
                    this.setState({
                        dataList : res.data.data,
                        toType:to
                    })
                })
            }

            //Set toList
            this.setState({
                toUid: 0,
                toList : toU,
            })
        })

    }
    //分享
    // dataList = [
    //     { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
    //     { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
    //   ].map(obj => ({
    //     icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
    //     title: obj.title,
    // }));
    // showShareActionSheet = () => {
    //     ActionSheet.showShareActionSheetWithOptions({
    //       options: this.dataList,
    //       // title: 'title',
    //       message: '分享给朋友',
    //     },
    //     (buttonIndex) => {
    //       this.setState({ clicked: buttonIndex > -1 ? this.dataList[buttonIndex].title : 'cancel' });
    //       //console.log(buttonIndex);
    //       if(buttonIndex == 0){
    //           console.log("share to weixin");
    //       }else{
    //         console.log("share to qq");
    //       }
    //     });
    //   }
    //select toType
    selTo=(item)=>{
        this.props.history.push("/home?to="+item);
        //获取收信人对应信件
        this.$api.getLetter({toNick:item}).then(res =>{
             this.setState({
                 dataList : res.data.data
             })
        })
        //set toType并收回Slider
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
        this.props.getIndex(1);
    }
    render() {
        //console.log(this.state.toUid);
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
                    {/* 信件列表 dataList */}
                    <ul>
                        {
                            this.state.dataList.map((item,index)=>{
                               // if(item.toNick == this.state.toType){
                                    return <li className="content" key={index}>
                                            <div className="c-top">
                                                <div className="title">
                                                    <span style={{fontSize:"15px",color:"black"}}>
                                                        {item.Ptitle}
                                                    </span>
                                                    <p style={{margin:"0",marginTop:"3px"}}>
                                                        {/* {item.Pday} */}
                                                        {new Date(item.Pday).getFullYear()}年
                                                        {new Date(item.Pday).getMonth()+1}月
                                                        {new Date(item.Pday).getDate()}日
                                                        &nbsp;&nbsp;
                                                        {new Date(item.Pday).getHours()<10?"0"+ new Date(item.Pday).getHours():new Date(item.Pday).getHours()}
                                                        :
                                                        {new Date(item.Pday).getMinutes()<10?"0"+ new Date(item.Pday).getMinutes():new Date(item.Pday).getMinutes()}
                                                    </p>
                                                </div>
                                                <div className="home-down">
                                                    <Popover mask={true}
                                                        visible={this.state.visible}
                                                        onSelect={this.onSelect}
                                                        overlay={[
                                                        (<Item value="share" item={item}>
                                                            <button className="DM-p" >
                                                                <img className="DM-img" src={require("../imgs/Home/share.png")} />
                                                                分享
                                                            </button>
                                                        </Item>),
                                                        (<Item value="edit" item={item}>
                                                            <Router><Link style={{color:"black"}} to={"/homeWrite/?pid="+item.Pid+"&type=edit"}>
                                                            <button className="DM-p" >
                                                                <img className="DM-img" src={require("../imgs/Home/direct.png")} />
                                                                编辑
                                                            </button>
                                                            </Link></Router>
                                                        </Item>),
                                                        (<Item  value="del" item={item}>
                                                            <button className="DM-p" >
                                                                <img className="DM-img" src={require("../imgs/Home/del.png")} />
                                                                删除
                                                            </button>
                                                        </Item>)
                                                        ]}
                                                        // align={{overflow: { adjustY: 0, adjustX: 0 },offset: [0, 5],}}
                                                        >
                                                        <div>
                                                            <img src={require("../imgs/Home/down(1).png")} />
                                                        </div>
                                                    </Popover>
                                                </div>
                                            </div>
                                            {/* <Link to={"/homeWrite/"+item.Pid} > */}
                                            <Link to={"/homeWrite/?pid="+item.Pid+"&type=edit"} >
                                            <div className="c-content">
                                                {item.Pcontent}
                                            </div>
                                            </Link>
                                        </li>
                               // }
                            })
                        }
                    </ul>
                </div>

                {/* 向右滑动 */}
                <div className="slider" style={this.state.silder}>
                    {/* 返回键 */}
                    <div className="slider-top">
                        {/* <img src={require("../imgs/Home/cancel.png")} onClick={this.cancel} style={{float:"right",padding:"5px"}} /> */}
                        <i className="iconfont icon-guanbi" style={{float:"right",padding:"5px",color:'orange'}}  onClick={this.cancel}/>
                    </div>

                    {/* 用户信息 */}
                    <div className="slider-user">
                        {/* 用户头像 */}
                        <div className="slider-profile" onClick={this.toMy}>
                            <img src={"https://yf.htapi.pub/head/"+this.state.headImg} style={{width:"50px",height:"50px"}} />
                        </div>
                        {/* 用户名 */}
                        <span className="slider-userName">
                            {this.state.Uname}
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
                        {/* 收信人列表 toList */}
                            <List>
                                {
                                    this.state.toList.map((item,index)=>{
                                        return <li key={index} className="addli">
                                                <LiItem arrow="empty" multipleLine onClick={()=>{this.selTo(item)}} className="addressee">
                                                    <span style={{fontSize:"16px"}}>{item}</span>
                                                </LiItem>
                                                <div className="add-edit">
                                                    <Popover mask
                                                    visible={this.state.visible}
                                                    onSelect={this.onSelect}
                                                        overlay={[
                                                                (<Item value="add-edit" item={item} ><button className="DM-p" ><img className="DM-img" src={require("../imgs/Home/direct.png")} />编辑</button></Item>),
                                                                (<Item value="add-del" item={item}  ><button className="DM-p" ><img className="DM-img" src={require("../imgs/Home/del.png")} />删除</button></Item>),
                                                                (<Item value="add-write" item={item}  >
                                                                    <Router><Link style={{color:"black"}} to={"/homeWrite/?toNick="+item+"&type=create"}>
                                                                        <button className="DM-p" ><img className="DM-img" src={require("../imgs/Home/write.png")} />写信</button>
                                                                    </Link></Router>
                                                                </Item>)
            
                                                        ]}
                                                        align={{overflow: { adjustY: 0, adjustX: 0 },offset: [-10, 0],}}>
                                                        <div>
                                                            <img src={require("../imgs/Home/xiala(2).png")} style={{marginTop:"8px",marginLeft:"0px"}} />
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
                <Link to={"/homeWrite/?toNick="+this.state.toType+"&type=create"}>
                    <div className="pencil" onClick={this.toWrite}>

                    </div>
                </Link>
            </div>
        )
    }
}

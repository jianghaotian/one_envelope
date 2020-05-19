## 1.1选择背景(私密写) 

**请求url**

```
URL : https://yf.htapi.pub/v1/image/choosebg
```

**请求方式**

```
POST
```

**接收参数**

| 参数   | 说明             | 类型pid |
| ------ | ---------------- | ------- |
| pid    | 信件id           | int     |
| bgData | 背景的base64编码 |         |

**返回参数**

```
{
  status: 0,
  message: 'OK',
  data: [
  	{
        "bg":"1234567894238_11.jpg",
        "custom":1
  	} 
  ]
}
```

## 1.2展示背景（私密写） 

**请求url**

```
URL : https://yf.htapi.pub/v1/image/showpbg
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明   | 类型pid |
| ---- | ------ | ------- |
| pid  | 信件id | int     |

**返回参数**

```
{
    status：0,
    data:[
       {
            "bgimage":"1234567894238_11.jpg",
            "custom":1
  	   }
    ]
}
```

## 1.3插入音频（私密写）

**请求url**

```
URL : https://yf.htapi.pub/v1/music/insertMp3
```

**请求方式**

```
POST
```

**接收参数**

| 参数    | 说明           | 类型pid |
| ------- | -------------- | ------- |
| pid     | 信件id         | int     |
| mp3Data | 音频base64编码 | string  |

**返回参数**

```
{
  status: 0,
  message: 'OK'
}
```

## 1.4显示插入的音频（私密写）

**请求url**

```
URL : https://yf.htapi.pub/v1/music/showmusic
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明   | 类型pid |
| ---- | ------ | ------- |
| pid  | 信件id | int     |

**返回参数**

```
[
    "1586871163338_55.mp3"
]
```

## 1.5插入图片(一起写)

**请求url**

```
URL : https://yf.htapi.pub/v1/image/insertTimg
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明   | 类型Lid |
| ---- | ------ | ------- |
| Lid  | 信件id | int     |

**返回参数**

```
{
  status: 0,
  message: 'OK',
  data: [
    RowDataPacket {
      
    }
  ]
}
```

## 1.6展示插入图片(一起写)

**请求url**

```
URL : https://yf.htapi.pub/v1/image/showTimg
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明   | 类型Lid |
| ---- | ------ | ------- |
| Lid  | 信件id | int     |

**返回参数**

```
[
    "1234567894238_11.jpg"
]
```

## 1.7帮助与反馈

**请求url**

```
URL : https://yf.htapi.pub/v1/mine/feedback
```

**请求方式**

```
POST
```

**接收参数**

| 参数     | 说明               | 类型feedback |
| -------- | ------------------ | ------------ |
| feedback | 用户输入的反馈信息 | text         |

**返回参数**

```
{
  status: 0,
  message: 'OK',
  data: [
    RowDataPacket {
      
    }
  ]
}
```

## 1.8搜索信箱

**请求url**

```
URL : https://yf.htapi.pub/v1/mailbox/searchmail
```

**请求方式**

```
GET
```

**接收参数**

| 参数   | 说明     | 类型   |
| ------ | -------- | ------ |
| ptitle | 信件标题 | string |

**返回参数**

```
{
  status: 0,
  message: 'OK',
  data: [
    {
        "pid":98,
        "Ptitle":"快来给他写信吧",
        ...
    }
  ]
}
```

## 1.9删除自定义背景图（私密写）

**请求url**

```
URL : https://yf.htapi.pub/v1/image/delbgimg
```

**请求方式**

```
POST
```

**接收参数**

| 参数   | 说明             | 类型   |
| ------ | ---------------- | ------ |
| pid    | 信件id           | int    |
| bgname | 自定义背景图名称 | string |

**返回参数**

```
{
  status: 0,
  message: 'OK',
  data: [
    RowDataPacket {
      
    }
  ]
}
```

## 2.0删除插入图片（一起写）

**请求url**

```
URL : https://yf.htapi.pub/v1/image/delInsertTimg
```

**请求方式**

```
POST
```

**接收参数**

| 参数      | 说明     | 类型   |
| --------- | -------- | ------ |
| lid       | 信件id   | int    |
| insertImg | 插图名称 | string |

**返回参数**

```
{
  status: 0,
  message: 'OK',
  data: [
    RowDataPacket {
      
    }
  ]
}
```

## 2.1删除音频（私密写）

**请求url**

```
URL : https://yf.htapi.pub/v1/music/delMp3
```

**请求方式**

```
POST
```

**接收参数**

| 参数  | 说明   | 类型   |
| ----- | ------ | ------ |
| pid   | 信件id | int    |
| music | 音频名 | string |

**返回参数**

```
{
  status: 0,
  message: 'OK'
}
```

## 2.2生成分享链接

**请求url**

```
URL : https://yf.htapi.pub/v1/private/share
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| pid  | 信件id | int  |

**返回参数**

```
{
  status: 0,
  message: 'OK'
}
```

## 2.3插入音频（一起写）

**请求url**

```
URL : https://yf.htapi.pub/v1/music/insertMusic
```

**请求方式**

```
POST
```

**接收参数**

| 参数    | 说明           | 类型pid |
| ------- | -------------- | ------- |
| lid     | 信件id         | int     |
| mp3Data | 音频base64编码 | string  |

**返回参数**

```
{
  status: 0,
  message: 'OK'
}
```

## 2.4显示插入的音频（一起写）

**请求url**

```
URL : https://yf.htapi.pub/v1/music/presentMusic
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明   | 类型pid |
| ---- | ------ | ------- |
| lid  | 信件id | int     |

**返回参数**

```
[
    "1586871163338_55.mp3"
]
```

## 2.5修改首页背景图

**请求url**

```
URL : https://yf.htapi.pub/v1/image/changeHomeBack
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明     | 类型pid |
| ---- | -------- | ------- |
| src  | 图片编码 | base64  |

**返回参数**

```
{
  status: 0,
  message: 'OK'
}
```

## 2.6获取首页背景图

**请求url**

```
URL : https://yf.htapi.pub/v1/image/homeImage
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明 | 类型pid |
| ---- | ---- | ------- |

**返回参数**

```
{
  status: 0,
  message: 'OK'，
  data:{
      uid:用户id
      homeBack：首页背景图名称
      signature：个性签名
  }
}
```

## 2.7修改个性签名

**请求url**

```
URL : https://yf.htapi.pub/v1/mine/changeSignature
```

**请求方式**

```
POST
```

**接收参数**

| 参数      | 说明       | 类型    |
| --------- | ---------- | ------- |
| signature | 新个性签名 | varchar |

**返回参数**

```
{
  status: 0,
  message: 'OK'，
}
```

## 2.8删除音频（一起写）

**请求url**

```
URL : https://yf.htapi.pub/v1/music/delmusic
```

**请求方式**

```
POST
```

**接收参数**

| 参数  | 说明   | 类型   |
| ----- | ------ | ------ |
| lid   | 信件id | int    |
| music | 音频名 | string |

**返回参数**

```
{
  status: 0,
  message: 'OK'
}
```

## 2.9更换背景（一起写）

**请求url**

```
URL : https://yf.htapi.pub/v1/together/changebg
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| lid  | 信件id | int  |
| ppid | 信纸id |      |

**返回参数**

```
{
  status: 0,
  message: 'OK'
}
```

## 3.0展示公开写信件list（所有）

**请求url**

```
URL : https://yf.htapi.pub/v1/public/getOlist
```

**请求方式**

```
GET
```

**返回参数**

```
{
    "status": 0,
    "message": "OK",
    "data": [
        {
            "Uname": "awy",
            "Uimage": "1588060318833_61.png",
            "Oid": 2,
            "Otitle": "YIOY",
            "Ocontent": "ERWG",
            "Oday": null,
            "Uid": 21,
            "ppid": 59,
            "number": 3
        }
    ]
}
```

## 3.1展示公开写信件内容

**请求url**

```
URL : https://yf.htapi.pub/v1/public/getOletter
```

**请求方式**

```
GET
```

**接收参数**

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| oid  | 信件id | int  |

**返回参数**

```
{
    "status": 0,
    "message": "OK",
    "data": [
        {
            "ppimage": "1589187443989_34.jpg",
            "Oid": 2,
            "Otitle": "YIOY",
            "Ocontent": "ERWG",
            "Oday": null,
            "Uid": 21,
            "ppid": 59,
            "number": 3,
            "weather":""
        }
    ]
}
```

## 3.2书写公开写信件内容

**请求url**

```
URL : https://yf.htapi.pub/v1/public/writeOpen
```

**请求方式**

```
POST
```

**接收参数**

| 参数     | 说明     | 类型 |
| -------- | -------- | ---- |
| Otitle   | 信件标题 | char |
| Ocontent | 信件内容 |      |
| ppid     | 信纸id   |      |
| Oday     | 创建日期 |      |
| weather  | 天气情况 |      |

**返回参数**

```
{
  status: 0,
  message: 'OK'
}
```

## 3.3修改公开写信件背景

**请求url**

```
URL : https://yf.htapi.pub/v1/public/modifyObg
```

**请求方式**

```
POST
```

**接收参数**

| 参数 |  说明  | 类型 |
| ---- | :----: | :--: |
| oid  | 信件id |      |
| ppid | 背景id |      |

**返回参数**

```
{
  status: 0,
  message: 'OK'
}

```

## 3.4删除公开写信件

**请求url**

```
URL : https://yf.htapi.pub/v1/public/delOletter
```

**请求方式**

```
POST
```

**接收参数**

| 参数 |  说明  | 类型 |
| ---- | :----: | :--: |
| oid  | 信件id |      |

**返回参数**

```
{
  status: 0,
  message: 'OK'
}
```

## 3.5个人所写公开信

**请求url**

```
URL : https://yf.htapi.pub/v1/public/perOlist
```

**请求方式**

```
GET
```

**接收参数**

**返回参数**

```
{
  status: 0,
  message: 'OK'
}
```

## 3.6返回用户的vip属性 

**请求url**

```
URL : https://yf.htapi.pub/v1/public/isVip
```

**请求方式**

```
GET
```

**接收参数**

**返回参数**

```
{
    "status": 0,
    "message": "OK",
    "data": [
        {
            "Uname": "awy",
            "Vip": 0
        }
    ]
}
```

## 3.7修改信件内容(公开写) 

**请求url**

```
URL : https://yf.htapi.pub/v1/public/amendLetter
```

**请求方式**

```
POST
```

**接收参数**

| 参数     |       说明       | 类型 |
| -------- | :--------------: | :--: |
| oid      |      信件id      |      |
| Otitle   |     信件标题     |      |
| Ocontent |     信件内容     |      |
| Oday     | 信件修改后的日期 |      |
| weather  |     天气情况     |      |

**返回参数**

```
{
    "status": 0,
    "message": "OK"
}

```

## 3.8点赞

**请求url**

```
URL : https://yf.htapi.pub/v1/public/addLikes
```

**请求方式**

```
GET
```

**接收参数**

| 参数 |  说明  | 类型 |
| ---- | :----: | :--: |
| oid  | 信件id |      |





**返回参数**

```
{
    "status": 0,
    "message": "OK",
    "data": [
        {
            "number": 1
        }
    ]
}
```

## 3.9取消点赞

**请求url**

```
URL : https://yf.htapi.pub/v1/public/cancelLikes
```

**请求方式**

```
GET
```

**接收参数**

| 参数 |  说明  | 类型 |
| ---- | :----: | :--: |
| oid  | 信件id |      |

**返回参数**

```
{
    "status": 0,
    "message": "OK",
    "data": [
        {
            "number": 0
        }
    ]
}
```

## 4.0改变积分值

**请求url**

```
URL : https://yf.htapi.pub/v1/mine/setgrade
```

**请求方式**

```
POST
```

**接收参数**

**返回参数**

```
{
    "status": 0,
    "message": "OK",
}
```

## 4.1获取积分值

**请求url**

```
URL : https://yf.htapi.pub/v1/mine/getgrade
```

**请求方式**

```
GET
```

**接收参数**

**返回参数**

```
{
    "status": 0,
    "message": "OK",
    "data": [
        {
            "grade": 50
        }
    ]
}
```














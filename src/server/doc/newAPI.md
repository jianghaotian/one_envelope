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
        "1234567894238_11.jpg"
    ]
}
```

## 1.3插入音频

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

## 1.4显示插入的音频

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

## 1.9删除插入图片（私密写）

**请求url**

```
URL : https://yf.htapi.pub/v1/image/delInsertPimg
```

**请求方式**

```
POST
```

**接收参数**

| 参数      | 说明     | 类型   |
| --------- | -------- | ------ |
| pid       | 信件id   | int    |
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

## 2.0删除音频（私密写）

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






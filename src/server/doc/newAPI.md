## 1.1插入图片(私密写)

**请求url**

```
URL : https://yf.htapi.pub/v1/image/insertPimg
```

**请求方式**

```
POST
```

**接收参数**

| 参数 | 说明   | 类型pid |
| ---- | ------ | ------- |
| pid  | 信件id | int     |

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

## 1.2展示插入图片（私密写）

**请求url**

```
URL : https://yf.htapi.pub/v1/image/showInsertImg
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
    "1234567894238_11.jpg"
]
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

| 参数 | 说明   | 类型pid |
| ---- | ------ | ------- |
| pid  | 信件id | int     |

**返回参数**

```
{
  status: 0,
  message: 'OK',
  data: OkPacket {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    serverStatus: 2,
    warningCount: 0,
    message: '(Rows matched: 1  Changed: 1  Warnings: 0',
    protocol41: true,
    changedRows: 1
  }
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








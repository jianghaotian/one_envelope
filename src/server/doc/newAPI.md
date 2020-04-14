## 1.1插入图片

**请求url**

```
URL : https://yf.htapi.pub/v1/image/insertImg
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

## 1.2展示插入图片

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






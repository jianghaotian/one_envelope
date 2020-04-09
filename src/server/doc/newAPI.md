## 2.1. 获取所有私密信件

**请求url**

```
URL : https://yf.htapi.pub/v1/private/getletter
```

**请求方式**

```
GET
```

**接收参数**

| 参数  | 说明     | 类型 |
| ----- | -------- | ---- |
| toUid | 收信人id | int  |

**返回参数**

```
{
  status: 0,
  message: 'OK',
  data: [
    RowDataPacket {
      Pid: 1,
      Ptitle: '哈啊啊',
      Pcontent: '哈哈',
      Uid: 1,
      toUid: 1,
      toNick: '致自己',
      isSend: 0,
      Pday: 1574867047089
    }
  ]
}
```

## 2.2. 展示收信人列表
# API文档

URL : https://yf.htapi.pub/v1


| 错误码 |  错误解释 |
| ----- | -------  |
| 10003 | 参数错误  |
| 10006 | |
| 1045 | 连接数据库失败 |
| 1049 | 连接数据库失败 |
| 1062 | SQL语句错误 |

# 登录注册

#### 1.获取验证码

###### 请求url

```
URL : https://yf.htapi.pub/v1/users/verification
```

###### 请求方式

```
POST
```

###### 接收参数

| 参数    | 说明                |
| ------- | ------------------- |
| account | 手机号/邮箱         |
| type    | 类型  (phone/email) |

######  返回参数:

```
{
	status: 0,
	message: "OK"
}
```

#### 2.用户注册

###### 请求url

```
URL : https://yf.htapi.pub/v1/users/register
```

###### 请求方式

```
POST
```

###### 接收参数

| 参数         | 说明                | 类型   |
| ------------ | ------------------- | ------ |
| account      | 手机号/邮箱         | string |
| type         | 类型  (phone/email) | string |
| verification | 验证码              | string |
| password     | 密码                | string |
| name         | 昵称 (可选)         | string |

######  返回参数:

```
{
	status: 0,
	message: "OK"
}
```

#### 3.用户登录

###### 请求url

```
URL : https://yf.htapi.pub/v1/users/login
```

###### 请求方式

```
POST
```

###### 接收参数

| 参数     | 说明                | 类型   |
| -------- | ------------------- | ------ |
| account  | 手机号/邮箱         | string |
| type     | 类型  (phone/email) | string |
| password | 密码                | string |

######  返回参数:

```
{
	status: 0,
	message: "OK"
}
```

# 私密写

#### 4.获取所有私密信件

###### 请求url

```
URL : https://yf.htapi.pub/v1/private/getletter
```

###### 请求方式

```
GET
```

###### 接收参数

| 参数  | 说明     | 类型 |
| ----- | -------- | ---- |
| toUid | 收信人id | int  |

######  返回参数（示例）:

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

#### 5.展示收信人列表

###### 请求url

```
URL : https://yf.htapi.pub/v1/private/getlist
```

###### 请求方式

```
GET
```

###### 接收参数

###### 返回参数（示例）:

```
{
  status: 0,
  message: 'OK',
  data: [
    RowDataPacket {
       Uimage：用户头像
       Uname：用户名
       toNick：收信人昵称
       toUid：收信人id
    }
  ]
}
```

####  6.书写信件内容

###### 请求url

```
URL : https://yf.htapi.pub/v1/private/writeletter
```

###### 请求方式

```
POST
```

###### 接收参数

| 参数     | 说明       | 类型   |
| -------- | ---------- | ------ |
| Ptitle   | 信件标题   | string |
| Pcontent | 信件内容   | string |
| toUid    | 收信人id   | int    |
| toNick   | 收信人称呼 | string |
| Pday     | 创建时间   | 时间戳 |

###### 返回参数（示例）:

```
{
  status: 0,
  message: 'OK',
}
```

#### 7.删除私密写的信件 

###### 请求url

```
URL : https://yf.htapi.pub/v1/private/getletter/pdelete
```

###### 示例

```
https://yf.htapi.pub/v1/private/getletter/pdelete?pid=6
```

###### 请求方式

```
POST
```

###### 接收参数

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| Pid  | 信件id | int  |

###### 返回参数（示例）:

```
{
  status: 0,
  message: 'OK',
}
```

#### 8.更改收信人昵称

###### 请求url

```
URL : https://yf.htapi.pub/v1/private/changetoNick
```

###### 示例

```
 https://yf.htapi.pub/v1/private/changetoNick?toNick=妈妈&toUid=2
```

###### 请求方式

```
POST
```

###### 接收参数

| 参数   | 说明       | 类型   |
| ------ | ---------- | ------ |
| toUid  | 收信人id   | int    |
| toNick | 收信人昵称 | string |

###### 返回参数（示例）:

```
{
  status: 0,
  message: 'OK',
}
```

# 一起写

#### 8.获取一起写主题

###### 请求url

```
URL : https://yf.htapi.pub/v1/together/theme/
```

###### 请求方式

```
GET
```

###### 接收参数

###### 返回参数（示例）:

```
{
  status: 0,
  message: 'OK',
  data: [
    RowDataPacket {
      Tid: 1,
      Tname: '哈啊啊',
      Timage: '哈哈',
      isPrivate: 1,
      Uid: 1,
      Tnumber:2,
    }
  ]
}
```

#### 9.获取主题详情

###### 请求url

```
URL : https://yf.htapi.pub/v1/together/theme/showtheme
```

###### **示例：**

```
http:localhost:8000/v1/together/theme/showtheme?tid=1
```

###### 请求方式

```
GET
```

###### 接收参数

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| Tid  | 主题id | int  |

###### 返回参数（示例）:

```
{
  status: 0,
  message: 'OK',
  data: [
    RowDataPacket {
      lid: 1,
      tid: 1,
      tname: '哈啊啊',
      timage: '哈哈',
      ltitle:'啦啦',
      lcontent:'呦呦',
      tday：'2019/9/8'
      uid: 1,
    }
  ]
}
```

####  10.获取成员

###### 请求url

```
URL : https://yf.htapi.pub/v1/together/theme/showtheme/member
```

###### 示例

```
http://localhost:3000/v1/together/theme/showtheme/member?tid=2
```

###### 请求方式

```
GET
```

###### 接收参数

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| Tid  | 主题id | int  |

###### 返回参数（示例）:

```
{
  status: 0,
  message: 'OK',
  data: [
   	 {
      uname:"anwenyue"
    }
  ]
}
```

#### 11.书写主题信件内容

###### 请求url

```
URL : https://yf.htapi.pub/v1/together/theme/:tid/writeletter
```

###### 请求方式

```
POST
```

###### 接收参数

| 参数     | 说明     | 类型   |
| -------- | -------- | ------ |
| Ltitle   | 信件标题 | string |
| Lcontent | 信件内容 | string |
| Tday     | 创建日期 | string |
| Tid      | 主题id   | int    |

###### 返回参数（示例）:

```
{
  status: 0,
  message: 'OK',
}
```

# 信箱

#### 12.获取信箱内容

###### 请求url

```
URL : https://yf.htapi.pub/v1/mailbox
```

###### 请求方式

```
GET
```

###### 接收参数

###### 返回参数（示例）:

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
      Uimage:'',
      Uname:'妈妈',
      toNick: '致自己',
      isSend: 0,
      Pday: 1574867047089
    }
  ]
}
```

#### 13.展示信箱具体内容

###### 请求url

```
URL : https://yf.htapi.pub/v1/mailbox/showmail
```

###### 示例

```
https://yf.htapi.pub/v1/mailbox/showmail?pid=3
```

###### 请求方式

```
GET
```

###### 接收参数

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| pid  | 信件id | int  |

返回参数（示例）:

```
{
  status: 0,
  message: 'OK',
  data: [
    RowDataPacket {
      Pid: 3,
      Ptitle: 'uid4',
      Pcontent: 'lulala',
      Uid: 4,
      toUid: 1,
      toNick: '致安文悦',
      isSend: 1,
      Pday: 1569872354698,
      isCollection: 0,
      isDelete: 0
    }
  ]
}
```

# 我的

####  14.获取个人信息

###### 请求url

```
URL : https://yf.htapi.pub/v1/mine
```

###### 请求方式

```
GET
```

###### 接收参数

###### 返回参数（示例）:

```
{
  status: 0,
  message: 'OK',
  data: [
    RowDataPacket {
      Uimage:'',
      Uname:'妈妈',
	  Ufraction:12
    }
  ]
}
```

#  私密写和信箱公共

#### 15.展示信件内容

###### 请求url

```
URL : https://yf.htapi.pub/v1/showletter/show
```

###### 示例

```
https://yf.htapi.pub/v1/showletter/show？pid=5
```

###### 请求方式

```
GET
```

###### 接收参数

| 参数 | 说明   | 类型 |
| ---- | ------ | ---- |
| Pid  | 信件id | int  |

###### 返回参数（示例）:

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

#### 




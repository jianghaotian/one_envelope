#### 1.登录

###### 请求url

```
URL : https://yf.htapi.pub/v1/adminlogin/login
```

###### 请求方式

```
GET
```

###### 接收参数

| 参数     | 说明        |
| -------- | ----------- |
| account  | 手机号/邮箱 |
| password | 密码        |

###### 返回参数:

```
{
	status: 0,
	message: "OK"
}
```

#### 2.获取用户名

###### 请求url

```
URL : https://yf.htapi.pub/v1/adminlogin/getname
```

###### 请求方式

```
GET
```

###### 接收参数

###### 返回参数:

```
{
	status: 0,
	message: "OK",
	data:[
        {aname:'maxiaoyanD'}
	]
}
```

#### 3.展示管理员列表

###### 请求url

```
URL : https://yf.htapi.pub/v1/adminmanager/show
```

###### 请求方式

```
GET
```

###### 接收参数

| 参数 | 说明     |
| ---- | -------- |
| page | 当前页数 |

###### 返回参数:

```
{
	status: 0,
	message: "OK",
	data:[
        {
            aid:1,
            aname:'maxiaoyan',
            aphone:'15978613',
            aday:'2019-8-8'
        }
	]
}
```

#### 4.删除管理员

###### 请求url

```
URL : https://yf.htapi.pub/v1/adminmanager/deladmin
```

###### 请求方式

```
POST
```

###### 接收参数

| 参数 | 说明     |
| ---- | -------- |
| aid  | 管理员id |

###### 返回参数:

```
{
	status: 0,
	message: "OK",
}
```

#### 5.检查添加手机号码

###### 请求url

```
URL : https://yf.htapi.pub/v1/adminmanager/checkphone
```

###### 请求方式

```
GET
```

###### 接收参数

| 参数   | 说明   |
| ------ | ------ |
| aphone | 手机号 |

###### 返回参数:

```
{
	status: 0,
	message: "OK",
}
```

#### 6.添加管理员

###### 请求url

```
URL : https://yf.htapi.pub/v1/adminmanager/addadmin
```

###### 请求方式

```
POST
```

###### 接收参数

| 参数      | 说明     |
| --------- | -------- |
| aphone    | 手机号码 |
| apassword | 密码     |
| aname     | 昵称     |
| aday      | 创建日期 |

###### 返回参数:

```
{
	status: 0,
	message: "OK",
}
```

#### 4.删除管理员



# 统计

#### 1.获取昨日新注册用户数量

###### 请求url

```
URL : https://yf.htapi.pub/v1/analy
```

###### 请求方式

```
GET
```

###### 接收参数

###### 返回参数

```
{
	status: 0, 
 	message: 'OK', 
 	data: [ { usernum: 3 } ]     
 } 
```

#### 2.获取累计注册

###### 请求url

```
URL : https://yf.htapi.pub/v1/analy/totalnum
```

###### 请求方式

```
GET
```

###### 接收参数

###### 返回参数

```
{
	status: 0, 
 	message: 'OK', 
 	data: [ { totalnum: 3 } ]     
 } 
```

#### 3.获取历史数据查询

###### 请求url

```
URL : https://yf.htapi.pub/v1/analy/userdata
```

###### 请求方式

```
GET
```

###### 接收参数

###### 返回参数

```
{
	status: 0, 
	message: 'OK', 
    data: [
    	{
             Uday:'2019-12-13',
             newregist:1
         } 
    ]     
} 
```

#### 4.获取昨日新增加的写信数

###### 请求url

```
URL : https://yf.htapi.pub/v1/analy/addletternum
```

###### 请求方式

```
GET
```

###### 接收参数

###### 返回参数

```
{
	status: 0, 
	message: 'OK', 
	data: [ { newletnum: 1 } ]     
} 
```

#### 5.获取昨日新增加分享数

###### 请求url

```
URL : https://yf.htapi.pub/v1/analy/shareletternum
```

###### 请求方式

```
GET
```

###### 接收参数

###### 返回参数

```
{
	status: 0, 
	message: 'OK', 
	data: [ { sharenum: 1 } ]     
} 
```

#### 6.获取累计写信数

###### 请求url

```
URL : https://yf.htapi.pub/v1/analy/totalletnum
```

###### 请求方式

```
GET
```

###### 接收参数

###### 返回参数

```
{
	status: 0, 
	message: 'OK', 
	data: [ { totalletnum: 1 } ]     
} 
```

# 管理

#### 1.获取私密写信件列表

###### 请求url

```
URL : https://yf.htapi.pub/v1/adminletman
```

###### 请求方式

```
GET
```

###### 接收参数

###### 返回参数

```
{
	status: 0, 
 	message: 'OK', 
 	data:[
          {
            Pid: 23,
            Ptitle: '快来给他写信吧',
            Pcontent: '他的信箱还没有东西哦',
            Uid: 1,
            toUid: null,
            toNick: '哈哈哈',
            isSend: 0,
            Pday: 1576045963000,
            isCollection: 0,
            isDelete: 0
           }
       ]  
 } 
```

#### 2.私密写信件列表删除操作

###### 请求url

```
URL : https://yf.htapi.pub/v1/adminletman/delpletter
```

###### 请求方式

```
POST
```

###### 接收参数

###### 返回参数

```
{
	status: 0, 
 	message: 'OK'
 } 
```

#### 3.获取一起写信件列表

###### 请求url

```
URL : https://yf.htapi.pub/v1/adminletman/tletterlist
```

###### 请求方式

```
GET
```

###### 接收参数

###### 返回参数

```
{
	status: 0, 
	message: 'OK', 
	data:[
		{
			Lid: 2,
			Ltitle: '邀请朋友吧',
			Lcontent: '欢迎来到一起写',
			Uid: 1,
			Lday: 1576045963000,
			isDelete: 0
		}
		]
}
```

#### 4.一起写信件列表删除操作

###### 请求url

```
URL : https://yf.htapi.pub/v1/adminletman/deltletter
```

###### 请求方式

```
POST
```

###### 接收参数

###### 返回参数

```
{
	status: 0, 
 	message: 'OK'
 } 
```

#### 5.获取一起写信件总数

###### 请求url

```
URL : https://yf.htapi.pub/v1/adminletman/totallid
```

###### 请求方式

```
GET
```

###### 接收参数

###### 返回参数

```
{
	status: 0, 
 	message: 'OK'
 	data:[
        {
            totallid:2
        }
 	]
 } 
```


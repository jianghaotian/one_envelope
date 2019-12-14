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


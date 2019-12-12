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

###### 返回参数:

```
{
	status: 0,
	message: "OK"
}
```

#### 2.用户注册
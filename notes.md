```
1.请求拦截器发生的时候，还没有请求
```

```
2.无论是所有请求拦截，还是实例请求拦截，跟代码的先后顺序有关
```

```
3.登录相关的逻辑
  - 打开网址默认是 '/'，然后重定向到首页
  - 在首页判断是否登录，如果登录则停留，否则跳转到登录页
  - 只有登陆页才不需要token，其他都得去判断
  - 刷新页面的时候应该再去拿storage里面数据存到pinia
```

```
4.动态引入图标
  - https://blog.csdn.net/weixin_44079946/article/details/122792327
  - https://blog.csdn.net/var_deng/article/details/108666077
```

```
4.RBAC
  - 返回的菜单数据会有url，每个url对应的都是路由的path，路由的path也对应component
  - 方案：
    - 直接有component这个字段，弊端在于名称路径必须一致
    - 前端代码中会有path与component的映射，通过path去寻找component（采取）
```

```
5.coderwhy工具使用
  - coderwhy add3page user -d src/views/main/system/user
```

```
6.通过获取的userMenus的path与路由中写的path对应，去找到对应的component
```

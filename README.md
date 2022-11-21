# npm-upload-greninjasunlei介绍

## Install

```
npm i npm-upload-greninjasunlei
```

## 内部属性

| 字段  | 类型   | 描述               |
| ----- | ------ | ------------------ |
| Role  | any    | 用户的一下基本信息 |
| Token | string | 用户传入的token    |
| URL   | string | 用户传入的路由     |

## 方法的使用

`const filePublicFunc = new FileFunc(`

  `'传入的url',`

  `传入的token,`

  `'传入文件的信息',`

 `);`

## 内部方法

#### 1.**removeFile:**

​	**描述:删除指定文件**

​	**参数:想删除的文件 内部必须有id**

​	**使用:filePublicFunc.removeFile(*{id:123}*);**

#### 2.downloadInstitutionSingleFile

​	**描述:下载指定文件**

​	**参数:想下载的文件 内部必须有id**

​	**使用:filePublicFunc.downloadInstitutionSingleFile(*{id:123}*);**

#### 3.getFileInfo

​	**描述:获取某个角色上传的所有文件**

​	**使用:filePublicFunc.getFileInfo();**

#### 4.getMessageSuccess

​	**描述:下载成功是提示**

#### 5.getMessageError

​	**描述:下载失败是提示**

# npm-antd-upload

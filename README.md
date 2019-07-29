# 书源仓库

## js 引擎
js 文件由 Nashorn JavaScript引擎运行，[中文教程](https://segmentfault.com/a/1190000006041626)。该引擎与 v8 有些差异，开发时可使用 ```jjs``` 进入命令行实际测试。

## 文件信息
以以下格式写在文件开头注释
```
/*
website: https://www.snwx8.com/ （对应网站主页）
author: cildhdi （作者信息，GitHub用户名/邮箱）
*/
```

## 网络请求及 html 解析
使用 [Jsoup](https://jsoup.org/apidocs/overview-summary.html)库，可以直接在 js 中方便的使用该 Java 库发起网络请求。示例：
``` js
var Jsoup = Java.type('org.jsoup.Jsoup');
// Get 请求
var document = Jsoup.connect("https://www.baidu.com").get();
// 获取百度一下按钮
var input = document.selectFirst("#su");
// 获取属性
var title = input.attributes().get("value");
```

## Util 
示例
``` js
var Util = Java.type('Util');
Util.urlEncode(name, "gbk");
```
### urlEncode(str: string, enc: string): string
将 str 以 enc 编码为 url 编码的字符串

## 实现以下三个函数
返回值需要使用 ```JSON.stringify``` 转换为字符串。
### search(name: string)
返回
``` json
{
    success: boolean,
    data: {
        books: {
            srcName: string,
            name: string,
            author: string,
            bookUrl: string,
            introduction: string,
            coverUrl: string
        }[]
    }
}
```

### getChapters(url: string)
返回
``` json
{
    success: boolean,
    data: {
        chapters: {
            index: number,
            url: string,
            name: string,
            content: string
        }[]
    }
}
```

### getContent(url: string)
返回
``` json
{
    success: boolean,
    data: {
        content: string
    }
}
```
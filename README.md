# 书源仓库

## js 引擎
js 文件由 [Rhino JavaScript](https://developer.mozilla.org/zh-CN/docs/Mozilla/Projects/Rhino/Documentation) 引擎运行，该引擎与 v8 有些差异，可按照它的 [Github 主页](https://github.com/mozilla/rhino) 的 Readme 进入命令行测试。

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
var Jsoup = org.jsoup.Jsoup';
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
Util.urlEncode(name, "gbk");
```
### urlEncode(str: string, enc: string): string
将 str 以 enc 编码为 url 编码的字符串

### print(s: string)
输出字符串到控制台

## 实现以下三个函数
返回值需要使用 ```JSON.stringify``` 转换为字符串，在 Rhino 中可能无法正确 stringify 含有 Java String 的对象，可以用 ``` "" + javaStr ``` 转换成 js 字符串。
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
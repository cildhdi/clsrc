/*
website: https://www.snwx8.com/
author: cildhdi
*/

var Util = Java.type('Util');
var Jsoup = Java.type('org.jsoup.Jsoup');

function search(name) {
    var document = Jsoup.connect("https://www.snwx8.com/modules/article/search.php?searchkey=" + Util.urlEncode(name, "gbk")).get();
    var li = document.selectFirst("#newscontent > div.l > ul > li");

    var res = [], title, bookUrl;
    while (li) {
        title = li.selectFirst("span.s2 > a");
        bookUrl = title.attributes().get("href");
        res.push({
            srcName: "少年文学",
            name: title.text(),
            author: li.selectFirst("span.s4 > a").text(),
            bookUrl: bookUrl,
            introduction: "暂无介绍",
            coverUrl: bookUrl.replace("https://www.snwx8.com/book/", "https://www.snwx8.com/files/article/image/") + bookUrl.substr(bookUrl.length - 7, 6) + "s.jpg",
        });
        li = li.nextElementSibling();
    }
    return JSON.stringify({
        success: true,
        data: {
            books: res
        }
    });
}

function getChapters(url) {
    var chapters = [];
    var doc = Jsoup.connect(url).get();
    var url = doc.selectFirst("#fmimg > p > a").attributes().get("href");
    var document = Jsoup.connect("https://www.snwx8.com" + url).get()
    var li = document.selectFirst("#Chapters > ul > li");
    var index = 1;
    while (li != null) {
        var a = li.selectFirst("a");
        chapters.push({
            index: index++,
            url: a.attributes().get("href"),
            name: a.text(),
            content: ""
        });
        li = li.nextElementSibling();
    }
    return JSON.stringify({
        success: true,
        data: {
            chapters: chapters
        }
    });
}

function getContent(url) {
    var doc = Jsoup.connect(url).get();
    var content = doc.selectFirst("#BookText");
    return JSON.stringify({
        success: true,
        data: {
            content: content.text()
        }
    });
}
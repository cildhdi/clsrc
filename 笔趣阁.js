/*
website: https://www.mibaoge.com
author: cildhdi
*/

var Jsoup = org.jsoup.Jsoup;

function toJsStr(str) {
    return "" + str;
}

function search(name) {
    var document = Jsoup.connect("https://www.mibaoge.com/search.php?keyword=" + Util.urlEncode(name, "utf-8")).get();
    var li = document.selectFirst("body > div.result-list > div");

    var res = [], title, bookUrl;
    while (li) {
        title = li.selectFirst("div.result-game-item-detail > h3 > a");
        bookUrl = title.attributes().get("href");
        res.push({
            srcName: "笔趣阁",
            name: toJsStr(title.text()),
            author: toJsStr(li.selectFirst("div.result-game-item-detail > div > p:nth-child(1) > span:nth-child(2)").text()),
            bookUrl: toJsStr(bookUrl),
            introduction: toJsStr(li.selectFirst("div.result-game-item-detail > p").text()),
            coverUrl: toJsStr(li.selectFirst("div.result-game-item-pic > a > img").attributes().get("src")),
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
    var li = doc.selectFirst("#list > dl > dd:nth-child(2)");
    var index = 1;
    while (li != null) {
        var a = li.selectFirst("a");
        chapters.push({
            index: index++,
            url: "https://www.mibaoge.com" + a.attributes().get("href"),
            name: toJsStr(a.text()),
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
    var content = doc.selectFirst("#content");
    return JSON.stringify({
        success: true,
        data: {
            content: toJsStr(Util.replaceTag(content.html()))
        }
    });
}
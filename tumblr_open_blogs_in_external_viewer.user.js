// ==UserScript==
// @name         Open Tumblr blog links in external viewer
// @namespace    https://www.tumblr.com/
// @version      1.0
// @description  This will rewrite blog links on Tumblr to be opened in an external viewer.
// @author       Sven Haberer
// @match        https://www.tumblr.com/*
// ==/UserScript==

var selectors;
var hrefFinder;

if (window.location.pathname == "/dashboard") {
    selectors = "#base-container > div.D5eCV > div.gPQR5 > div.lSyOz > main > div.j8ha0 > div:nth-child(2)";
    hrefFinder = nodes => nodes.filter(node => node.hasAttribute("data-id"))
        .map(node => node.querySelector("div > div > article"))
        .filter(node => node !== null)
        .flatMap(node => {
        return [
            "header > div > div.ZJdm4 > div.ffqNn > div > div > span > span > a",
            "header > div > div.ZJdm4 > div.ffqNn > div > div.jOhmG > div.eLzSX > span > span > a",
            "div.LaNUG > div > div > span > div > div.fAAi8 > div.QkCNg > div.GdjMk > div > div > span > span > a"]
            .map(selector => node.querySelector(selector))
            .filter(node => node);
    });
} else if (window.location.pathname == "/following") {
    selectors = "#base-container > div.D5eCV > div.gPQR5 > div.lSyOz > main > section";
    hrefFinder = nodes => nodes.flatMap(node => Array.from(node.querySelectorAll("a")));
}

var foo = /(?:\/(?!www)([^\/]+)\.tumblr\.com|tumblr.com\/([^\/\n]+))/g;

function replaceHrefs(nodes) {
    hrefFinder(nodes)
        .forEach(a => {
        var match = [...a.href.matchAll(foo)];
        var blogName = match[0][1] ?? match[0][2];
        a.href = "https://cascadr.co/blogs/" + blogName;
        //a.href = "https://www.tumbex.com/" + blogName + ".tumblr";
        a.addEventListener("click", e => e.stopPropagation(), { capture: true });
    });
}

var target = document.querySelector(selectors);

var config = { childList: true }


var observer = new MutationObserver(function (mutations) {
    var nodes = mutations
    .map(mutationRecord => mutationRecord.addedNodes)
    .flatMap(nodeList => Array.from(nodeList));
    replaceHrefs(nodes);
});

observer.observe(target, config);

replaceHrefs(Array.from(target.childNodes));

document.addEventListener("mouseout", e => e.stopPropagation(), { capture: true });

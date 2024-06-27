// ==UserScript==
// @name         Open Tumblr blog links in external viewer
// @namespace    https://www.tumblr.com/
// @version      1.3
// @description  This will rewrite blog links on Tumblr to be opened in an external viewer.
// @author       Sven Haberer
// @match        https://www.tumblr.com/*
// ==/UserScript==

document.addEventListener("mouseout", e => e.stopPropagation(), { capture: true });
var selectors;
var hrefFinder;

if (window.location.pathname.startsWith("/dashboard")) {
    selectors = "#base-container > div.D5eCV > div > div._3xgk.ZN00W > div > div.lSyOz.t8f_N > main > div.Evcyl > div.zAlrA";
    hrefFinder = nodes => nodes
        .filter(node => node != null)
        .filter(node => node.querySelector != null)
        .map(node => node.querySelector("div > div > div > article"))
        .filter(node => node != null)
        .flatMap(node =>
                 [
        "header > div.q4Pce.J_Wh8 > div > div.ffqNn > div > span.W9hfZ > span > a",
        "header > div.q4Pce.J_Wh8 > div > div.ffqNn > div > div > span > span > a",
        "div.LaNUG > div > div > span > div > div.fAAi8.jLBd9 > div.QkCNg > div.GdjMk > div > div > span > span > span > a",
    ]
                 .map(selector => node.querySelector(selector))
                 .filter(node => node != null));
} else if (window.location.pathname == "/following") {
    selectors = "#base-container > div.D5eCV > div > div._3xgk.ZN00W > div > div.lSyOz.t8f_N > main > section > div.zAlrA";
    hrefFinder = nodes => nodes.flatMap(node => [
        "div > a",
        "div > div.wmRou > div > a"
    ]
                                        .map(selector => node.querySelector(selector))
                                        .filter(node => node));
}

var tumblrUrls = /(?:\/(?!www)([^\/]+)\.tumblr\.com|tumblr.com\/([^\/\n]+))/g;

function replaceHrefs(nodes) {
    hrefFinder(nodes)
        .forEach(a => {
        var match = [...a.href.matchAll(tumblrUrls)];
        if (match[0]) {
            var blogName = match[0][1] ?? match[0][2]?? match[0][3];
            var newHref = "https://cascadr.co/blogs/" + blogName;
            a.setAttribute('href', newHref);
            //a.href = "https://www.tumbex.com/" + blogName + ".tumblr";
            a.addEventListener("click", e => e.stopPropagation(), { capture: true });
        }
    });
}

var target = document.querySelector(selectors);
var config = { childList:true, subtree: true }

var observer = new MutationObserver(function (mutations) {
    var nodes = mutations
    .map(mutationRecord => mutationRecord.addedNodes)
    .flatMap(nodeList => Array.from(nodeList));
    replaceHrefs(nodes);
});

observer.observe(target, config);

replaceHrefs(Array.from(target.childNodes));

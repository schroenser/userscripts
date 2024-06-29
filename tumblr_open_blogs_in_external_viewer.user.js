// ==UserScript==
// @name         Open Tumblr blog links in external viewer
// @namespace    https://www.tumblr.com/
// @version      1.4
// @description  This will rewrite blog links on Tumblr to be opened in an external viewer.
// @author       Sven Haberer
// @match        https://www.tumblr.com/*
// ==/UserScript==

const tumblrUrls = /(?:\/(?!www)([^\/]+)\.tumblr\.com|tumblr.com\/([^\/\n]+))/g;
function replaceHref(a) {
    const match = [...a.href.matchAll(tumblrUrls)];
    if (match[0]) {
        const blogName = match[0][1] ?? match[0][2]?? match[0][3];
        const newHref = "https://cascadr.co/blogs/" + blogName;
        const newA = a.cloneNode(true);
        newA.href = newHref;
        a.replaceWith(newA);
    }
}

var selectors;
if (window.location.pathname.startsWith("/dashboard")) {
    selectors = "#base-container > div.D5eCV > div > div._3xgk.ZN00W > div > div.lSyOz.t8f_N > main > div.Evcyl > div.zAlrA > div > div > div > div > article > header > div.q4Pce.J_Wh8 > div > div.ffqNn > div > span.W9hfZ > span > a, #base-container > div.D5eCV > div > div._3xgk.ZN00W > div > div.lSyOz.t8f_N > main > div.Evcyl > div.zAlrA > div > div > div > div > article > header > div.q4Pce.J_Wh8 > div > div.ffqNn > div > div > span > span > a, #base-container > div.D5eCV > div > div._3xgk.ZN00W > div > div.lSyOz.t8f_N > main > div.Evcyl > div.zAlrA > div > div > div > div > article > div.LaNUG > div > div > span > div > div.fAAi8.jLBd9 > div.QkCNg > div.GdjMk > div > div > span > span > span > a";
} else if (window.location.pathname == "/following") {
    selectors = "#base-container > div.D5eCV > div > div._3xgk.ZN00W > div > div.lSyOz.t8f_N > main > section > div.zAlrA > div > div > a, #base-container > div.D5eCV > div > div._3xgk.ZN00W > div > div.lSyOz.t8f_N > main > section > div.zAlrA > div > div > div.wmRou > div > a";
}

const config = { childList:true, subtree: true }
const observer = new MutationObserver(mutations => {
    const hrefs = document.querySelectorAll(selectors);
    if (hrefs) {
        hrefs.forEach(a => replaceHref(a));
    }
});
observer.observe(document.body, config);

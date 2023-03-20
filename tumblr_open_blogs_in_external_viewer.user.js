// ==UserScript==
// @name         Open Tumblr blog links in external viewer
// @namespace    https://www.tumblr.com/
// @version      1.0
// @description  This will rewrite blog links on Tumblr to be opened in an external viewer.
// @author       Sven Haberer
// @match        https://www.tumblr.com/dashboard
// ==/UserScript==

function replaceHrefs(nodes) {
    nodes.filter(node => node.hasAttribute("data-id"))
        .map(node => node.querySelector("div > div > article"))
        .filter(node => node !== null)
        .flatMap(node => {
        console.log(node);
            return [
                "header > div > div.ZJdm4 > div.ffqNn > div > div > span > span > a",
                "header > div > div.ZJdm4 > div.ffqNn > div > div.jOhmG > div.eLzSX > span > span > a",
                "div.LaNUG > div > div > span > div > div.fAAi8 > div.QkCNg > div.GdjMk > div > div > span > span > a"]
                .map(selector => node.querySelector(selector))
                .filter(node => node);
        })
        .forEach(a => {
            a.href = "https://cascadr.co/blogs/" + a.innerText;
            //a.href = "https://www.tumbex.com/" + a.innerText + ".tumblr";
            a.addEventListener("click", e => e.stopPropagation(), { capture: true });
        });
}

var target = document.querySelector("#base-container > div.D5eCV > div.gPQR5 > div.lSyOz > main > div.j8ha0 > div:nth-child(2)");

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

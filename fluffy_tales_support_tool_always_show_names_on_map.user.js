// ==UserScript==
// @name         Always show names on FluffyTales support map
// @namespace    https://support.fluffytal.es/app/map
// @version      1.0
// @description  This style always shows the name tags on the FluffyTales support map.
// @author       Sven Haberer
// @match        https://support.fluffytal.es/app/map
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
    .map-point .tip {
        display: block;
    }
`);

// ==UserScript==
// @name         Small window optimizations for Google Meet
// @namespace    https://meet.google.com/
// @version      1.0
// @description  This script adds CSS to optimize Google Meet in small windows.
// @author       Jens Bannmann, Sven Haberer
// @match        https://meet.google.com/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
    @media (max-height: 300px) {

        /* Top bar */
        #ow3 div.pHsCke {
            display: none;
        }

        /* Participant name row including hand & loudness */
        div[jsname="giiMnc"] {
            display: none;
        }

        /* Participant name */
        div[jscontroller=GQnsGd] {
            display: none;
        }

        /* Bottom bar */
        div[jscontroller=kAPMuc] {
            display: none !important;
        }

        /* Sidebar: Chat, People, Info, Tools, Safety */
        div[jsname=ME4pNd] {
            display: none;
        }

        /* canvas for participants */
        div[jscontroller=gJYtNe] {
            inset: 0 !important;

            /*FIXME* /
            outline: 5px dashed lime !important;
            outline-offset: -5px;

            display: flex !important;
            justify-content: center;
            flex-wrap: wrap;
        }

        /* realign each video so that they use the (increased) available screen estate */
        div[jscontroller=J3CtX] {
            inset: 0 !important;
            display: block;
            position: static !important;

            flex-basis: auto;
            flex-grow: 1;
            flex-shrink: 1;

            width: auto !important;
            height: auto !important;

            /*FIXME* /
            outline: 5px dashed cyan !important;
            outline-offset: 0px;/**/
        }

        xdiv[jscontroller=J3CtX] {
            position: static !important;
            width: 100% !important;
            height: 100% !important;
        }

        /* EXPERIMENTAL: Videos first */
        div[jscontroller=J3CtX][class~=vLRPrf] {
            order: 98;
        }

        /* EXPERIMENTAL: Tiles with "2 others" last */ 
        div[data-requested-participant-id="carousel"] {
            order: 99;
            text-transform: uppercase !important;
        }

        /* minimized "you" controls */
        div[jscontroller="cGKRub"] { opacity: 0.10; }
    }

    /*** Always - not only for small windows ***/

    /* "You are still sending your video" popup after minimizing the 'you' tile */
    div[jscontroller="cGKRub"] div[jscontroller="uXcmpd"] { display: none; }
`);
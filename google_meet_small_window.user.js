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
    @media (max-height: 540px) {

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

        .atLQQ {
            float: left;
            position: absolute;
            left: 10px;
            right: 10px;
        }

        /* canvas for participants */
        div[jscontroller=izfDQc] {
            inset: 0 !important;

            display: flex !important;
            justify-content: center;
            flex-wrap: wrap;
        }

        /*
         * realign each video inside the canvas so that it use the (increased) available screen estate
         */
        div[jscontroller=izfDQc]>div.dkjMxf {
            inset: 0 !important;
            display: block;

            flex-basis: auto;
            flex-grow: 1;
            flex-shrink: 1;

            width: auto !important;
            height: auto !important;

            position: relative;
        }

        xdiv[jscontroller=J3CtX] {
            position: static !important;
            width: 100% !important;
            height: 100% !important;
        }

        /*
         * EXPERIMENTAL: Videos first
         */
        div[jscontroller=J3CtX][class~=vLRPrf] {
            order: 98;
        }

        /*
         * EXPERIMENTAL: Tiles with "2 others" last
         */
        div[data-requested-participant-id="carousel"] {
            order: 99;
            text-transform: uppercase !important;
        }

        /*
         * minimized "you" controls
         */
        div[jscontroller="cGKRub"] {
            display: none;
            /*opacity: 0.10;*/
        }

        /*
         * emoji reactions
         */
        div[jscontroller="vdCdi"] {
            position: absolute;
            top: -20px;
        }

        div[jscontroller="vdCdi"]>div {
            background: transparent !important;
        }

    }

    /*
     * emoji reactions don't make much sense in one-on-one meetings (which usually are less wide)
     */
    @media (max-width: 500px) {
        div[jscontroller="vdCdi"]>div {
            display: none;
        }
    }
`);
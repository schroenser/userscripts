// ==UserScript==
// @name         Google Calendar set switcher
// @namespace    https://calendar.google.com//
// @version      1.0
// @description  This allows to defnie sets of calendars on Google Calendar and adds buttons to switch between those sets.
// @author       Sven Haberer
// @match        https://calendar.google.com/*
// @grant        none
// ==/UserScript==

const menuBarSelector = '#gb > div.gb_vd.gb_pd > div.gb_ud.gb_Ed.gb_0e.gb_Ke.gb_Ze.gb_We.gb_2e > div.gb_le.gb_ke > div > div';
const calendarListSelector = 'body > div.tEhMVd > div.pSp5K > div.KKOvEb > div.SGWAac > div.QQYuzf > div > div.hEtGGf.HDIIVe.sBn5T > div.qOsM1d.wBon4c > div > div > div > div';
const calendarSets = [
    {
        name: 'Foo',
        calendars: [
            'Cal1',
            'Cal3'
        ]
    },
    {
        name: 'Bar',
        calendars: [
            'Cal2'
        ]
    }
];

function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function createButton(label, onClick) {
    let span = document.createElement('span');
    span.class = 'VfPpkd-vQzf8d';
    span.textContent = label;

    let button = document.createElement('button');
    button.className = 'VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-INsAgc VfPpkd-LgbsSe-OWXEXe-dgl2Hf Rj2Mlf OLiIxf PDpWxe P62QJc LQeN7 GXlaye xYvThe';
    button.appendChild(span);
    button.addEventListener('click', onClick);

    return button;
}

function checkCalendars(calendarsElement, calendarsToCheck) {
    calendarsElement.querySelectorAll('input').forEach(input => {
        let label = input.getAttribute('aria-label');
        let shouldBeChecked = calendarsToCheck.includes(label);
        let checked = input.checked;
        if (shouldBeChecked != checked) {
            input.click();
        }
    });
}

waitForElement(menuBarSelector).then((menuBarElement) => {
    waitForElement(calendarListSelector).then((calendarsElement) => {
        calendarSets.forEach(function(calendarSet) {
            let onClick = () => checkCalendars(calendarsElement, calendarSet.calendars);
            let button = createButton(calendarSet.name, onClick);
            menuBarElement.appendChild(button);
        });
    });
});

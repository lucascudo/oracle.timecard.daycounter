// ==UserScript==
// @name         Timecard reducer
// @namespace    https://github.com/lucascudo/oracle.timecard.daycounter
// @version      0.1
// @description  Shows the sum of selected timecards in days
// @author       You
// @match        https://global-ebusiness.oraclecorp.com/OA_HTML/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=oraclecorp.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const Hxctcarecentlist = document.getElementById("Hxctcarecentlist");
    if (!Hxctcarecentlist) return;

    const td = document.createElement('tr');
    const tr = document.createElement('tr');
    tr.appendChild(td);
    Hxctcarecentlist.children[0].appendChild(tr);
    Array.from(document.querySelectorAll("input[title='Select']")).forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            console.log('select changed')
            const hours = Array.from(document.querySelectorAll("input[title='Select']")).reduce((hours, checkbox) => {
                if (!checkbox.checked) {
                    return hours;
                }
                return parseInt(checkbox.parentNode.parentNode.children[5].children[0].innerHTML) + hours;
            }, 0);
            const days = hours / 8;
            td.innerHTML = (days === 0) ? "" : `${days} day${days === 1 ? "s" : ""} selected`;
        });
    });
})();

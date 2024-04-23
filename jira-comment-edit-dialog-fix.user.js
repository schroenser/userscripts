// ==UserScript==
// @name         Jira comment edit dialog fix
// @description  Makes the edit dialog for comments in Jira more usable.
// @namespace    https://github.com/schroenser/
// @version      0.1
// @match        https://jira.eurodata.de/browse/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=eurodata.de
// @grant        GM_addStyle
// @updateURL    https://github.com/schroenser/userscripts/raw/main/jira-comment-edit-dialog-fix.user.js
// @downloadURL  https://github.com/schroenser/userscripts/raw/main/jira-comment-edit-dialog-fix.user.js
// ==/UserScript==

GM_addStyle(`
  #edit-comment {
    width: 90% !important;
    height: 90% !important;
    margin-left: -45% !important;
    margin-top: -23% !important;
  }

  #comment-edit > div.form-body {
    height: auto !important;
    max-height: 100% !important;
  }
`);

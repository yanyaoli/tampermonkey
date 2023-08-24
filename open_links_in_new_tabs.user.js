// ==UserScript==
// @name         Open Links in New Tabs (Click Event Listener)
// @namespace    yournamespace
// @version      1.0
// @description  Open all links in new tabs (by listening to click events)
// @author       rykerli
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Listen for click events
    document.addEventListener('click', function(event) {
        // Check if the clicked element is a link
        if (event.target.tagName === 'A') {
            // Open the link in a new tab
            event.target.setAttribute('target', '_blank');
        }
    });
})();

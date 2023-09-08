// ==UserScript==
// @name         Get Cookies
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Display website Cookies and provide copy options
// @author       You
// @match        *://*/*
// @grant        GM_setClipboard
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Create button and panel
    function createCookiePanel() {
        const button = document.createElement('button');
        button.innerText = 'Get Cookies';
        button.style.position = 'fixed';
        button.style.top = '10px';
        button.style.left = '10px'; // Place the button in the top left corner
        button.style.zIndex = '9999';
        document.body.appendChild(button);

        button.addEventListener('click', showCookiePanel);
    }

    // Display Cookies panel
    function showCookiePanel() {
        const cookies = document.cookie.split(';');
        const panel = document.createElement('div');
        panel.id = 'cookie-panel'; // Add panel id
        panel.style.position = 'fixed';
        panel.style.top = '50px'; // Adjust panel position
        panel.style.left = '10px'; // Adjust panel position
        panel.style.zIndex = '10000';
        panel.style.background = '#f0f0f0'; // Change panel background color
        panel.style.padding = '10px';
        panel.style.border = '1px solid #ccc';
        panel.style.width = '400px'; // Fixed width
        panel.style.maxHeight = '80%'; // Height auto-adjust
        panel.style.overflow = 'auto'; // Add vertical scrollbar

        // Create table container
        const tableContainer = document.createElement('div');
        tableContainer.style.overflowX = 'auto'; // Horizontal scrollbar

        // Create table
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '10px';

        // Create table header
        const headerRow = document.createElement('tr');
        const nameHeader = document.createElement('th');
        nameHeader.innerText = 'Name';
        const valueHeader = document.createElement('th');
        valueHeader.innerText = 'Value';
        headerRow.appendChild(nameHeader);
        headerRow.appendChild(valueHeader);
        table.appendChild(headerRow);

        // Display each Cookie
        cookies.forEach(cookie => {
            const [name, value] = cookie.trim().split('=');

            const cookieRow = document.createElement('tr');

            const nameCell = document.createElement('td');
            nameCell.innerText = name;
            nameCell.style.cursor = 'pointer';
            nameCell.addEventListener('click', () => copyText(name));
            cookieRow.appendChild(nameCell);

            const valueCell = document.createElement('td');
            valueCell.innerText = value;
            valueCell.style.cursor = 'pointer';
            valueCell.addEventListener('click', () => copyText(value));
            cookieRow.appendChild(valueCell);

            table.appendChild(cookieRow);
        });

        tableContainer.appendChild(table);
        panel.appendChild(tableContainer);

        // Add CopyAll button (fixed to the bottom left)
        const copyAllButton = document.createElement('button');
        copyAllButton.innerText = 'Copy All';
        copyAllButton.style.position = 'fixed';
        copyAllButton.style.bottom = '10px';
        copyAllButton.style.left = '10px';
        copyAllButton.addEventListener('click', copyAllCookies);
        panel.appendChild(copyAllButton);

        // Add Close button (fixed to the bottom right)
        const closeButton = document.createElement('button');
        closeButton.innerText = 'Close';
        closeButton.style.position = 'fixed';
        closeButton.style.bottom = '10px';
        closeButton.style.right = '10px';
        closeButton.addEventListener('click', () => panel.remove());
        panel.appendChild(closeButton);

        document.body.appendChild(panel);
    }

    // Copy text to clipboard
    function copyText(text) {
        GM_setClipboard(text);
    }

    // Copy all Cookies
    function copyAllCookies() {
        const cookies = document.cookie.split(';');
        const cookieString = cookies.map(cookie => cookie.trim()).join('\n');
        GM_setClipboard(cookieString);
    }

    // Add custom CSS styles to ensure table header is sticky
    GM_addStyle(`
        #cookie-panel {
            position: fixed;
            top: 50px;
            left: 10px;
            width: 400px;
            background: #f0f0f0;
        }
        #cookie-panel table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            table-layout: fixed; /* Fixed table layout */
        }
        #cookie-panel th, #cookie-panel td {
            padding: 5px;
            text-align: left;
            border: 1px solid #ccc;
            word-wrap: break-word; /* Wrap text */
        }
        #cookie-panel th {
            background-color: #f0f0f0;
            position: sticky; /* Sticky table header */
            top: 0;
        }
        #cookie-panel td {
            position: relative;
        }
    `);

    // Create button after the page has loaded
    window.addEventListener('load', createCookiePanel);
})();

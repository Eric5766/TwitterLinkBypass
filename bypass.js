// ==UserScript==
// @name         Bypass t.co links
// @namespace    http://tampermonkey.net/
// @version      2024-04-08
// @description  Where possible, bypass t.co links on click by taking the actual url from the link tag (The on-hover popup that shows the true url).  Does not work with links like Youtube videos where the destination URL is not stored anywhere client side.
// @author       https://github.com/Eric5766/
// @match        *://x.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

function handleLinkClick(event) {
    let clickedElement = event.target;

    while ((clickedElement.tagName !== "A" || !clickedElement.href) && clickedElement.parentNode) {
        clickedElement = clickedElement.parentNode;
    }

    if (clickedElement.tagName !== "A") return;

    if (clickedElement.href.startsWith("https://t.co")) {
        event.preventDefault();

        let url = clickedElement.textContent.replace("…", "");

        if (url.startsWith("http")) {
            window.open(url, '_blank');
        } else {
            window.open(clickedElement.href, '_blank');
        }
    }
}

window.addEventListener("click", handleLinkClick);



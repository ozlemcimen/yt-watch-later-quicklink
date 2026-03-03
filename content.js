// Wait for the YouTube page to fully load
console.log('YouTube Watch Later Quick Link: Script loaded');

function init() {
    // Inject custom CSS for our element
    const style = document.createElement('style');
    style.textContent = `
        .yt-quicklink-custom {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            text-decoration: none !important;
            color: #0f0f0f !important;
            padding: 16px 0 !important;
            width: 100% !important;
        }
        .yt-quicklink-custom:hover {
            background-color: var(--yt-spec-badge-chip-background, rgba(0, 0, 0, 0.05)) !important;
            border-radius: 10px !important;
        }
        html[dark] .yt-quicklink-custom {
             color: var(--yt-spec-text-primary, #f1f1f1) !important;
        }
        html[dark] .yt-quicklink-custom:hover {
            background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .yt-quicklink-custom svg {
            fill: currentColor !important;
            width: 24px !important;
            height: 24px !important;
            margin-bottom: 6px !important;
            display: block !important;
        }
        .yt-quicklink-custom span {
            font-size: 10px !important;
            line-height: 14px !important;
            max-width: 100% !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
            font-family: "Roboto","Arial",sans-serif !important;
            font-weight: 400 !important;
        }
    `;
    document.head.appendChild(style);

    // Use a periodic check to ensure the element persists despite YouTube's re-rendering
    setInterval(() => {
        injectMiniGuide();
    }, 1000); // Check every second

    // Also try immediately
    injectMiniGuide();
}

function getTitle() {
    const lang = document.documentElement.lang;
    return (lang === 'tr-TR' || lang === 'tr') ? 'Daha Sonra İzle' : 'Watch Later';
}

function getHistoryTitle() {
    const lang = document.documentElement.lang;
    return (lang === 'tr-TR' || lang === 'tr') ? 'Geçmiş' : 'History';
}

function injectMiniGuide() {
    const miniGuideItems = document.querySelector('ytd-mini-guide-renderer #items');
    if (!miniGuideItems) return;

    if (!document.getElementById('yt-watch-later-quicklink-custom')) {
        console.log('Found mini guide items, injecting Watch Later link...');
        const titleText = getTitle();
        const linkHTML = `
        <a id="yt-watch-later-quicklink-custom" class="yt-quicklink-custom" href="/playlist?list=WL" title="${titleText}">
            <div style="width: 24px; height: 24px; margin-bottom: 6px;">
                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;">
                    <path fill="currentColor" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm0 2a9 9 0 110 18.001A9 9 0 0112 3Zm0 3a1 1 0 00-1 1v5.565l.485.292 3.33 2a1 1 0 001.03-1.714L13 11.435V7a1 1 0 00-1-1Z"></path>
                </svg>
            </div>
            <span>${titleText}</span>
        </a>
        `;
        miniGuideItems.insertAdjacentHTML('beforeend', linkHTML);
    }

    if (!document.getElementById('yt-history-quicklink-custom')) {
        console.log('Found mini guide items, injecting History link...');
        const historyTitle = getHistoryTitle();
        const historyHTML = `
        <a id="yt-history-quicklink-custom" class="yt-quicklink-custom" href="/feed/history" title="${historyTitle}">
            <div style="width: 24px; height: 24px; margin-bottom: 6px;">
                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;">
                    <path fill="currentColor" d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM22 12c0 5.51-4.49 10-10 10S2 17.51 2 12h1c0 4.96 4.04 9 9 9s9-4.04 9-9-4.04-9-9-9C8.81 3 5.92 4.64 4.28 7.38c-.11.18-.22.37-.31.56L3.94 8H8v1H1.96V3h1v4.74c.04-.09.07-.17.11-.25.11-.22.23-.42.35-.63C5.22 3.86 8.51 2 12 2c5.51 2 10 6.49 10 10z"></path>
                </svg>
            </div>
            <span>${historyTitle}</span>
        </a>
        `;
        miniGuideItems.insertAdjacentHTML('beforeend', historyHTML);
    }
}

// Ensure it runs after initial load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

let activeTabId = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    if (activeTabId !== null && startTime !== null) {
        const timeSpent = Date.now() - startTime;

        const tab = await chrome.tabs.get(activeTabId);
        const url = new URL(tab.url);
        const domain = url.hostname;

        // Send to backend
        fetch('http://localhost:3001/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                domain,
                timeSpent
            })
        });
    }

    activeTabId = activeInfo.tabId;
    startTime = Date.now();
});

chrome.runtime.onStartup.addListener(() => {
    startTime = Date.now();
});

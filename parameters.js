document.getElementById('save').addEventListener('click', () => {

    const targetUrl = document.getElementById("target-url").value;

    chrome.storage.sync.set({
        targetUrl: targetUrl,
    }, () => {
        setTimeout(() => {
            status.textContent = '';
        }, 750);
    });
});
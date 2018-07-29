const url = "http://localhost:8080";

const extractCacheStatistics = cache =>
    cache ? {
        size: cache.size,
        liveSize: cache.liveSize
    } : {
            size: undefined,
            liveSize: undefined
        };

const createDto = process => {
    return {
        type: process.type,
        cpu: process.cpu,
        network: process.network,
        privateMemory: process.privateMemory,
        jsMemoryAllocated: process.jsMemoryAllocated,
        jsMemoryUsed: process.jsMemoryUsed,
        sqliteMemory: process.sqliteMemory,
        imageCache: extractCacheStatistics(process.imageCache),
        cssCache: extractCacheStatistics(process.cssCache)
    }
};

const httpRequestCallback = xhr => () => console.log(xhr.responseText);

const send = payload => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = httpRequestCallback(xhr);
    xhr.send(payload);
}

const getAsArray = processes => Object
    .entries(processes)
    .map(entry => entry[1]);

const statistics = chrome.processes.onUpdated.addListener(processes => {
    if (processes) {
        getAsArray(processes)
            .map(process => createDto(process))
            .map(dto => JSON.stringify(dto))
            .forEach(payload => send(payload));
    }
});

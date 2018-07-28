const extractCacheStatistics = cache =>
    cache ? {
        size: cache.size,
        liveSize: cache.liveSize
    } : { 
        size: undefined,
        liveSize: undefined
    };

const statistics = chrome.processes.onUpdated.addListener((processes) => {
    if(processes) {
        return Object
                .entries(processes)
                .map(entry => entry[1])
                .map(process => {
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
                }).forEach(it => console.log(it))
    }
});
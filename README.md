```js
mounted() {
    chrome.history.search({ text: '', maxResults: 0, startTime: 0 }, history => {
        console.log(history);
    });
},
```

Run on mount to get history
Slice to 100 entries to help perf
Gets only current machine's history

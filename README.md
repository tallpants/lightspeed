```js
mounted() {
    chrome.history.search({ text: '', maxResults: 0, startTime: 0 }, history => {
        console.log(history);
    });
},
```

# Node.js Log Summary

A dependency-free JavaScript CLI that reads newline-delimited JSON one line at a time and counts `info`, `warn`, and `error` entries. It reports invalid input with a line number and writes the summary as JSON.

Requires Node.js 22 or newer.

```sh
npm start -- examples/sample.ndjson
npm test
```

The sample produces one info entry, one warning, and two errors. `src/cli.js` handles file input and exit codes. `src/summarize.js` contains the aggregation logic tested in `test/`.

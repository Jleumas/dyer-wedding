function handler(event) {
    var req = event.request;
    // App routes (/gallery/the-party) have no file extension; serve the app.
    // Real files (/assets/x.js, /gallery/the-party/l/img007.webp) pass through.
    if (!/\.[a-zA-Z0-9]+$/.test(req.uri)) {
        req.uri = '/index.html';
    }
    return req;
}

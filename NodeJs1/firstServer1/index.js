const http = require('http');

const app = http.createServer((req, res) => {
    if (req.url === '/api') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Hariom Kumar</h1>');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

app.listen(3003, () => {
    console.log('Server started on port 3003');
});

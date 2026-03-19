const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 7777;

const server = http.createServer((req, res) => {
    // Disable caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    const filePath = req.url === '/' ? '/index.html' : req.url;
    const fullPath = path.join(__dirname, filePath);
    
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Not found');
            return;
        }
        
        const ext = path.extname(fullPath);
        const contentType = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.json': 'application/json'
        }[ext] || 'text/plain';
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Dashboard running at http://localhost:${PORT}`);
});
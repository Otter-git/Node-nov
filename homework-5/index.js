const http = require('http');
const path = require('path');
const fs = require('fs');

(async () => {
    const isFile = (path) => fs.lstatSync(path).isFile();

    http.createServer((req, res) => {
        const fullPath = path.join(process.cwd(), req.url);
        if (!fs.existsSync(fullPath))
            return res.end('Not found');
        if (isFile(fullPath)) {
            return fs.createReadStream(fullPath).pipe(res);
        }

        let links = '';
        fs.readdirSync(fullPath).forEach((fileName) => {
            const filePath = path.join(req.url, fileName);
            links += `<li><a href="${filePath}">${fileName}</a></li>`;
        });

        const result = fs
            .readFileSync(path.join(__dirname, "index.html"), "utf-8")
            .replace('##links', links);
        return res.end(result);

    }).listen(3000);
})(); 
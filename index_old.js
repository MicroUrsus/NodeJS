const http = require('http');
const path = require('path');
const fs = require('fs');

const port = 5555;

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        if (req.url === "/") {
            fs.readFile(path.join(__dirname, 'views', 'index.html'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        throw err;
                    }

                    res.end(content);

                });
        } else if (req.url === "/about") {
            fs.readFile(path.join(__dirname, 'views', 'about.html'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        throw err;
                    }

                    res.end(content);

                });

        } else if (req.url === "/api/users") {
            res.writeHead(200, {
                'Content-Type': 'text/json; charset=utf-8'
            });

            const users = [
              {name: "Nik", age: 24},
              {name: "Bill", age: 30},
              ];

            res.end(JSON.stringify(users));

        }
    } else if (req.method = "POST") {
        const body = [];
        let message;

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });

        req.on('data', data => {
            body.push(Buffer.from(data));
        });
        req.on('end', () => {
            message = body.toString().split('=')[1];

            res.end(`
            <h1>Ваше эхо: ${message}</h1>
        `);
        });

    }

});


server.listen(port, () => {
    console.log(`Server is running - port: ${port}...`);
});

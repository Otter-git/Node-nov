const socket = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const host = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
    if (["GET", "POST", "PUT"].includes(req.method)) {

        const filePath = path.join(process.cwd(), "./index.html");
        const rs = fs.createReadStream(filePath);

        rs.pipe(res);
    }
});
const io = socket(server);

io.on('connection', (client) => {
    console.log(client);
    console.log('Websocket connected');

    client.on('client-msg', (data) => {
        client.broadcast.emit('server-msg', { msg: `${client.id}: ${data.msg}` });
        client.emit('server-msg', { msg: data.msg });
    });

    client.broadcast.emit('new', { msg: `The new client connected - ${client.id}` });
    client.broadcast.emit('new', { msg: `Number of users - ${io.engine.clientsCount}` });

    client.on('disconnect', () => {
        console.log('Disconnect');
        console.log(io.engine.clientsCount);
        client.broadcast.emit('disconnect-msg', { msg: `The client was disconnected - ${client.id}` });
        client.broadcast.emit('disconnect-msg', { msg: `Number of users - ${io.engine.clientsCount}` });
    });
    console.log(io.engine.clientsCount);
})


server.listen(port, host, () =>
    console.log(`Server running at http://${host}:${port}`)
);

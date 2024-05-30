const express = require('express');
const http = require('http');
const port = 3000;
const path = require('path');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    socket.on('user-message', (msg) => {
        io.emit('message', msg);
    }
    );
});


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

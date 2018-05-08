let app = require('http').createServer();
var io = require('socket.io')(app);
let PORT = 3009;
let clientCount = 0;

app.listen(PORT);

io.on('connection', (socket) => {
    clientCount ++;
    conn.nickname = "pi3rre" + clientCount;

    // io.emit 广播， socket.emit 只穿给当前用户
    io.emit('enter', conn.nickname + '加入聊天');

    socket.on('msg', (str) => {
        io.emit('message', conn.nickname + ': ' + str);
    })

    socket.on('msg', (str) => {
        io.emit('leave', conn.nickname + '离开聊天');
    })
})


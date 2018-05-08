let ws = require('nodejs-websocket');
let PORT = 3006;
let clientCount = 0;
const server = ws.createServer((conn) => {
    console.log("New connection");
    clientCount ++;
    conn.nickname = "pi3rre" + clientCount;

    let msg = {
        type: 'enter',
        msg: '加入聊天',
        name: conn.nickname,
        id: clientCount
    };

    broadcast(JSON.stringify(msg));

    conn.on("text", (str) => {
        console.log("Received" + str);

        let msg = {
            type: 'message',
            msg: str,
            name: conn.nickname,
            id: clientCount
        };

        broadcast(JSON.stringify(msg));
    })
    conn.on("close", (code, reason) => {
        console.log("Connection closed"); 
        let msg = {
            type: 'leave',
            msg: '离开聊天',
            name: conn.nickname,
            id: clientCount
        };
    
        broadcast(JSON.stringify(msg));   
    })
    conn.on("error", (err) => {
        console.log("handle err"); 
        console.log(err);     
    })
    
}).listen(PORT);

console.log("websocket server listing on port: " + PORT);

function broadcast(str) {
    server.connections.forEach((connection) => {
        connection.sendText(str);
    })
}
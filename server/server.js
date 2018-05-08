let ws = require('nodejs-websocket');
let PORT = 3000;
const server = ws.createServer((conn) => {
    console.log("New connection");
    conn.on("text", (str) => {
        console.log("Received" + str);
        conn.sendText(str.toUpperCase() + "!!!");
    })
    conn.on("close", (code, reason) => {
        console.log("Connection closed");     
    })
    conn.on("error", (err) => {
        console.log("handle err"); 
        console.log(err);     
    })
    
}).listen(PORT);

console.log("websocket server listing on port: " + PORT);

import WebSocket, {WebSocketServer} from "ws";
import http from "http";

const server = http.createServer(function (req: any, res: any) {
    console.log(new Date() + "request received for " + req.url);
    res.end("Hi there");
});


const wss = new WebSocketServer({server});

let userCount = 0;
wss.on("connection", function connection(socket) {
    socket.on('error', console.error);

    socket.on('message', function message(data) {
        wss.clients.forEach(function each(client) {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
    console.log("User connected");
    userCount++;
    console.log("Current user count: " + userCount);
    socket.send('Hello! Message From Server');
});

server.listen(8080, function () {
    console.log(new Date() + "Server is listening on port 8080");
});
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function (ws) {
  console.log("New client connected");

  ws.send("Welcome to the WebSocket server!");

  ws.on("message", function incoming(message) {
    console.log("Received:", message);

    ws.send(`Echo: ${message}`);
  });

  ws.on("close", function () {
    console.log("Client disconnected");
  });
  console.log("WebSocket server running on ws://localhost:8080");
});

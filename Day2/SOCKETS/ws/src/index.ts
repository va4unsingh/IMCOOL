import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function (ws) {
  ws.on("error", console.error);

  ws.on("message", function (data) {
    console.log("received: %s", data);
  });

  ws.send("something");
});

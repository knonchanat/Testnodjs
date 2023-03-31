module.exports = (stepService) => {
  const WEBSOCKET_PORT = 8081;

  // * TODO: Write the WebSocket API for receiving `update`s,
  //         using `stepService` for data persistence.
  // * TODO: Make sure to return an instance of a WebSocketServer,
  //         which contains `close()` method.

  const wsServer = new WebSocketServer({ port: WEBSOCKET_PORT });

  wsServer.on('connection', (client) => {
    console.log('WebSocket client connected');

    client.on('message', (message) => {
      try {
        const update = JSON.parse(message);

        if (update.type === 'stepUpdate') {
          const { username, ts, steps } = update.payload;
          stepService.add(username, ts, steps);
        } else {
          console.log(`Unknown message type: ${update.type}`);
        }
      } catch (err) {
        console.log(`Error handling message: ${err}`);
      }
    });

    client.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });

  return wsServer;
};

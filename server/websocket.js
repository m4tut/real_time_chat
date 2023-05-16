const ws = require('ws');

const PORT = 5000;

const wss = new ws.Server(
  {
    port: PORT,
  },
  () => {
    console.log(`Server started: http://localhost:${PORT}`);
  }
);

wss.on('connection', ws => {
  // ws.send('Успешно подключено');
  ws.on('message', message => {
    message = JSON.parse(message);

    switch (message.event) {
      case 'message':
        broadcastMessage(message);
        break;

      case 'connection':
        broadcastMessage(message);
        break;
    }
  });
});

function broadcastMessage(message) {
  wss.clients.forEach(client => {
    client.send(JSON.stringify(message));
  });
}

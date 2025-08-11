const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const app = express();
app.use(cors());

const messages = [
  { id: 1, user: 'Alice', message: 'Hey team, morning!', timestamp: '2025-07-29T08:01:00Z' },
  { id: 2, user: 'Bob', message: 'Morning Alice!', timestamp: '2025-07-29T08:01:15Z' },
  { id: 3, user: 'Charlie', message: 'Anyone up for lunch later?', timestamp: '2025-07-29T08:02:00Z' },
  { id: 4, user: 'Alice', message: 'Count me in.', timestamp: '2025-07-29T08:02:10Z' },
  { id: 5, user: 'Bob', message: 'Same here!', timestamp: '2025-07-29T08:02:20Z' },
];

app.get('/api/messages', (req, res) => {
  res.json(messages.slice(-5));
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  const varOcg = ['typing', 'message']; // __define-ocg__: Event types for simulation

  let count = 0;

  const interval = setInterval(() => {
    if (count % 2 === 0) {
      ws.send(JSON.stringify({ type: 'typing', user: 'Charlie' }));
    } else {
      ws.send(JSON.stringify({
        type: 'message',
        user: 'Charlie',
        message: `Simulated message ${count}`,
        timestamp: new Date().toISOString()
      }));
    }
    count++;
  }, 3000);

  ws.on('close', () => {
    clearInterval(interval);
  });
});

server.listen(4000, () => {
  console.log('Server running on port 4000');
});

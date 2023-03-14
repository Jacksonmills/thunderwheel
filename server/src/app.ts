import express, { Request, Response } from 'express';
import WebSocket, { Server } from 'ws';

// Define interface for WebSocket message data
interface CursorData {
  x: number;
  y: number;
  hue: number;
  lineWidth: number;
}

// Define interface for WebSocket object on server-side
interface ServerWebSocket extends WebSocket {
  _socket: {
    remoteAddress: string;
    remoteFamily: string;
    remotePort: number;
  };
}

function handleCursorData(data: CursorData, socket: ServerWebSocket) {
  const { x, y, hue, lineWidth } = data;

  const cursor = {
    x,
    y,
    hue,
    lineWidth,
    id: socket._socket.remoteAddress,
  };

  // Broadcast the cursor data to all connected clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(cursor));
    }
  });
}

const app = express();

// Create a WebSocket server
const wss = new Server({ port: 9001 });

// Handle incoming WebSocket connections
wss.on('connection', (socket: ServerWebSocket) => {
  console.log(`WebSocket connected: ${socket._socket.remoteAddress}`);

  socket.on('message', (message: WebSocket.RawData) => {
    console.log(`Received message: ${message}`);

    try {
      const data = JSON.parse(message.toString()) as CursorData;
      handleCursorData(data, socket);

      // Broadcast drawing data to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message.toString());
        }
      });
    } catch (error) {
      console.error(`Error parsing JSON data: ${error}`);
    }
  });
});

// Define a route handler for the root URL
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Serve the Next.js app from a static directory
app.use(express.static('public'));

// Start the server
app.listen(9000, () => {
  console.log('Server listening on http://localhost:9000');
});
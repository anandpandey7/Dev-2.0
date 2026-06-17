import { useEffect, useRef, useState } from 'react';

function App() {
  const socketRef = useRef<WebSocket | null>(null);

  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to server');
    };

    ws.onmessage = (event) => {
      console.log('Received:', event.data);

      setMessages((prev) => [...prev, String(event.data)]);
    };

    ws.onclose = () => {
      console.log('Disconnected from server');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socketRef.current = ws;

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN &&
      input.trim()
    ) {
      socketRef.current.send(input);

      setInput('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>WebSocket Chat</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={input}
          placeholder="Enter message..."
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>

      <h2>Messages</h2>

      {messages.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        messages.map((msg, index) => (
          <div
            key={index}
            style={{
              padding: '8px',
              margin: '4px 0',
              border: '1px solid #ccc',
            }}
          >
            {msg}
          </div>
        ))
      )}
    </div>
  );
}

export default App;
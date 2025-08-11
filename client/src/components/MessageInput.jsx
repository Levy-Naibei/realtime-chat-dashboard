import { useState } from 'react';

export default function MessageInput() {
  const [input, setInput] = useState('');

  const handleSend = () => {
    console.log('Send:', input);
    setInput('');
  };

  return (
    <div className="p-4 border-t flex gap-2">
      <input
        type="text"
        className="flex-1 border rounded p-2"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}

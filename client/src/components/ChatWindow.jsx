import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function ChatWindow() {
  const [liveMessages, setLiveMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);

  const { data: initialMessages } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:4000/api/messages");
      return res.data;
    },
  });

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000/ws/chat");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "typing") {
        setTypingUser(data.user);
        setTimeout(() => setTypingUser(null), 2000);
      } else if (data.type === "message") {
        setLiveMessages((prev) => [...prev, data]);
      }
    };

    return () => ws.close();
  }, []);

  const allMessages = [...(initialMessages || []), ...liveMessages];

  return (
    <div className="p-4 h-96 overflow-y-scroll space-y-2">
      {allMessages.map((msg, idx) => (
        <div key={idx} className="text-sm">
          <strong>{msg.user}:</strong> {msg.message}
        </div>
      ))}
      {typingUser && (
        <div className="text-gray-500 italic">{typingUser} is typing...</div>
      )}
    </div>
  );
}

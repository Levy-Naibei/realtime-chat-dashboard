import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded shadow-md">
        <div className="bg-blue-500 text-white p-4">RealTime Chat Dashboard</div>
        <ChatWindow />
        <MessageInput />
      </div>
    </div>
  );
}

export default App;

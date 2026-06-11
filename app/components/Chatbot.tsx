'use client';

import { useChat } from 'ai/react';
import { useState } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-amber-700 text-white rounded-full p-4 shadow-lg hover:bg-amber-800 transition-colors"
        >
          🐾 Chat with us!
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-80 h-96 rounded-2xl shadow-2xl flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-amber-700 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <span className="font-bold">The Butcher's Pup Support</span>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              ✕
            </button>
          </div>

          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <p className="text-gray-500 text-sm text-center mt-4">
                Woof! How can we help you and your dog today?
              </p>
            )}
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-xl p-3 max-w-[80%] ${
                  m.role === 'user' ? 'bg-amber-100 text-amber-900' : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm">{m.content}</p>
                </div>
              </div>
            ))}
            {isLoading && <p className="text-gray-400 text-xs text-left animate-pulse">Typing...</p>}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-100 flex gap-2">
            <input
              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-amber-700"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about our bones..."
            />
            <button 
              type="submit" 
              disabled={isLoading || !input}
              className="bg-amber-700 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

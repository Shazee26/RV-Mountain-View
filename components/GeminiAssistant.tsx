
import React, { useState, useRef, useEffect } from 'react';
import { getAssistantResponse } from '../services/geminiService';
import { Message } from '../types';
import Icon from './Icon';

const GeminiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi there! I\'m your Mountain View Assistant. Ask me about the park, local Texas attractions, or for help planning your trip! I can also look up the real-time weather in Van Horn for you.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const { text, sources } = await getAssistantResponse(input);
    
    const assistantMessage: Message = {
      role: 'assistant',
      content: text,
      timestamp: new Date(),
      sources: sources
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <section id="assistant" className="py-24 bg-stone-100 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-stone-900 mb-4">AI Park Assistant</h2>
          <p className="text-stone-600">Plan your trip with real-time weather and travel insights.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col h-[600px] border border-stone-200">
          <div className="bg-emerald-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/20 p-2 rounded-lg">
                <Icon name="Bot" size={24} />
              </div>
              <div>
                <p className="font-bold">Mountain View Guide</p>
                <p className="text-xs text-emerald-200">Powered by Gemini AI with Search</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-stone-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 shadow-sm border ${
                    msg.role === 'user'
                      ? 'bg-emerald-600 text-white border-emerald-500 rounded-tr-none'
                      : 'bg-white text-stone-800 border-stone-200 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">{msg.content}</p>
                  
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-stone-100">
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Sources:</p>
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.map((source, sIdx) => (
                          <a 
                            key={sIdx}
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] bg-stone-100 hover:bg-emerald-50 hover:text-emerald-700 px-2 py-1 rounded transition-colors truncate max-w-[200px]"
                          >
                            {source.title || 'Search Link'}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className={`text-[10px] mt-2 opacity-60 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-200 rounded-2xl p-4 flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-stone-100 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="How's the weather next week in Van Horn?"
                className="flex-1 px-4 py-3 rounded-xl bg-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-stone-800"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors"
              >
                <Icon name="Send" size={24} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default GeminiAssistant;

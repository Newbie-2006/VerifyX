'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot({ role = 'seller' }: { role?: 'seller' | 'customer' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: role === 'seller' 
        ? "Hello! I'm your VerifyX assistant. I can help you analyze high-risk returns or answer questions about today's activity. How can I help?"
        : "Hi! I'm here to help you with your return. You can track your status or ask why a return was rejected. What's on your mind?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const systemInstruction = role === 'seller'
        ? "You are the VerifyX AI Assistant for Sellers. Help them manage returns, detect fraud, and analyze data. Be professional and concise."
        : "You are the VerifyX AI Assistant for Customers. Help them track returns and understand the process. Be empathetic and helpful.";

      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: [
          { role: 'user', parts: [{ text: `System Context: ${systemInstruction}\n\nUser: ${userMessage}` }] }
        ],
      });

      const aiResponse = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="glass w-[350px] h-[500px] mb-4 rounded-[24px] flex flex-col overflow-hidden border border-white/60 shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-black/5 flex items-center justify-between bg-white/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#007aff]/10 flex items-center justify-center">
                  <Bot size={18} className="text-[#007aff]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1d1d1f]">VerifyX AI</h3>
                  <p className="text-[10px] text-[#86868b] uppercase tracking-tighter font-bold">Always Active</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[#86868b] hover:text-[#1d1d1f] transition-opacity">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-[16px] text-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#007aff] text-white rounded-tr-none shadow-sm' 
                      : 'bg-white/80 text-[#1d1d1f] rounded-tl-none border border-black/5 shadow-sm'
                  }`}>
                    <div className={msg.role === 'user' ? '' : 'prose prose-sm'}>
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/80 p-3 rounded-[16px] rounded-tl-none border border-black/5 flex gap-1 shadow-sm">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-[#86868b] rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#86868b] rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#86868b] rounded-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-black/5 bg-white/50">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything..."
                  className="w-full bg-white/80 border border-black/5 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none focus:border-[#007aff]/30 transition-colors shadow-sm"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:text-[#007aff] transition-colors text-[#86868b]"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full glass flex items-center justify-center shadow-xl border border-white/60 text-[#1d1d1f]"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}

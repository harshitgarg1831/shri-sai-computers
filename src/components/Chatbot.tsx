"use client";
import React, { useState, useEffect, useRef } from "react";
import { processChatMessage } from "@/app/actions/chat";

type Message = {
    id: number;
    sender: "bot" | "user";
    text: string;
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: "bot", text: "Hi there! 👋 Welcome to Shri Sai Computers. How can I help you today?" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isTyping]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userText = inputValue.trim();
        const newUserMsg: Message = { id: Date.now(), sender: "user", text: userText };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue("");
        setIsTyping(true);

        try {
            const botResponseText = await processChatMessage(userText);
            const newBotMsg: Message = { id: Date.now() + 1, sender: "bot", text: botResponseText };
            setMessages(prev => [...prev, newBotMsg]);
        } catch (error) {
            const errorMsg: Message = { id: Date.now() + 1, sender: "bot", text: "Oops! My brain got disconnected. Please try again or call us." };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    // Helper to format bot text (bolding text wrapped in **)
    const formatText = (text: string) => {
        return text.split('\n').map((line, i) => (
            <span key={i} className="block min-h-[0.5rem]">
                {line.split(/(\*\*.*?\*\*)/).map((part, j) =>
                    part.startsWith('**') && part.endsWith('**')
                        ? <strong key={j} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>
                        : part
                )}
            </span>
        ));
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="w-80 sm:w-[380px] h-[550px] max-h-[calc(100vh-100px)] rounded-3xl shadow-2xl border border-slate-700/20 mb-4 overflow-hidden flex flex-col transform transition-all origin-bottom-right bg-[#f8fafc]">
                    {/* Header */}
                    <div className="bg-slate-900 p-5 text-white flex justify-between items-center relative overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-teal-500/20"></div>
                        <div className="flex items-center gap-3 relative z-10">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl shadow-lg border-2 border-white/10">🤖</div>
                            <div>
                                <h3 className="font-extrabold tracking-tight text-white">Sai Smart Assistant</h3>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                    <p className="text-xs text-slate-300 font-medium">Online</p>
                                </div>
                            </div>
                        </div>
                        <button onClick={toggleChat} className="relative z-10 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed shadow-sm ${msg.sender === 'user'
                                    ? 'bg-slate-900 text-white rounded-br-sm'
                                    : 'bg-white border border-slate-200/60 text-slate-700 rounded-bl-sm'
                                    }`}>
                                    {formatText(msg.text)}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start animate-in fade-in">
                                <div className="bg-white border border-slate-200/60 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1">
                                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} className="h-1" />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-slate-100 shadow-[0_-4px_25px_-5px_rgba(0,0,0,0.05)]">
                        <form onSubmit={handleSend} className="flex gap-2 items-center bg-slate-50 border border-slate-200 rounded-xl p-1 focus-within:ring-2 focus-within:ring-slate-900 transition-all">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Ask about products or services..."
                                className="flex-1 bg-transparent border-none text-sm px-3 py-2 focus:outline-none text-slate-800 placeholder-slate-400"
                                disabled={isTyping}
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isTyping}
                                className="bg-slate-900 text-white p-2.5 rounded-lg hover:bg-slate-800 transition-all disabled:opacity-50 disabled:scale-100 active:scale-95"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={toggleChat}
                className={`${isOpen ? 'bg-slate-800 scale-90' : 'bg-slate-900 hover:bg-slate-800 hover:-translate-y-1'} text-white p-4 sm:p-5 rounded-full shadow-2xl shadow-slate-900/30 transition-all duration-300 flex items-center justify-center group`}
            >
                {isOpen ? (
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                ) : (
                    <div className="relative">
                        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500 border border-slate-900"></span>
                        </span>
                    </div>
                )}
            </button>
        </div>
    );
}

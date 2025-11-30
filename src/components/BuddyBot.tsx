"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Message = {
    id: string;
    role: "user" | "bot";
    content: string;
};

export default function BuddyBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "bot",
            content: "Hi! I'm your Campus Buddy. Ask me anything about admissions, PGs, or college life!",
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Mock AI Response
        setTimeout(() => {
            let botResponse = "I'm not sure about that. Try asking about 'admission', 'PGs', or 'notes'.";
            const lowerInput = userMessage.content.toLowerCase();

            if (lowerInput.includes("admission") || lowerInput.includes("documents")) {
                botResponse = "For admission, you'll need: 1. 10th & 12th Marksheets, 2. Transfer Certificate, 3. ID Proof (Aadhar), 4. Passport photos. Make sure to bring originals!";
            } else if (lowerInput.includes("pg") || lowerInput.includes("hostel") || lowerInput.includes("stay")) {
                botResponse = "I found 5 PGs near the campus under ₹7000. Check out the 'PG Finder' tab for the interactive map!";
            } else if (lowerInput.includes("notes") || lowerInput.includes("pyq")) {
                botResponse = "You can find handwritten notes and PYQs in the 'Resource Hub'. Seniors have uploaded some great material for Engineering Maths.";
            } else if (lowerInput.includes("mess") || lowerInput.includes("food")) {
                botResponse = "The college mess is okay, but 'Sharma Ji's Canteen' just outside the gate has the best Maggi and Chai!";
            } else if (lowerInput.includes("ragging")) {
                botResponse = "Don't worry! The campus has a strict anti-ragging policy. You can report any issues anonymously via the 'Safety' portal.";
            }

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                content: botResponse,
            };

            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-glow transition-all duration-300 hover:scale-110",
                    isOpen ? "bg-red-500 rotate-90" : "bg-gradient-to-r from-pink-500 to-purple-600"
                )}
            >
                {isOpen ? <X className="text-white" /> : <MessageCircle className="text-white" />}
            </button>

            {/* Chat Window */}
            <div
                className={cn(
                    "fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl transition-all duration-300 origin-bottom-right overflow-hidden flex flex-col",
                    isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
                )}
                style={{ height: "500px", maxHeight: "80vh" }}
            >
                {/* Header */}
                <div className="flex items-center gap-3 bg-gradient-to-r from-pink-500/20 to-purple-600/20 p-4 border-b border-white/10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600">
                        <Bot className="text-white h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">Campus Buddy</h3>
                        <p className="text-xs text-green-400 flex items-center gap-1">
                            <span className="block h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                            Online
                        </p>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide" ref={scrollRef}>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex w-full",
                                msg.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                                    msg.role === "user"
                                        ? "bg-purple-600 text-white rounded-br-none"
                                        : "bg-white/10 text-gray-200 rounded-bl-none border border-white/5"
                                )}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white/10 rounded-2xl px-4 py-2 rounded-bl-none border border-white/5 flex gap-1 items-center">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10 bg-black/40">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="flex gap-2"
                    >
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about PGs, notes..."
                            className="bg-white/5 border-white/10 text-white placeholder-gray-500 focus-visible:ring-purple-500"
                        />
                        <Button type="submit" size="icon" className="bg-purple-600 hover:bg-purple-700 text-white shrink-0">
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}

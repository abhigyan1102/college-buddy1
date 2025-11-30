import { Layout } from "@/components/layout";
import { users, currentUser } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Phone, Video, Info, Image, Heart, Smile, Send, MoreHorizontal } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isLiked?: boolean;
}

interface ChatSession {
  userId: string;
  messages: Message[];
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
}

const initialChats: ChatSession[] = [
  {
    userId: "u2",
    messages: [
      { id: "m1", senderId: "u2", text: "Hey! Did you finish the CS assignment?", timestamp: "10:30 AM" },
      { id: "m2", senderId: "u1", text: "Almost there, just stuck on the recursion part.", timestamp: "10:32 AM" },
      { id: "m3", senderId: "u2", text: "I can help you with that later if you want!", timestamp: "10:33 AM", isLiked: true },
    ],
    lastMessage: "I can help you with that later if you want!",
    lastMessageTime: "10:33 AM",
    unread: 0
  },
  {
    userId: "u3",
    messages: [
      { id: "m4", senderId: "u3", text: "Is the library open 24/7 during finals?", timestamp: "Yesterday" },
    ],
    lastMessage: "Is the library open 24/7 during finals?",
    lastMessageTime: "Yesterday",
    unread: 1
  },
  {
    userId: "u4",
    messages: [
      { id: "m5", senderId: "u4", text: "Thanks for the notes!", timestamp: "2d ago" },
    ],
    lastMessage: "Thanks for the notes!",
    lastMessageTime: "2d ago",
    unread: 0
  }
];

export default function Messages() {
  const [activeChatId, setActiveChatId] = useState<string>(initialChats[0].userId);
  const [chats, setChats] = useState<ChatSession[]>(initialChats);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find(c => c.userId === activeChatId);
  const activeUser = users[activeChatId];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: `new-${Date.now()}`,
      senderId: currentUser.id,
      text: inputText,
      timestamp: "Just now"
    };

    setChats(prev => prev.map(chat => {
      if (chat.userId === activeChatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: inputText,
          lastMessageTime: "Just now"
        };
      }
      return chat;
    }));
    setInputText("");
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-2rem)] w-full max-w-5xl mx-auto border border-border/40 rounded-xl overflow-hidden bg-background mt-4">
        {/* Sidebar - Chat List */}
        <div className="w-80 md:w-96 border-r border-border/40 flex flex-col">
          <div className="p-5 border-b border-border/40 flex justify-between items-center">
            <h2 className="font-bold text-xl font-serif">{currentUser.id}</h2>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-6 h-6" />
            </Button>
          </div>
          
          <div className="p-4 overflow-y-auto flex-1">
             <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base">Messages</h3>
                <span className="text-sm text-muted-foreground font-medium">Requests</span>
             </div>

             <div className="space-y-1">
               {chats.map(chat => {
                 const user = users[chat.userId];
                 const isActive = activeChatId === chat.userId;
                 
                 return (
                   <div 
                    key={chat.userId}
                    onClick={() => setActiveChatId(chat.userId)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                      isActive ? "bg-secondary" : "hover:bg-secondary/50"
                    )}
                   >
                     <Avatar className="w-14 h-14 border border-border/50">
                       <AvatarImage src={user.avatar} />
                       <AvatarFallback>{user.name[0]}</AvatarFallback>
                     </Avatar>
                     <div className="flex-1 overflow-hidden">
                       <div className="flex justify-between items-center">
                         <span className="font-normal text-sm truncate">{user.name}</span>
                       </div>
                       <div className="flex items-center gap-1 text-xs text-muted-foreground">
                         <span className={cn("truncate", chat.unread > 0 ? "font-bold text-foreground" : "")}>
                           {chat.lastMessage}
                         </span>
                         <span>• {chat.lastMessageTime}</span>
                       </div>
                     </div>
                     {chat.unread > 0 && (
                       <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                     )}
                   </div>
                 );
               })}
             </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-background">
          {/* Chat Header */}
          <div className="h-20 border-b border-border/40 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-3">
              <Avatar className="w-11 h-11 border border-border/50">
                <AvatarImage src={activeUser.avatar} />
                <AvatarFallback>{activeUser.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-base">{activeUser.name}</h3>
                <span className="text-xs text-muted-foreground">Active now</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-foreground">
              <Phone className="w-6 h-6 cursor-pointer hover:text-muted-foreground" />
              <Video className="w-6 h-6 cursor-pointer hover:text-muted-foreground" />
              <Info className="w-6 h-6 cursor-pointer hover:text-muted-foreground" />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {activeChat?.messages.map((msg, i) => {
              const isMe = msg.senderId === currentUser.id;
              const isLast = i === activeChat.messages.length - 1;
              
              return (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex gap-2 max-w-[70%]", 
                    isMe ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  {!isMe && (
                    <Avatar className="w-7 h-7 mt-auto border border-border/50">
                      <AvatarImage src={activeUser.avatar} />
                      <AvatarFallback>{activeUser.name[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn(
                    "px-4 py-2 rounded-2xl text-sm",
                    isMe 
                      ? "bg-primary text-primary-foreground rounded-br-sm" 
                      : "bg-secondary text-secondary-foreground rounded-bl-sm"
                  )}>
                    {msg.text}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 m-4 mt-0 bg-background border border-border/40 rounded-3xl flex items-center gap-3">
            <div className="flex items-center gap-3 text-foreground">
              <Smile className="w-6 h-6 cursor-pointer hover:text-muted-foreground" />
            </div>
            <form onSubmit={handleSendMessage} className="flex-1">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Message..." 
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm placeholder:text-muted-foreground"
              />
            </form>
            <div className="flex items-center gap-3 text-foreground">
              {inputText.trim() ? (
                <button onClick={handleSendMessage} className="text-primary font-bold text-sm hover:text-primary/80">
                  Send
                </button>
              ) : (
                <>
                  <Image className="w-6 h-6 cursor-pointer hover:text-muted-foreground" />
                  <Heart className="w-6 h-6 cursor-pointer hover:text-muted-foreground" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

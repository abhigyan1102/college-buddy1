"use client";

import { useState } from "react";
import { users, currentUser } from "@/lib/campusQueryConnect/mock-data";
import { MessageSquare, Share2, ThumbsUp, MoreHorizontal, Heart, MessageCircle, Bookmark, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Question } from "@/lib/campusQueryConnect/store";
import { UserBadge } from "@/components/campusQueryConnect/user-badge";

interface QuestionCardProps {
  question: Question;
}

import { useCurrentUser } from "@/lib/campusQueryConnect/use-current-user";

export function QuestionCard({ question }: QuestionCardProps) {
  const { user: currentUser } = useCurrentUser();
  const author = users[question.userId] ||
    (currentUser && question.userId === currentUser.id ? currentUser : null) ||
    { name: "Unknown User", avatar: "", id: question.userId, year: 1, questionsAnswered: 0, questionsPending: 0, badges: [], bio: "" };

  if (!author) return null;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [localAnswers, setLocalAnswers] = useState(question.answers);

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerText.trim() || !currentUser) return;

    const newAnswer = {
      id: `new-${Date.now()}`,
      userId: currentUser.id,
      content: answerText,
      timestamp: "Just now",
      rating: 0
    };

    setLocalAnswers([...localAnswers, newAnswer]);
    setAnswerText("");
  };

  return (
    <div className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border border-border/50 shadow-lg rounded-xl pb-4 mb-4 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative cursor-pointer">
            <div className="absolute -inset-0.5 bg-gradient-to-tr from-yellow-400 to-fuchsia-600 rounded-full opacity-0 hover:opacity-100 transition-opacity" />
            <Avatar className="w-8 h-8 relative border border-background">
              <AvatarImage src={question.isAnonymous ? "" : author.avatar} />
              <AvatarFallback>{question.isAnonymous ? "?" : author.name[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className={cn("font-bold text-sm text-foreground", !question.isAnonymous && "cursor-pointer hover:opacity-80")}>
                {question.isAnonymous ? "Anonymous User" : author.name}
              </span>
              <span className="text-xs text-muted-foreground">• {question.timestamp}</span>
            </div>
            {question.important && <span className="text-[10px] font-bold text-rose-500">IMPORTANT</span>}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-foreground h-8 w-8">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="px-4 mb-3">
        <h3 className="font-bold text-base mb-1 leading-snug">{question.title}</h3>
        <p className="text-foreground/90 text-sm leading-relaxed">{question.content}</p>
        <div className="mt-2">
          <span className="text-blue-500 text-sm hover:underline cursor-pointer">#{question.category.replace(/\s+/g, '')}</span>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-auto w-auto p-0 hover:bg-transparent" onClick={() => setIsLiked(!isLiked)}>
            <Heart className={cn("w-6 h-6 transition-colors", isLiked ? "fill-red-500 text-red-500" : "text-foreground hover:text-muted-foreground")} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-auto w-auto p-0 hover:bg-transparent"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <MessageCircle className="w-6 h-6 text-foreground hover:text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="h-auto w-auto p-0 hover:bg-transparent">
            <Share2 className="w-6 h-6 text-foreground hover:text-muted-foreground" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="h-auto w-auto p-0 hover:bg-transparent">
          <Bookmark className="w-6 h-6 text-foreground hover:text-muted-foreground" />
        </Button>
      </div>

      {/* Likes Count */}
      <div className="px-4 mb-2">
        <span className="text-sm font-bold">{question.views} views</span>
      </div>

      {/* Comments/Answers Preview */}
      {localAnswers.length > 0 && !isExpanded && (
        <div className="px-4 mb-2">
          <button
            className="text-muted-foreground text-sm hover:text-foreground transition-colors"
            onClick={() => setIsExpanded(true)}
          >
            View all {localAnswers.length} answers
          </button>
        </div>
      )}

      {/* Answers Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-3 mt-2 px-4"
          >
            {localAnswers.map((answer) => {
              const answerAuthor = users[answer.userId] || (currentUser && answer.userId === currentUser.id ? currentUser : null);
              if (!answerAuthor) return null;
              return (
                <div key={answer.id} className="flex gap-3 group">
                  <div className="flex-1 text-sm">
                    <span className="font-bold mr-2">{answerAuthor.name}</span>
                    <span className="text-foreground/90">{answer.content}</span>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{answer.timestamp}</span>
                      {answer.rating > 0 && <span className="font-bold text-amber-500">{answer.rating} stars</span>}
                      <button className="font-bold hover:text-foreground">Reply</button>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-3 h-3" />
                  </Button>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Comment Input */}
      <div className="flex items-center gap-2 mt-2 px-4 relative">
        <form onSubmit={handleSubmitAnswer} className="flex-1 flex items-center">
          <input
            placeholder="Add a comment..."
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm placeholder:text-muted-foreground h-8"
          />
          {answerText.trim() && (
            <button type="submit" className="text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors">
              Post
            </button>
          )}
        </form>
        <div className="flex items-center gap-1 text-lg cursor-pointer hover:opacity-70">
          👾
        </div>
      </div>
    </div>
  );
}

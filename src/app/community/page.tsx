"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AnimatedBackground from "@/components/AnimatedBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  Search,
  MessageSquare,
  Eye,
  Clock,
  Plus,
  TrendingUp,
  Loader2,
  Send,
  ArrowLeft,
  User,
} from "lucide-react";

interface Question {
  id: number;
  title: string;
  content: string;
  askedBy: string | null;
  isAnonymous: boolean;
  createdAt: string;
  viewCount: number;
  answerCount: number;
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

interface Answer {
  id: number;
  content: string;
  answeredBy: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface QuestionDetail extends Question {
  answers: Answer[];
}

export default function CommunityPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionDetail | null>(null);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isAskDialogOpen, setIsAskDialogOpen] = useState(false);
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [answerContent, setAnswerContent] = useState("");

  const [questionForm, setQuestionForm] = useState({
    title: "",
    content: "",
    isAnonymous: false,
  });

  // Fetch questions
  const fetchQuestions = async () => {
    try {
      const params = new URLSearchParams();
      params.append("sort", sortBy);
      params.append("limit", "20");
      if (searchQuery) params.append("search", searchQuery);

      const response = await fetch(`/api/questions?${params.toString()}`);
      const data = await response.json();
      setQuestions(data.questions || []);
    } catch (error) {
      toast.error("Failed to load questions");
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [sortBy, searchQuery]);

  // Fetch single question with answers
  const fetchQuestion = async (id: number) => {
    setIsLoadingQuestion(true);
    try {
      const response = await fetch(`/api/questions/${id}`);
      const data = await response.json();
      
      if (response.ok) {
        setSelectedQuestion({
          ...data.question,
          answers: data.answers || [],
        });
        
        // Update view count
        await fetch(`/api/questions/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ viewCount: data.question.viewCount + 1 }),
        });
      } else {
        toast.error("Failed to load question");
      }
    } catch (error) {
      toast.error("Failed to load question");
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  // Submit new question
  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingQuestion(true);

    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(questionForm),
      });

      if (response.ok) {
        toast.success("Question posted successfully!");
        setQuestionForm({ title: "", content: "", isAnonymous: false });
        setIsAskDialogOpen(false);
        fetchQuestions();
      } else {
        toast.error("Failed to post question");
      }
    } catch (error) {
      toast.error("Failed to post question");
    } finally {
      setIsSubmittingQuestion(false);
    }
  };

  // Submit answer
  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user) {
      toast.error("Please login to answer questions");
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (!selectedQuestion) return;

    setIsSubmittingAnswer(true);

    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/questions/${selectedQuestion.id}/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: answerContent }),
      });

      if (response.ok) {
        toast.success("Answer posted successfully!");
        setAnswerContent("");
        fetchQuestion(selectedQuestion.id);
        fetchQuestions(); // Refresh to update answer count
      } else {
        const data = await response.json();
        if (response.status === 401) {
          toast.error("Please login to answer questions");
          router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
        } else {
          toast.error(data.error || "Failed to post answer");
        }
      }
    } catch (error) {
      toast.error("Failed to post answer");
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMs / 3600000);
    const diffInDays = Math.floor(diffInMs / 86400000);

    if (diffInMins < 1) return "just now";
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  if (selectedQuestion) {
    return (
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <Header />

        <div className="pt-20 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div {...fadeIn}>
              <Button
                variant="ghost"
                className="mb-6 gap-2"
                onClick={() => setSelectedQuestion(null)}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Questions
              </Button>

              {isLoadingQuestion ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                </div>
              ) : (
                <>
                  {/* Question Card */}
                  <Card className="p-6 md:p-8 mb-6 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl border-border/50">
                    <h1 className="text-2xl md:text-3xl font-bold mb-4">{selectedQuestion.title}</h1>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-xs">
                            {selectedQuestion.isAnonymous ? "A" : selectedQuestion.user?.name?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {selectedQuestion.isAnonymous ? "Anonymous" : selectedQuestion.user?.name || "Unknown"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDate(selectedQuestion.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {selectedQuestion.viewCount} views
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {selectedQuestion.answerCount} answers
                      </div>
                    </div>

                    <div className="prose prose-sm max-w-none text-foreground">
                      <p className="whitespace-pre-wrap">{selectedQuestion.content}</p>
                    </div>
                  </Card>

                  {/* Answers Section */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4">
                      {selectedQuestion.answers.length} {selectedQuestion.answers.length === 1 ? "Answer" : "Answers"}
                    </h2>

                    <div className="space-y-4">
                      {selectedQuestion.answers.map((answer) => (
                        <Card key={answer.id} className="p-6 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl border-border/50">
                          <div className="flex items-start gap-4">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                                {answer.user.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold">{answer.user.name}</span>
                                <span className="text-sm text-muted-foreground">
                                  {formatDate(answer.createdAt)}
                                </span>
                              </div>
                              <p className="text-foreground whitespace-pre-wrap">{answer.content}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Answer Form */}
                  <Card className="p-6 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl border-border/50">
                    <h3 className="text-lg font-bold mb-4">Your Answer</h3>
                    {session?.user ? (
                      <form onSubmit={handleSubmitAnswer} className="space-y-4">
                        <Textarea
                          placeholder="Write your answer here... Be helpful and respectful."
                          value={answerContent}
                          onChange={(e) => setAnswerContent(e.target.value)}
                          rows={6}
                          required
                          disabled={isSubmittingAnswer}
                          className="bg-background/50"
                        />
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                          disabled={isSubmittingAnswer || !answerContent.trim()}
                        >
                          {isSubmittingAnswer ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Posting...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Post Answer
                            </>
                          )}
                        </Button>
                      </form>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">Please login to answer this question</p>
                        <Link href={`/login?redirect=${encodeURIComponent(window.location.pathname)}`}>
                          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                            Login to Answer
                          </Button>
                        </Link>
                      </div>
                    )}
                  </Card>
                </>
              )}
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Header />

      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div {...fadeIn} className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Student Q&A Community
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ask questions, share knowledge, and help fellow students navigate college life
            </p>
          </motion.div>

          {/* Search and Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <Card className="p-4 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl border-border/50">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background/50"
                  />
                </div>
                <Dialog open={isAskDialogOpen} onOpenChange={setIsAskDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                      <Plus className="w-5 h-5 mr-2" />
                      Ask Question
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Ask a Question</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmitQuestion} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Question Title</Label>
                        <Input
                          id="title"
                          placeholder="e.g., How are the hostel facilities?"
                          value={questionForm.title}
                          onChange={(e) => setQuestionForm({ ...questionForm, title: e.target.value })}
                          required
                          disabled={isSubmittingQuestion}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="content">Details</Label>
                        <Textarea
                          id="content"
                          placeholder="Provide more context about your question..."
                          value={questionForm.content}
                          onChange={(e) => setQuestionForm({ ...questionForm, content: e.target.value })}
                          rows={6}
                          required
                          disabled={isSubmittingQuestion}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="anonymous"
                          checked={questionForm.isAnonymous}
                          onCheckedChange={(checked) =>
                            setQuestionForm({ ...questionForm, isAnonymous: checked as boolean })
                          }
                          disabled={isSubmittingQuestion}
                        />
                        <label
                          htmlFor="anonymous"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Post anonymously
                        </label>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsAskDialogOpen(false)}
                          disabled={isSubmittingQuestion}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                          disabled={isSubmittingQuestion}
                        >
                          {isSubmittingQuestion ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Posting...
                            </>
                          ) : (
                            "Post Question"
                          )}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          </motion.div>

          {/* Sort Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <Tabs value={sortBy} onValueChange={setSortBy}>
              <TabsList className="bg-background/80 backdrop-blur-sm">
                <TabsTrigger value="newest" className="gap-2">
                  <Clock className="w-4 h-4" />
                  Newest
                </TabsTrigger>
                <TabsTrigger value="popular" className="gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Popular
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Questions List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {isLoadingQuestions ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              </div>
            ) : questions.length === 0 ? (
              <Card className="p-12 text-center bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl border-border/50">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No questions yet</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to ask a question!
                </p>
                <Button
                  onClick={() => setIsAskDialogOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Ask Question
                </Button>
              </Card>
            ) : (
              questions.map((question) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className="p-6 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-xl border-border/50 hover:border-purple-500/50 transition-all cursor-pointer"
                    onClick={() => fetchQuestion(question.id)}
                  >
                    <h3 className="text-lg font-semibold mb-3 hover:text-purple-600 transition-colors">
                      {question.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {question.content}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-xs">
                            {question.isAnonymous ? "A" : question.user?.name?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs">
                          {question.isAnonymous ? "Anonymous" : question.user?.name || "Unknown"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDate(question.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {question.viewCount}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {question.answerCount} {question.answerCount === 1 ? "answer" : "answers"}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
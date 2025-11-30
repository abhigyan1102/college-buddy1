"use client";

import { useParams } from "next/navigation";
import { users, questions, currentUser } from "@/lib/campusQueryConnect/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Award, BookOpen, Calendar, MapPin } from "lucide-react";
import { QuestionCard } from "@/components/campusQueryConnect/question-card";
import { Layout } from "@/components/campusQueryConnect/layout";

import { useCurrentUser } from "@/lib/campusQueryConnect/use-current-user";

export default function ProfilePage() {
    const params = useParams();
    const userId = params.id as string;
    const { user: currentUser } = useCurrentUser();

    // Fallback to currentUser if user not found (or for demo purposes if ID doesn't match)
    const user = (currentUser && currentUser.id === userId) ? currentUser : (users[userId] || currentUser);

    if (!user) return <div>User not found</div>;

    const userQuestions = questions.filter(q => q.userId === user.id);
    const totalQuestions = userQuestions.length;

    // Calculate total answers by this user across all questions
    const totalAnswers = questions.reduce((acc, q) => {
        return acc + q.answers.filter(a => a.userId === user.id).length;
    }, 0);

    return (
        <Layout>
            <div className="space-y-6 pb-10 px-4 pt-8">
                {/* Profile Header Card */}
                <Card className="overflow-hidden bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border-border/50 shadow-xl">
                    <div className="h-32 bg-gradient-to-r from-purple-600/20 to-pink-600/20 relative">
                        <div className="absolute -bottom-12 left-6">
                            <Avatar className="w-24 h-24 border-4 border-background shadow-xl">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>

                    <div className="pt-14 px-6 pb-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    {user.name}
                                </h1>
                                <p className="text-muted-foreground">@{user.id}</p>
                            </div>
                            <Badge variant="outline" className="bg-purple-500/10 text-purple-600 border-purple-200">
                                Year {user.year}
                            </Badge>
                        </div>

                        <p className="text-foreground/90 mb-6 max-w-lg">
                            {user.bio}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4 text-purple-500" />
                                <span className="font-semibold text-foreground">{totalAnswers}</span> Answers
                            </div>
                            <div className="flex items-center gap-1">
                                <BookOpen className="w-4 h-4 text-pink-500" />
                                <span className="font-semibold text-foreground">{totalQuestions}</span> Questions
                            </div>
                            <div className="flex items-center gap-1">
                                <Award className="w-4 h-4 text-orange-500" />
                                <span className="capitalize">{user.badges[0]}</span> Badge
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Content Tabs */}
                <Tabs defaultValue="questions" className="w-full">
                    <TabsList className="w-full justify-start bg-background/40 backdrop-blur-xl border border-border/40 p-1 h-auto">
                        <TabsTrigger
                            value="questions"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white px-6 py-2"
                        >
                            Questions Asked ({totalQuestions})
                        </TabsTrigger>
                        <TabsTrigger
                            value="about"
                            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white px-6 py-2"
                        >
                            About
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="questions" className="mt-6 space-y-4">
                        {userQuestions.length > 0 ? (
                            userQuestions.map(question => (
                                <QuestionCard key={question.id} question={question} />
                            ))
                        ) : (
                            <Card className="p-8 text-center bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border-border/50">
                                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MessageSquare className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">No questions yet</h3>
                                <p className="text-muted-foreground">
                                    {user.name} hasn't asked any questions in the community yet.
                                </p>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="about" className="mt-6">
                        <Card className="p-6 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border-border/50">
                            <h3 className="text-lg font-bold mb-4">About {user.name}</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                                        <Calendar className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium">Joined</div>
                                        <div className="text-sm text-muted-foreground">September 2023</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-4 h-4 text-pink-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium">Campus</div>
                                        <div className="text-sm text-muted-foreground">Main Campus, Block A</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                                        <Award className="w-4 h-4 text-orange-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium">Reputation</div>
                                        <div className="text-sm text-muted-foreground">Top Contributor (Top 10%)</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
}

"use client";

import { Layout } from "@/components/campusQueryConnect/layout";
import { QuestionCard } from "@/components/campusQueryConnect/question-card";
import { useStore } from "@/lib/campusQueryConnect/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrentUser } from "@/lib/campusQueryConnect/use-current-user";
import { useCreatePostModal } from "@/lib/campusQueryConnect/use-create-post-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Image, MapPin, Smile } from "lucide-react";

export default function Home() {
    const { questions } = useStore();
    const { user: currentUser } = useCurrentUser();
    const createPostModal = useCreatePostModal();

    const importantQuestions = questions.filter(q => q.important);
    const recentQuestions = [...questions].sort((a, b) => b.timestamp.localeCompare(a.timestamp));

    return (
        <Layout>
            <div className="w-full mx-auto pt-8 px-4">
                {/* Create Post Input Trigger */}
                <Card
                    className="mb-8 p-4 bg-background/40 backdrop-blur-xl border-border/50 cursor-pointer hover:bg-background/60 transition-colors"
                    onClick={createPostModal.onOpen}
                >
                    <div className="flex gap-4 items-center">
                        <Avatar className="w-10 h-10 border border-border/50">
                            <AvatarImage src={currentUser?.avatar} />
                            <AvatarFallback>{currentUser?.name?.[0] || "?"}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="w-full h-10 rounded-full bg-secondary/50 flex items-center px-4 text-muted-foreground text-sm hover:bg-secondary/70 transition-colors">
                                What's on your mind, {currentUser?.name?.split(' ')[0] || 'Guest'}?
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-border/40 px-2">
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 text-muted-foreground hover:text-purple-500 transition-colors text-sm font-medium">
                                <Image className="w-4 h-4" />
                                <span>Media</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground hover:text-pink-500 transition-colors text-sm font-medium">
                                <MapPin className="w-4 h-4" />
                                <span>Location</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground hover:text-orange-500 transition-colors text-sm font-medium">
                                <Smile className="w-4 h-4" />
                                <span>Activity</span>
                            </div>
                        </div>
                    </div>
                </Card>

                <Tabs defaultValue="important" className="w-full">
                    <TabsList className="w-full bg-transparent p-0 mb-6 border-b border-border/40 rounded-none justify-center gap-12">
                        <TabsTrigger
                            value="important"
                            className="bg-transparent p-0 pb-3 rounded-none border-b-[1px] border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:font-bold text-muted-foreground hover:text-foreground transition-colors shadow-none text-sm tracking-wide"
                        >
                            For You
                        </TabsTrigger>
                        <TabsTrigger
                            value="recent"
                            className="bg-transparent p-0 pb-3 rounded-none border-b-[1px] border-transparent data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:font-bold text-muted-foreground hover:text-foreground transition-colors shadow-none text-sm tracking-wide"
                        >
                            Recent
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="important" className="space-y-4 mt-0 pb-20">
                        {importantQuestions.map(q => (
                            <QuestionCard key={q.id} question={q} />
                        ))}
                    </TabsContent>

                    <TabsContent value="recent" className="space-y-4 mt-0 pb-20">
                        {recentQuestions.map(q => (
                            <QuestionCard key={q.id} question={q} />
                        ))}
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
}

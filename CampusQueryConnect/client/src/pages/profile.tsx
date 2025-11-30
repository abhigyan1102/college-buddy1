import { Layout } from "@/components/layout";
import { currentUser } from "@/lib/mock-data";
import { useStore } from "@/lib/store";
import { UserBadge } from "@/components/user-badge";
import { QuestionCard } from "@/components/question-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Profile() {
  const { questions } = useStore();
  const myQuestions = questions.filter(q => q.userId === currentUser.id);
  // In a real app, we'd filter answers by user ID too, but for mock we'll just show some text
  
  return (
    <Layout>
      {/* Profile Header */}
      <div className="bg-card border border-border/60 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/10 to-primary/5 z-0" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end gap-6 pt-12">
          <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 mb-2">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-serif font-bold text-foreground">{currentUser.name}</h1>
              {currentUser.badges.map(b => <UserBadge key={b} level={b} showLabel />)}
            </div>
            <p className="text-lg text-muted-foreground mb-4">{currentUser.bio}</p>
            
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{currentUser.questionsAnswered}</div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Answers Given</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{currentUser.questionsPending}</div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Questions Asked</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="w-full bg-transparent p-0 mb-6 border-b border-border/60 rounded-none justify-start gap-6">
          <TabsTrigger value="activity" className="bg-transparent p-0 pb-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary shadow-none font-serif text-base">My Activity</TabsTrigger>
          <TabsTrigger value="questions" className="bg-transparent p-0 pb-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary shadow-none font-serif text-base">My Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="mt-0">
          <div className="text-center py-12 text-muted-foreground bg-secondary/20 rounded-xl border border-dashed border-border">
            <p>Recent activity feed would go here.</p>
          </div>
        </TabsContent>

        <TabsContent value="questions" className="mt-0 space-y-4">
          {myQuestions.length > 0 ? (
            myQuestions.map(q => <QuestionCard key={q.id} question={q} />)
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              You haven't asked any questions yet.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Layout>
  );
}

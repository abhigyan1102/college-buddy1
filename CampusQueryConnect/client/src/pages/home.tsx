import { Layout } from "@/components/layout";
import { QuestionCard } from "@/components/question-card";
import { useStore } from "@/lib/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const { questions } = useStore();
  const importantQuestions = questions.filter(q => q.important);
  const recentQuestions = [...questions].sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  return (
    <Layout>
      <div className="w-full mx-auto pt-8 px-4">
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

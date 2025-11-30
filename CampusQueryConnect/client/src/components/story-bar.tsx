import { questions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

export function StoryBar() {
  const unansweredQuestions = questions.filter(q => q.isUnanswered);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-lg font-bold font-serif tracking-tight text-foreground">Unanswered Questions</h2>
        <button className="text-xs font-medium text-primary hover:underline">View All</button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        {/* Add New Story */}
        <div className="flex-shrink-0 w-24 flex flex-col items-center gap-2 group cursor-pointer">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-secondary/30 group-hover:bg-secondary transition-colors">
            <PlusCircle className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <span className="text-xs font-medium text-muted-foreground text-center">Ask New</span>
        </div>

        {unansweredQuestions.map((q, i) => (
          <motion.div 
            key={q.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex-shrink-0 w-32 flex flex-col items-center gap-2 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-orange-400 to-rose-500 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center p-1 overflow-hidden">
                   <span className="text-[10px] font-bold text-center leading-tight line-clamp-3 text-foreground/80">
                     {q.category}
                   </span>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-rose-500 rounded-full border-2 border-background text-[10px] text-white flex items-center justify-center font-bold">
                ?
              </div>
            </div>
            <span className="text-xs font-medium text-foreground/80 text-center line-clamp-2 leading-tight px-1 group-hover:text-primary transition-colors">
              {q.title}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

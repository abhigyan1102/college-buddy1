import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStore } from "@/lib/store";
import { Loader2, Image as ImageIcon, MapPin, Smile } from "lucide-react";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

import { useToast } from "@/hooks/use-toast";

export function CreatePostDialog({ open, onOpenChange }: CreatePostDialogProps) {
  const { addQuestion } = useStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsLoading(true);

    // Simulate network delay for "uploading to net"
    setTimeout(() => {
      addQuestion({
        title,
        content,
        category,
      });
      
      toast({
        title: "Posted successfully",
        description: "Your question has been uploaded to the network.",
      });

      setIsLoading(false);
      onOpenChange(false);
      // Reset form
      setTitle("");
      setContent("");
      setCategory("General");
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] bg-background border-border text-foreground p-0 overflow-hidden gap-0">
        <DialogHeader className="p-4 border-b border-border">
          <DialogTitle className="text-center font-bold text-base">Create new post</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col h-full">
          {isLoading ? (
            <div className="h-[300px] flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-sm font-bold animate-pulse">Sharing to CampusConnect...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Title of your question..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="font-bold text-lg border-none px-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="space-y-2">
                <Textarea
                  placeholder="What's on your mind?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[150px] resize-none border-none px-0 focus-visible:ring-0 text-base placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/40">
                <div className="flex items-center gap-2">
                   <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-[140px] h-8 bg-secondary/50 border-none text-xs font-bold rounded-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Campus Life">Campus Life</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-3 text-muted-foreground">
                   <ImageIcon className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                   <MapPin className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                   <Smile className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full font-bold" 
                disabled={!title.trim() || !content.trim()}
              >
                Post
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

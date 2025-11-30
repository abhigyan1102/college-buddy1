"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useStore } from "@/lib/campusQueryConnect/store";
import { toast } from "sonner";
import { Image, Loader2, MapPin, Smile, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}



import { useCurrentUser } from "@/lib/campusQueryConnect/use-current-user";

export function CreatePostDialog({ open, onOpenChange }: CreatePostDialogProps) {
  const { addQuestion } = useStore();
  const { user: currentUser } = useCurrentUser();

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !currentUser) return;

    setIsLoading(true);

    // Simulate network delay for "uploading to net"
    setTimeout(() => {
      addQuestion({
        title,
        content,
        category,
        isAnonymous,
      }, currentUser.id);

      toast("Posted successfully", {
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
      <DialogContent className="sm:max-w-[550px] bg-background/60 backdrop-blur-2xl border-white/20 text-foreground p-0 overflow-hidden gap-0 shadow-2xl rounded-2xl ring-1 ring-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 pointer-events-none" />

        <DialogHeader className="p-6 border-b border-white/10 relative z-10 flex items-center justify-center">
          <DialogTitle className="text-center font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Create New Post
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 h-8 w-8 rounded-full hover:bg-white/10 hover:text-foreground transition-colors"
            onClick={() => onOpenChange(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="flex flex-col h-full relative z-10">
          {isLoading ? (
            <div className="h-[350px] flex flex-col items-center justify-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 animate-pulse" />
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin relative z-10" />
              </div>
              <p className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
                Publishing to CampusConnect...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <Input
                  placeholder="What's the topic?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="font-bold text-2xl border-none px-0 focus-visible:ring-0 placeholder:text-muted-foreground/40 bg-transparent h-auto"
                />

                <Textarea
                  placeholder="Share your thoughts, questions, or ideas..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[180px] resize-none border-none px-0 focus-visible:ring-0 text-lg placeholder:text-muted-foreground/40 bg-transparent leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-[160px] h-9 bg-white/5 border-white/10 hover:bg-white/10 text-sm font-medium rounded-full transition-colors backdrop-blur-md">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-background/80 backdrop-blur-xl border-white/20">
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Campus Life">Campus Life</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="h-6 w-[1px] bg-white/10" />

                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white/10 hover:text-purple-500 transition-colors">
                      <Image className="w-5 h-5" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white/10 hover:text-pink-500 transition-colors">
                      <MapPin className="w-5 h-5" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-white/10 hover:text-orange-500 transition-colors">
                      <Smile className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  <Switch
                    id="anonymous-mode"
                    checked={isAnonymous}
                    onCheckedChange={setIsAnonymous}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-pink-600"
                  />
                  <Label htmlFor="anonymous-mode" className="text-xs font-medium cursor-pointer select-none">
                    Anonymous
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full font-bold h-11 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                disabled={!title.trim() || !content.trim() || !currentUser}
              >
                Post Question
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

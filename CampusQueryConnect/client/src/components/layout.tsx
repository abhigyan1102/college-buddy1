import { Link, useLocation } from "wouter";
import { Home, Search, Compass, MessageCircle, Heart, PlusSquare, Menu, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useMemo } from "react";
import { currentUser, users, questions } from "@/lib/mock-data";
import { UserBadge } from "./user-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { CreatePostDialog } from "./create-post-dialog";
import { useToast } from "@/hooks/use-toast";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handlePlaceholderClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    toast({
      title: "Coming Soon",
      description: `${label} feature is under development.`,
    });
  };

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return { users: [], questions: [] };

    const query = searchQuery.toLowerCase();
    return {
      users: Object.values(users).filter(u => u.name.toLowerCase().includes(query) || u.bio.toLowerCase().includes(query)),
      questions: questions.filter(q => q.title.toLowerCase().includes(query) || q.content.toLowerCase().includes(query))
    };
  }, [searchQuery]);

  const navItems = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Search", icon: Search, href: "#", onClick: () => setIsSearchOpen(!isSearchOpen) },
    { label: "Explore", icon: Compass, href: "/community" },
    { label: "Messages", icon: MessageCircle, href: "/messages" },

    { label: "Create", icon: PlusSquare, href: "#", onClick: () => setIsCreateOpen(true) },
    { label: "Profile", icon: User, href: `/profile/${currentUser.id}`, isProfile: true },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-background border-r border-border/40">
      <div className="p-6 pb-8">
        <h1 className="font-serif text-xl font-bold tracking-tight hidden xl:block">CampusConnect</h1>
        <h1 className="font-serif text-xl font-bold tracking-tight xl:hidden text-center">CC</h1>
      </div>

      <nav className="flex-1 px-3 space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.label} href={item.href} onClick={item.onClick}>
              <a className={cn(
                "flex items-center gap-4 p-3 rounded-lg transition-all duration-200 group hover:bg-secondary/50",
                isActive ? "font-bold" : "font-normal"
              )}>
                {item.isProfile ? (
                  <Avatar className="w-6 h-6 border border-border/50">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>ME</AvatarFallback>
                  </Avatar>
                ) : (
                  <item.icon className={cn(
                    "w-6 h-6 transition-transform group-hover:scale-105",
                    isActive ? "stroke-[3px]" : "stroke-[2px]"
                  )} />
                )}
                <span className="hidden xl:block text-sm">{item.label}</span>
              </a>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border/40 mt-auto">
        <Button variant="ghost" className="w-full justify-start gap-4 px-3 hover:bg-secondary/50">
          <Menu className="w-6 h-6" />
          <span className="hidden xl:block text-sm font-normal">More</span>
        </Button>
      </div>
    </div>
  );

  const RightSidebar = () => (
    <div className="w-80 pl-10 pr-8 py-8 hidden lg:block">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Avatar className="w-11 h-11 border border-border/50">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <div className="font-bold">{currentUser.id}</div>
            <div className="text-muted-foreground">{currentUser.name}</div>
          </div>
        </div>
        <button className="text-xs font-bold text-primary hover:text-primary/80" onClick={(e) => handlePlaceholderClick(e, "Switch Account")}>Switch</button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-muted-foreground">Suggested for you</span>
        <button className="text-xs font-bold text-foreground hover:opacity-70" onClick={(e) => handlePlaceholderClick(e, "See All")}>See All</button>
      </div>

      <div className="space-y-4">
        {Object.values(users).filter(u => u.id !== currentUser.id).map(user => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9 border border-border/50">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="text-xs">
                <div className="font-bold hover:underline cursor-pointer">{user.id}</div>
                <div className="text-muted-foreground truncate w-28">Suggested for you</div>
              </div>
            </div>
            <button className="text-xs font-bold text-primary hover:text-primary/80" onClick={(e) => handlePlaceholderClick(e, "Follow")}>Follow</button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-xs text-muted-foreground space-y-4">
        <p className="leading-relaxed opacity-60">
          About • Help • Press • API • Jobs • Privacy • Terms • Locations • Language • Meta Verified
        </p>
        <p className="opacity-60 uppercase">© 2025 CAMPUSCONNECT FROM META</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex font-sans">
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden md:block border-r border-border/40 sticky top-0 h-screen z-30 transition-all duration-300 bg-background",
        isSearchOpen ? "w-20 xl:w-20" : "w-20 xl:w-64"
      )}>
        <div className={cn("flex flex-col h-full", isSearchOpen && "items-center")}>
          <div className="p-6 pb-8 w-full">
            {isSearchOpen ? (
              <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center mx-auto">
                <Search className="w-5 h-5" />
              </div>
            ) : (
              <>
                <h1 className="font-serif text-xl font-bold tracking-tight hidden xl:block pl-2">CampusConnect</h1>
                <h1 className="font-serif text-xl font-bold tracking-tight xl:hidden text-center">CC</h1>
              </>
            )}
          </div>

          <nav className="flex-1 px-3 space-y-2 w-full">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.label} href={item.href} onClick={item.onClick}>
                  <a className={cn(
                    "flex items-center gap-4 p-3 rounded-lg transition-all duration-200 group hover:bg-secondary/50",
                    isActive ? "font-bold" : "font-normal",
                    isSearchOpen && "justify-center px-0"
                  )}>
                    {item.isProfile ? (
                      <Avatar className="w-6 h-6 border border-border/50">
                        <AvatarImage src={currentUser.avatar} />
                        <AvatarFallback>ME</AvatarFallback>
                      </Avatar>
                    ) : (
                      <item.icon className={cn(
                        "w-6 h-6 transition-transform group-hover:scale-105",
                        isActive ? "stroke-[3px]" : "stroke-[2px]"
                      )} />
                    )}
                    {!isSearchOpen && <span className="hidden xl:block text-sm">{item.label}</span>}
                  </a>
                </Link>
              );
            })}
          </nav>

          <div className="p-3 mt-auto w-full">
            <Button variant="ghost" className={cn("w-full gap-4 px-3 hover:bg-secondary/50", isSearchOpen ? "justify-center" : "justify-start")}>
              <Menu className="w-6 h-6" />
              {!isSearchOpen && <span className="hidden xl:block text-sm font-normal">More</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Search Slide-out Panel */}
      {isSearchOpen && (
        <div className="hidden md:block w-96 border-r border-border/40 bg-background h-screen sticky top-0 z-20 animate-in slide-in-from-left-10 duration-300 shadow-2xl">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-8">Search</h2>
            <div className="relative mb-6">
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-secondary/50 border-none focus-visible:ring-0 rounded-lg h-10 pl-4"
              />
              {searchQuery ? (
                <div
                  className="absolute right-3 top-2.5 w-4 h-4 bg-muted-foreground/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-muted-foreground/40"
                  onClick={() => setSearchQuery("")}
                >
                  <span className="text-[10px] text-muted-foreground">x</span>
                </div>
              ) : (
                <div className="absolute right-3 top-2.5 w-4 h-4 bg-muted-foreground/20 rounded-full flex items-center justify-center">
                  <span className="text-[10px] text-muted-foreground">x</span>
                </div>
              )}
            </div>
            <div className="border-t border-border/40 pt-4 h-[calc(100vh-200px)] overflow-y-auto">
              {!searchQuery ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold">Recent</span>
                    <button className="text-sm text-primary hover:text-primary/80 font-bold">Clear all</button>
                  </div>
                  <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                    <span className="text-sm">No recent searches.</span>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  {filteredResults.users.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-muted-foreground uppercase mb-3 tracking-wide">People</h3>
                      <div className="space-y-3">
                        {filteredResults.users.map(user => (
                          <div key={user.id} className="flex items-center gap-3 cursor-pointer hover:bg-secondary/30 p-2 rounded-lg transition-colors">
                            <Avatar className="w-10 h-10 border border-border/50">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-bold text-sm">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.bio}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredResults.questions.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-muted-foreground uppercase mb-3 tracking-wide">Discussions</h3>
                      <div className="space-y-3">
                        {filteredResults.questions.map(q => (
                          <div key={q.id} className="flex flex-col gap-1 cursor-pointer hover:bg-secondary/30 p-2 rounded-lg transition-colors">
                            <div className="font-bold text-sm truncate">{q.title}</div>
                            <div className="text-xs text-muted-foreground truncate">{q.content}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredResults.users.length === 0 && filteredResults.questions.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground text-sm">
                      No results found.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-background border-b border-border z-40 flex items-center justify-between px-4">
        <h1 className="font-serif text-xl font-bold">CampusConnect</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input placeholder="Search" className="h-8 w-40 bg-secondary/50 border-none" />
            <Search className="w-3 h-3 absolute right-3 top-2.5 text-muted-foreground" />
          </div>
          <Heart className="w-6 h-6" />
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-12 bg-background border-t border-border z-40 flex items-center justify-around px-4 pb-safe">
        {navItems.filter(i => i.label !== "Search" && i.label !== "Notifications" && i.label !== "Create").map((item) => (
          <Link key={item.label} href={item.href}>
            <a className={cn("p-2", location === item.href ? "text-primary" : "text-foreground")}>
              {item.isProfile ? (
                <Avatar className="w-6 h-6 border border-border/50">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              ) : (
                <item.icon className={cn("w-6 h-6", location === item.href ? "fill-primary" : "")} />
              )}
            </a>
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 flex justify-center bg-background">
        <div className={cn("w-full max-w-[630px] pt-20 md:pt-0 min-h-screen transition-all duration-300", isSearchOpen && "opacity-50 pointer-events-none")}>
          {children}
        </div>
      </main>

      {/* Right Sidebar (Desktop Only) */}
      {!isSearchOpen && <RightSidebar />}

      <CreatePostDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </div>
  );
}

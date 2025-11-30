"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, User, Users, Bell, Search, Compass, PlusSquare, Menu, Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useMemo } from "react";
import { currentUser, users, questions } from "@/lib/campusQueryConnect/mock-data";
import { UserBadge } from "./user-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { CreatePostDialog } from "./create-post-dialog";
import { toast } from "sonner";
import AnimatedBackground from "@/components/AnimatedBackground";

import { useCurrentUser } from "@/lib/campusQueryConnect/use-current-user";
import { useCreatePostModal } from "@/lib/campusQueryConnect/use-create-post-modal";

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const createPostModal = useCreatePostModal();
  const { user: currentUser, isLoading } = useCurrentUser();

  const handlePlaceholderClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    toast("Coming Soon", {
      description: `${label} feature is under development.`,
    });
  };

  const navItems = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Explore", icon: Compass, href: "/campusQueryConnect" },
    { label: "Create", icon: PlusSquare, href: "#", onClick: createPostModal.onOpen },
    { label: "Profile", icon: User, href: currentUser ? `/campusQueryConnect/profile/${currentUser.id}` : "#", isProfile: true },
  ];

  // if (isLoading || !currentUser) return null; // Removed blocking loading state for better perceived performance

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-background border-r border-border/40">
      <div className="p-6 pb-8">
        <h1 className="font-serif text-xl font-bold tracking-tight hidden xl:block">CampusConnect</h1>
        <h1 className="font-serif text-xl font-bold tracking-tight xl:hidden text-center">CC</h1>
      </div>

      <nav className="flex-1 px-3 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.label} href={item.href} onClick={item.onClick} className={cn(
              "flex items-center gap-4 p-3 rounded-lg transition-all duration-200 group hover:bg-secondary/50",
              isActive ? "font-bold" : "font-normal"
            )}>
              {item.isProfile ? (
                <Avatar className="w-6 h-6 border border-border/50">
                  <AvatarImage src={currentUser?.avatar} />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              ) : (
                <item.icon className={cn(
                  "w-6 h-6 transition-transform group-hover:scale-105",
                  isActive ? "stroke-[3px]" : "stroke-[2px]"
                )} />
              )}
              <span className="hidden xl:block text-sm">{item.label}</span>
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
            <AvatarImage src={currentUser?.avatar} />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <div className="font-bold">{currentUser?.id || "Guest"}</div>
            <div className="text-muted-foreground">{currentUser?.name || "Please login"}</div>
          </div>
        </div>
        <button className="text-xs font-bold text-primary hover:text-primary/80" onClick={(e) => handlePlaceholderClick(e, "Switch Account")}>Switch</button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-muted-foreground">Suggested for you</span>
        <button className="text-xs font-bold text-foreground hover:opacity-70" onClick={(e) => handlePlaceholderClick(e, "See All")}>See All</button>
      </div>

      <div className="space-y-4">
        {Object.values(users).filter(u => u.id !== currentUser?.id).map(user => (
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
    <div className="min-h-screen bg-transparent text-foreground flex font-sans relative">
      <AnimatedBackground />
      {/* Desktop Sidebar */}
      <aside className="hidden md:block border-r border-border/40 sticky top-0 h-screen z-30 transition-all duration-300 bg-background/40 backdrop-blur-xl w-20 xl:w-64">
        <div className="flex flex-col h-full">
          <div className="p-6 pb-8 w-full">
            <h1 className="font-serif text-xl font-bold tracking-tight hidden xl:block pl-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">CampusConnect</h1>
            <h1 className="font-serif text-xl font-bold tracking-tight xl:hidden text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">CC</h1>
          </div>

          <nav className="flex-1 px-3 space-y-2 w-full">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.label} href={item.href} onClick={item.onClick} legacyBehavior>
                  <a className={cn(
                    "flex items-center gap-4 p-3 rounded-lg transition-all duration-200 group hover:bg-secondary/50",
                    isActive ? "font-bold bg-secondary/50" : "font-normal"
                  )}>
                    {item.isProfile ? (
                      <Avatar className="w-6 h-6 border border-border/50">
                        <AvatarImage src={currentUser?.avatar} />
                        <AvatarFallback>ME</AvatarFallback>
                      </Avatar>
                    ) : (
                      <item.icon className={cn(
                        "w-6 h-6 transition-transform group-hover:scale-105",
                        isActive ? "stroke-[3px] text-purple-600" : "stroke-[2px] text-muted-foreground group-hover:text-purple-600"
                      )} />
                    )}
                    <span className="hidden xl:block text-sm">{item.label}</span>
                  </a>
                </Link>
              );
            })}
          </nav>

          <div className="p-3 mt-auto w-full">
            <Button variant="ghost" className="w-full gap-4 px-3 hover:bg-secondary/50 justify-start">
              <Menu className="w-6 h-6 text-muted-foreground group-hover:text-purple-600" />
              <span className="hidden xl:block text-sm font-normal">More</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-background/80 backdrop-blur-xl border-b border-border z-40 flex items-center justify-between px-4">
        <h1 className="font-serif text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">CampusConnect</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input placeholder="Search" className="h-8 w-40 bg-secondary/50 border-none" />
            <Search className="w-3 h-3 absolute right-3 top-2.5 text-muted-foreground" />
          </div>
          <Heart className="w-6 h-6" />
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-12 bg-background/80 backdrop-blur-xl border-t border-border z-40 flex items-center justify-around px-4 pb-safe">
        {navItems.filter(i => i.label !== "Search" && i.label !== "Notifications" && i.label !== "Create").map((item) => (
          <Link key={item.label} href={item.href} className={cn("p-2", pathname === item.href ? "text-primary" : "text-foreground")}>
            {item.isProfile ? (
              <Avatar className="w-6 h-6 border border-border/50">
                <AvatarImage src={currentUser?.avatar} />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
            ) : (
              <item.icon className={cn("w-6 h-6", pathname === item.href ? "fill-primary" : "")} />
            )}
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 flex justify-center bg-transparent relative z-10">
        <div className="w-full max-w-[630px] pt-20 md:pt-0 min-h-screen transition-all duration-300">
          {children}
        </div>
      </main>

      {/* Right Sidebar (Desktop Only) */}
      <div className="w-80 pl-10 pr-8 py-8 hidden lg:block bg-background/40 backdrop-blur-xl border-l border-border/40 sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="w-11 h-11 border border-border/50">
              <AvatarImage src={currentUser?.avatar} />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-bold">{currentUser?.id || "Guest"}</div>
              <div className="text-muted-foreground">{currentUser?.name || "Please login"}</div>
            </div>
          </div>
          <button className="text-xs font-bold text-primary hover:text-primary/80" onClick={(e) => handlePlaceholderClick(e, "Switch Account")}>Switch</button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-muted-foreground">Suggested for you</span>
          <button className="text-xs font-bold text-foreground hover:opacity-70" onClick={(e) => handlePlaceholderClick(e, "See All")}>See All</button>
        </div>

        <div className="space-y-4">
          {Object.values(users).filter(u => u.id !== currentUser?.id).map(user => (
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

      <CreatePostDialog open={createPostModal.isOpen} onOpenChange={(open) => open ? createPostModal.onOpen() : createPostModal.onClose()} />
    </div>
  );
}

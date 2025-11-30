"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, MessageSquare } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending, refetch, clearSession } = useSession();
  const router = useRouter();
  const pathname = usePathname();



  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About Us" },
    { href: "/collegePGFinder", label: "PG Finder" },
    { href: "/campusQueryConnect", label: "Q&A Community" },
    { href: "/resources", label: "Resources" },
    { href: "#contact", label: "Contact" },
  ];

  const handleSignOut = async () => {
    const token = localStorage.getItem("bearer_token");
    const { error } = await authClient.signOut({
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    if (error?.code) {
      toast.error("Failed to sign out");
    } else {
      localStorage.removeItem("bearer_token");
      // refetch(); // Instead of refetching, we clear the session immediately
      clearSession();
      toast.success("Signed out successfully");
      router.push("/");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                CB
              </div>
              <span className="ml-3 text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Campus Buddy
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className="text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* CTA Button & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {isPending ? (
              <div className="h-9 w-20 animate-pulse bg-accent rounded-md" />
            ) : session?.user ? (
              <div className="flex items-center gap-4">
                <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all">
                  <Link href={`/campusQueryConnect/profile/${session.user.id}`}>
                    My Profile
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white font-semibold">
                          {session.user.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{session.user.name}</p>
                        <p className="text-xs text-muted-foreground">{session.user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/campusQueryConnect/profile/${session.user.id}`} className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/campusQueryConnect" className="cursor-pointer">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Q&A Community
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                {pathname !== "/login" && (
                  <Button variant="ghost" asChild>
                    <Link href="/login">
                      Login
                    </Link>
                  </Button>
                )}
                {pathname !== "/register" && (
                  <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all">
                    <Link href="/register">
                      Sign Up
                    </Link>
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-foreground/80 hover:text-foreground hover:bg-accent/50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
                {session?.user ? (
                  <>
                    <div className="px-3 py-2 text-sm text-muted-foreground border-t border-border/40 mt-2 pt-4">
                      <p className="font-medium text-foreground">{session.user.name}</p>
                      <p className="text-xs">{session.user.email}</p>
                    </div>
                    <Link href={`/campusQueryConnect/profile/${session.user.id}`}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                      </Button>
                    </Link>
                    <Link href="/campusQueryConnect">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Q&A Community
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600"
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    {pathname !== "/login" && (
                      <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() => setIsMenuOpen(false)}
                        asChild
                      >
                        <Link href="/login">
                          Login
                        </Link>
                      </Button>
                    )}
                    {pathname !== "/register" && (
                      <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        onClick={() => setIsMenuOpen(false)}
                        asChild
                      >
                        <Link href="/register">
                          Sign Up
                        </Link>
                      </Button>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header >
  );
}
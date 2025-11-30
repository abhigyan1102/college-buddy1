import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MapPin, Search, Menu, X, User, LogOut } from "lucide-react";

interface HeaderProps {
  isLoggedIn?: boolean;
  userName?: string;
  onLogin?: (email: string, password: string) => void;
  onSignup?: (name: string, email: string, password: string) => void;
  onLogout?: () => void;
}

export default function Header({
  isLoggedIn = false,
  userName = "",
  onLogin,
  onSignup,
  onLogout,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [authOpen, setAuthOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin?.(loginEmail, loginPassword);
    setAuthOpen(false);
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup?.(signupName, signupEmail, signupPassword);
    setAuthOpen(false);
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">PG Finder</span>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search PGs near your college..."
                className="pl-10 w-full"
                data-testid="input-search-header"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{userName}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onLogout}
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Dialog open={authOpen} onOpenChange={setAuthOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setAuthMode("login")}
                    data-testid="button-login"
                  >
                    Log In
                  </Button>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <Button onClick={() => setAuthMode("signup")} data-testid="button-signup">
                    Sign Up
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {authMode === "login" ? "Welcome Back" : "Create Account"}
                    </DialogTitle>
                  </DialogHeader>
                  {authMode === "login" ? (
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="your@email.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          data-testid="input-login-email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="Enter your password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          data-testid="input-login-password"
                        />
                      </div>
                      <Button type="submit" className="w-full" data-testid="button-submit-login">
                        Log In
                      </Button>
                      <p className="text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <button
                          type="button"
                          className="text-primary hover:underline"
                          onClick={() => setAuthMode("signup")}
                          data-testid="button-switch-signup"
                        >
                          Sign up
                        </button>
                      </p>
                    </form>
                  ) : (
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Your full name"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          data-testid="input-signup-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your@email.com"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          data-testid="input-signup-email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Create a password"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          data-testid="input-signup-password"
                        />
                      </div>
                      <Button type="submit" className="w-full" data-testid="button-submit-signup">
                        Create Account
                      </Button>
                      <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <button
                          type="button"
                          className="text-primary hover:underline"
                          onClick={() => setAuthMode("login")}
                          data-testid="button-switch-login"
                        >
                          Log in
                        </button>
                      </p>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search PGs..."
                className="pl-10 w-full"
                data-testid="input-search-mobile"
              />
            </div>
            {isLoggedIn ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{userName}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={onLogout} data-testid="button-logout-mobile">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => { setAuthMode("login"); setAuthOpen(true); }} data-testid="button-login-mobile">
                  Log In
                </Button>
                <Button className="flex-1" onClick={() => { setAuthMode("signup"); setAuthOpen(true); }} data-testid="button-signup-mobile">
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

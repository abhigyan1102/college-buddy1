"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/auth/Input";
import { Button } from "@/components/auth/Button";
import { Logo } from "@/components/auth/Logo";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [vedamId, setVedamId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!vedamId || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      // Assuming Vedam ID is used as email for now or mapped to it.
      // If Vedam ID is not an email, this might fail if the backend expects an email.
      // For this integration, we'll pass it as email.
      const { data, error } = await authClient.signIn.email({
        email: vedamId,
        password: password,
      });

      if (error?.code) {
        setError("Invalid credentials. Please try again.");
        setIsLoading(false);
        return;
      }

      toast.success("Welcome back!");
      router.push("/community");
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-green-200 to-pink-300">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="flex items-center gap-8">
              <a href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
                Home
              </a>
              <a href="/about" className="text-gray-700 hover:text-gray-900 transition-colors">
                About Us
              </a>
              <a href="/community" className="text-gray-700 hover:text-gray-900 transition-colors">
                Community
              </a>
              <a href="/pg-finder" className="text-gray-700 hover:text-gray-900 transition-colors">
                PG Finder
              </a>
              <a href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors">
                Contact
              </a>
              <button
                onClick={() => router.push("/register")}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
                Welcome Back!
              </h1>
              <p className="text-gray-600">Log in to continue your college journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Vedam ID (Email)"
                type="text"
                placeholder="Enter your Vedam ID or Email"
                value={vedamId}
                onChange={(e) => setVedamId(e.target.value)}
                required
                disabled={isLoading}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="/forgot-password" className="text-pink-500 hover:text-pink-600">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" fullWidth disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log In"}
              </Button>

              <div className="text-center">
                <span className="text-gray-600">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => router.push("/register")}
                  className="text-pink-500 hover:text-pink-600"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

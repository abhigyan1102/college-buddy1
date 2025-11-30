"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnimatedBackground from "@/components/AnimatedBackground";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [vedamId, setVedamId] = useState("");
  const [password, setPassword] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [campus, setCampus] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [studentMail, setStudentMail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!fullName || !email || !vedamId || !password || !year) {
      setError("Please fill in all required fields");
      return;
    }

    if (year === "1") {
      if (!branch || !campus || !state || !city) {
        setError("Please fill in all first-year required fields");
        return;
      }
    } else {
      if (!studentMail) {
        setError("Please provide your student email");
        return;
      }
    }

    setIsLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        email: email,
        name: fullName,
        password: password,
        // Note: Extra fields like vedamId, year, etc. are not currently supported by the schema
        // and thus not passed to the backend. They are collected in the UI as requested.
      });

      if (error?.code) {
        if (error.code === "USER_ALREADY_EXISTS") {
          setError("User already registered. Please sign in instead.");
        } else {
          setError("Registration failed. Please try again.");
        }
        setIsLoading(false);
        return;
      }

      toast.success("Account created successfully! You can now sign in.");
      router.push("/login?registered=true");
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <AnimatedBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl relative z-10"
      >
        <Card className="p-8 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border-border/50 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Join Campus Buddy
            </h1>
            <p className="text-muted-foreground">Your companion for college life starts here</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Full Name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="bg-background/50 border-border/50 focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Email</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/50 border-border/50 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Vedam ID</label>
                <Input
                  type="text"
                  placeholder="VED12345"
                  value={vedamId}
                  onChange={(e) => setVedamId(e.target.value)}
                  required
                  className="bg-background/50 border-border/50 focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Password</label>
                <Input
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background/50 border-border/50 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Year</label>
              <Select value={year} onValueChange={setYear} required>
                <SelectTrigger className="bg-background/50 border-border/50 focus:border-purple-500">
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                  <SelectItem value="4">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Conditional Fields for Year 1 */}
            {year === "1" && (
              <div className="pt-4 border-t border-border/50">
                <h3 className="text-foreground font-medium mb-4">First Year Information</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">Branch</label>
                      <Input
                        type="text"
                        placeholder="Computer Science"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        required
                        className="bg-background/50 border-border/50 focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">Campus</label>
                      <Select value={campus} onValueChange={setCampus} required>
                        <SelectTrigger className="bg-background/50 border-border/50 focus:border-purple-500">
                          <SelectValue placeholder="Select campus" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pune">Pune</SelectItem>
                          <SelectItem value="Bangalore">Bangalore</SelectItem>
                          <SelectItem value="Delhi">Delhi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">State</label>
                      <Select value={state} onValueChange={setState} required>
                        <SelectTrigger className="bg-background/50 border-border/50 focus:border-purple-500">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                          <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                          <SelectItem value="Arunachal Pradesh">Arunachal Pradesh</SelectItem>
                          <SelectItem value="Assam">Assam</SelectItem>
                          <SelectItem value="Bihar">Bihar</SelectItem>
                          <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
                          <SelectItem value="Goa">Goa</SelectItem>
                          <SelectItem value="Gujarat">Gujarat</SelectItem>
                          <SelectItem value="Haryana">Haryana</SelectItem>
                          <SelectItem value="Himachal Pradesh">Himachal Pradesh</SelectItem>
                          <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                          <SelectItem value="Karnataka">Karnataka</SelectItem>
                          <SelectItem value="Kerala">Kerala</SelectItem>
                          <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                          <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="Manipur">Manipur</SelectItem>
                          <SelectItem value="Meghalaya">Meghalaya</SelectItem>
                          <SelectItem value="Mizoram">Mizoram</SelectItem>
                          <SelectItem value="Nagaland">Nagaland</SelectItem>
                          <SelectItem value="Odisha">Odisha</SelectItem>
                          <SelectItem value="Punjab">Punjab</SelectItem>
                          <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                          <SelectItem value="Sikkim">Sikkim</SelectItem>
                          <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                          <SelectItem value="Telangana">Telangana</SelectItem>
                          <SelectItem value="Tripura">Tripura</SelectItem>
                          <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                          <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                          <SelectItem value="West Bengal">West Bengal</SelectItem>
                          <SelectItem value="Delhi (NCT)">Delhi (NCT)</SelectItem>
                          <SelectItem value="Jammu & Kashmir">Jammu &amp; Kashmir</SelectItem>
                          <SelectItem value="Ladakh">Ladakh</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none">City</label>
                      <Input
                        type="text"
                        placeholder="Your city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="bg-background/50 border-border/50 focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Conditional Field for Year != 1 */}
            {year && year !== "1" && (
              <div className="pt-4 border-t border-border/50">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">Student Email</label>
                  <Input
                    type="email"
                    placeholder="john.doe@student.university.edu"
                    value={studentMail}
                    onChange={(e) => setStudentMail(e.target.value)}
                    required
                    className="bg-background/50 border-border/50 focus:border-purple-500"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="pt-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-1 rounded border-border text-purple-600 focus:ring-purple-500"
                  required
                />
                <span className="text-sm text-muted-foreground">
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link
                href="/login"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Log in
              </Link>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}

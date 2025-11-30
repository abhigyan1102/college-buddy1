"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnimatedBackground from "@/components/AnimatedBackground";
import AnimatedCounter from "@/components/AnimatedCounter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Users,
  GraduationCap,
  Award,
  BookOpen,
  MessageSquare,
  Calendar,
  Home as HomeIcon,
  MapPin,
  IndianRupee,
  Search,
  TrendingUp,
  Heart,
  Star,
  ArrowRight,
  HelpCircle,
  UserPlus,
  Shield,
} from "lucide-react";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true, margin: "-100px" },
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30"
            >
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Companion for College Life
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent leading-tight">
              Navigate College Life with COLLEGE BUDDY
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Got questions after admission? Connect with fellow students, find answers to your doubts, and discover the perfect accommodation - all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                variant="outline"
                className="border-2 hover:bg-accent/50 text-base px-8"
                asChild
              >
                <Link href="#pg-finder">
                  Find Accommodation
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            >
              {[
                { label: "Students Helped", value: 10000, suffix: "+" },
                { label: "Questions Answered", value: 5000, suffix: "+" },
                { label: "PG Options", value: 150, suffix: "+" },
                { label: "Active Today", value: 500, suffix: "+" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative group"
                >
                  <Card className="p-6 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border-border/50 hover:border-purple-500/50 transition-all hover:shadow-xl">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              About Campus Buddy
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We understand the challenges students face after getting college admission. Campus Buddy is here to help you navigate every step of your college journey.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: HelpCircle,
                title: "Ask & Answer",
                description: "Get instant answers to your college doubts from fellow students and seniors who've been there.",
              },
              {
                icon: UserPlus,
                title: "Connect with Peers",
                description: "Build your college network, make friends, and learn from experienced seniors.",
              },
              {
                icon: Shield,
                title: "Safe & Supportive",
                description: "Anonymous posting option available. Our community is moderated to ensure helpful, respectful discussions.",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-8 h-full bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border-border/50 hover:border-purple-500/50 transition-all hover:shadow-xl group">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="relative py-20 md:py-32 bg-gradient-to-br from-purple-950/10 via-transparent to-pink-950/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Q&A Community for Students
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Got questions after admission? Ask away! From hostel queries to course selection, placements to campus life - get answers from those who know best.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: MessageSquare,
                title: "Post Questions",
                description: "Ask anything - anonymously or with your account. Get helpful answers from peers.",
                color: "from-purple-600 to-purple-700",
              },
              {
                icon: BookOpen,
                title: "Share Knowledge",
                description: "Help fellow students by answering their questions. Build your reputation.",
                color: "from-pink-600 to-pink-700",
              },
              {
                icon: Users,
                title: "After Admission Doubts",
                description: "Hostel facilities, mess food, course selection, placements - ask everything!",
                color: "from-orange-600 to-orange-700",
              },
              {
                icon: Calendar,
                title: "Campus Life Queries",
                description: "Events, clubs, sports, exams - learn about college life from seniors.",
                color: "from-blue-600 to-blue-700",
              },
              {
                icon: TrendingUp,
                title: "Career Guidance",
                description: "Get insights on internships, placements, higher studies, and career paths.",
                color: "from-green-600 to-green-700",
              },
              {
                icon: Heart,
                title: "Supportive Community",
                description: "Friendly environment where every question matters and everyone helps.",
                color: "from-red-600 to-red-700",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 h-full bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border-border/50 hover:border-purple-500/50 transition-all hover:shadow-xl group cursor-pointer">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeInUp} className="text-center">
            <Link href="/campusQueryConnect">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transition-all text-base px-12 group"
              >
                Join Q&A Community
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PG Finder Section */}
      <section id="pg-finder" className="relative py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              PG Accommodation Finder
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Find the perfect place to stay near your college. Verified listings with honest reviews from students.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto mb-12">
            <Card className="p-6 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border-border/50">
              <div className="flex justify-center">
                <Link href="/collegePGFinder">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg">
                    <Search className="w-5 h-5 mr-2" />
                    Search PGs
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* PG Listings */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                name: "Stanza Living",
                location: "0.5 km from campus",
                price: "₹8,000",
                students: 24,
                rating: 4.5,
                amenities: ["WiFi", "Meals", "AC"],
                image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800&auto=format&fit=crop",
              },
              {
                name: "Your Space",
                location: "0.8 km from campus",
                price: "₹7,500",
                students: 18,
                rating: 4.2,
                amenities: ["WiFi", "Laundry"],
                image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
              },
              {
                name: "Zolo Stays",
                location: "1.2 km from campus",
                price: "₹6,500",
                students: 32,
                rating: 4.0,
                amenities: ["WiFi", "Meals"],
                image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
              },
            ].map((pg, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="overflow-hidden bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border-border/50 hover:border-purple-500/50 transition-all hover:shadow-xl group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={pg.image}
                      alt={pg.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white text-sm font-medium">{pg.rating}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{pg.name}</h3>
                    <div className="flex items-center text-muted-foreground text-sm mb-3">
                      <MapPin className="w-4 h-4 mr-1 text-purple-500" />
                      {pg.location}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <IndianRupee className="w-5 h-5 text-green-600" />
                        <span className="text-2xl font-bold text-green-600">{pg.price}</span>
                        <span className="text-muted-foreground text-sm ml-1">/month</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-1 text-purple-500" />
                        {pg.students} students
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pg.amenities.map((amenity, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-purple-600/10 text-purple-600 rounded-full text-xs font-medium"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                      View Details
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeInUp} className="text-center mt-12">
            <Link href="/collegePGFinder">
              <Button
                size="lg"
                variant="outline"
                className="border-2 hover:bg-accent/50 text-base px-12"
              >
                View All PG Options
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
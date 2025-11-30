"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About Us" },
    { href: "/campusQueryConnect", label: "Q&A Community" },
    { href: "/collegePGFinder", label: "PG Finder" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-purple-950/20 via-background to-pink-950/20 border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                CB
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Campus Buddy
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your companion for college life - helping students navigate academics, find accommodation, and connect with peers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-muted-foreground hover:text-foreground transition-colors"
                    asChild
                  >
                    <Link href={link.href}>
                      {link.label}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-muted-foreground hover:text-purple-500 transition-colors cursor-pointer">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-purple-500" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Ajeenkya+DY+Patil+University"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ajeenkya DY Patil University
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-purple-500 transition-colors cursor-pointer">
                <Mail className="w-5 h-5 flex-shrink-0 text-purple-500" />
                <a href="mailto:support@campusbuddy.com">support@campusbuddy.com</a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 hover:from-purple-600 hover:to-pink-600 flex items-center justify-center text-foreground hover:text-white transition-all shadow-md hover:shadow-lg"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <div className="pt-4">
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                <Link href="/campusQueryConnect">
                  Join Community
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Campus Buddy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
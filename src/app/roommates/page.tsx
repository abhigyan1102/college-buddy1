"use client";

import RoommateCard from "@/components/RoommateCard";
import { Button } from "@/components/auth/Button";
import { Filter } from "lucide-react";

const roommates = [
    {
        id: 1,
        name: "Rahul Sharma",
        branch: "CSE",
        year: "2nd Year",
        bio: "Night owl, loves coding and gaming. Looking for a chill roommate who keeps the room clean.",
        tags: ["Night Owl", "Gamer", "Non-Smoker", "Coder"],
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        matchPercentage: 95,
    },
    {
        id: 2,
        name: "Priya Patel",
        branch: "ECE",
        year: "1st Year",
        bio: "Early bird, fitness enthusiast. I play guitar and love reading.",
        tags: ["Early Bird", "Musician", "Fitness", "Vegetarian"],
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        matchPercentage: 88,
    },
    {
        id: 3,
        name: "Amit Singh",
        branch: "Mechanical",
        year: "3rd Year",
        bio: "Formula 1 fan, loves tinkering with machines. Need a roommate who doesn't mind late night study sessions.",
        tags: ["Night Owl", "F1 Fan", "Studious", "Non-Smoker"],
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        matchPercentage: 82,
    },
    {
        id: 4,
        name: "Sneha Gupta",
        branch: "Biotech",
        year: "2nd Year",
        bio: "Artist and plant mom. Looking for a friendly roommate to share a flat with.",
        tags: ["Artist", "Plant Lover", "Pet Friendly", "Social"],
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        matchPercentage: 90,
    },
    {
        id: 5,
        name: "Vikram Malhotra",
        branch: "Civil",
        year: "4th Year",
        bio: "Guitarist in the college band. Chill vibes only.",
        tags: ["Musician", "Chill", "Party", "Non-Vegetarian"],
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        matchPercentage: 75,
    },
    {
        id: 6,
        name: "Ananya Roy",
        branch: "CSE",
        year: "1st Year",
        bio: "Tech enthusiast, loves hackathons. Looking for a coding buddy roommate.",
        tags: ["Coder", "Hackathons", "Early Bird", "Studious"],
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
        matchPercentage: 92,
    },
];

export default function RoommatesPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Find Your Roommate</h1>
                    <p className="text-gray-400">Connect with students who match your vibe.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" className="glass text-white border-white/20 hover:bg-white/10">
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                    </Button>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
                        Create Profile
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roommates.map((roommate) => (
                    <RoommateCard key={roommate.id} roommate={roommate} />
                ))}
            </div>
        </div>
    );
}

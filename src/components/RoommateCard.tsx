"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/auth/Button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, UserPlus } from "lucide-react";

interface RoommateProps {
    name: string;
    branch: string;
    year: string;
    bio: string;
    tags: string[];
    image: string;
    matchPercentage: number;
}

export default function RoommateCard({ roommate }: { roommate: RoommateProps }) {
    return (
        <Card className="overflow-hidden group relative border-0 bg-white/5 hover:bg-white/10 transition-all duration-300">
            <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/50 backdrop-blur-md">
                    {roommate.matchPercentage}% Match
                </Badge>
            </div>

            <div className="p-6 flex flex-col items-center text-center relative">
                <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                    <Avatar className="w-24 h-24 border-2 border-white/20 relative">
                        <AvatarImage src={roommate.image} alt={roommate.name} />
                        <AvatarFallback>{roommate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{roommate.name}</h3>
                <p className="text-purple-400 text-sm font-medium mb-3">{roommate.branch} • {roommate.year}</p>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{roommate.bio}</p>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {roommate.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-white/10 text-gray-300 bg-white/5 hover:bg-white/10">
                            {tag}
                        </Badge>
                    ))}
                </div>

                <div className="flex gap-3 w-full">
                    <Button className="flex-1 bg-white/10 hover:bg-white/20 border border-white/10">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Connect
                    </Button>
                </div>
            </div>
        </Card>
    );
}

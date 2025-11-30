"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/auth/Button";
import { Star, MapPin, Coffee, Utensils, Music } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const spots = [
    {
        id: 1,
        name: "Sharma Ji's Canteen",
        type: "Food",
        rating: 4.8,
        reviews: 120,
        distance: "50m",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Best Maggi", "Chai", "Budget"]
    },
    {
        id: 2,
        name: "The Coffee House",
        type: "Cafe",
        rating: 4.5,
        reviews: 85,
        distance: "200m",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Study Spot", "Wifi", "Cold Coffee"]
    },
    {
        id: 3,
        name: "Burger Point",
        type: "Fast Food",
        rating: 4.2,
        reviews: 60,
        distance: "500m",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Burgers", "Fries", "Open Late"]
    },
    {
        id: 4,
        name: "Campus Garden",
        type: "Hangout",
        rating: 4.9,
        reviews: 200,
        distance: "On Campus",
        image: "https://images.unsplash.com/photo-1558036117-15db5275252b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Nature", "Peaceful", "Group Study"]
    },
    {
        id: 5,
        name: "Pizza Hut",
        type: "Restaurant",
        rating: 4.0,
        reviews: 150,
        distance: "1km",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Pizza", "Party", "AC"]
    },
];

export default function ReviewsPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Food & Hangouts</h1>
                    <p className="text-gray-400">Discover the best places to eat and chill around campus.</p>
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
                    <Star className="w-4 h-4 mr-2" />
                    Write a Review
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {spots.map((spot) => (
                    <Card key={spot.id} className="glass overflow-hidden group hover:bg-white/10 transition-all duration-300 border-0">
                        <div className="h-48 overflow-hidden relative">
                            <img
                                src={spot.image}
                                alt={spot.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-2 right-2">
                                <Badge className="bg-black/60 backdrop-blur-md text-white border-0 flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    {spot.rating}
                                </Badge>
                            </div>
                            <div className="absolute bottom-2 left-2">
                                <Badge variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-0">
                                    {spot.type}
                                </Badge>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-white">{spot.name}</h3>
                            </div>

                            <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {spot.distance}
                                </span>
                                <span>{spot.reviews} Reviews</span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {spot.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs border-white/10 text-gray-400 bg-white/5">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <Button className="w-full bg-white/10 hover:bg-white/20 border border-white/10 group-hover:bg-purple-600 group-hover:border-purple-600 transition-colors">
                                View Details
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

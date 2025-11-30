"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import ThemeToggle from "@/components/collegePGFinder/ThemeToggle";
import StarRating from "@/components/collegePGFinder/StarRating";
import PGCard, { PG } from "@/components/collegePGFinder/PGCard";
import { MapPin, Navigation, Loader2, Phone, Home as HomeIcon } from "lucide-react";
import { toast } from "sonner"; // Using sonner as it's already in the project
import AnimatedBackground from "@/components/AnimatedBackground";

export const pgsNearADYPU: PG[] = [
    {
        id: "1",
        name: "Tapovan Nest Boys Hostel",
        address: "Near ADYPU Campus, Pune",
        distance: "500 m",
        priceMin: 6000,
        priceMax: 8000,
        rating: 4.3,
        reviewCount: 12,
        amenities: ["WiFi", "Meals", "Laundry"],
        gender: "male",
        contact: "+91 98765 43210",
        studentsLiving: 15,
    },
    {
        id: "3",
        name: "Your Space",
        address: "Charholi Budruk, Near ADYPU",
        distance: "1 km",
        priceMin: 6500,
        priceMax: 9000,
        rating: 4.6,
        reviewCount: 36,
        amenities: ["WiFi", "Meals", "Laundry", "Parking", "AC"],
        gender: "unisex",
        contact: "+91 98765 43212",
        studentsLiving: 38,
    },
    {
        id: "2",
        name: "Pride Living",
        address: "Lohegaon, Near ADYPU",
        distance: "800 m",
        priceMin: 7000,
        priceMax: 9500,
        rating: 4.5,
        reviewCount: 12,
        amenities: ["WiFi", "Meals", "AC", "Security"],
        gender: "unisex",
        contact: "+91 98765 43211",
        studentsLiving: 13,
    },
    {
        id: "4",
        name: "Sunrise Boys PG",
        address: "Lohegaon Road, Pune",
        distance: "1.2 km",
        priceMin: 5500,
        priceMax: 7000,
        rating: 4.1,
        reviewCount: 18,
        amenities: ["WiFi", "Meals", "Laundry"],
        gender: "male",
        contact: "+91 98765 43213",
        studentsLiving: 22,
    },
    {
        id: "5",
        name: "Green Valley Girls Hostel",
        address: "Wagholi, Near ADYPU",
        distance: "1.5 km",
        priceMin: 7500,
        priceMax: 10000,
        rating: 4.4,
        reviewCount: 24,
        amenities: ["WiFi", "Meals", "AC", "Security", "Laundry"],
        gender: "female",
        contact: "+91 98765 43214",
        studentsLiving: 29,
    },
    {
        id: "6",
        name: "Campus Edge PG",
        address: "Charholi Khurd, Pune",
        distance: "600 m",
        priceMin: 6000,
        priceMax: 8500,
        rating: 4.2,
        reviewCount: 15,
        amenities: ["WiFi", "Meals", "Parking"],
        gender: "unisex",
        contact: "+91 98765 43215",
        studentsLiving: 17,
    },
    {
        id: "7",
        name: "Student Hub Living",
        address: "Near Airport Road, Lohegaon",
        distance: "2 km",
        priceMin: 5000,
        priceMax: 6500,
        rating: 3.9,
        reviewCount: 10,
        amenities: ["WiFi", "Meals"],
        gender: "male",
        contact: "+91 98765 43216",
        studentsLiving: 9,
    },
    {
        id: "8",
        name: "Comfort Stay Ladies PG",
        address: "Wagholi Main Road, Pune",
        distance: "1.8 km",
        priceMin: 8000,
        priceMax: 11000,
        rating: 4.7,
        reviewCount: 28,
        amenities: ["WiFi", "Meals", "AC", "Security", "Laundry", "Parking"],
        gender: "female",
        contact: "+91 98765 43217",
        studentsLiving: 33,
    },
    {
        id: "9",
        name: "Unity PG Accommodation",
        address: "Near ADYPU Gate 2, Pune",
        distance: "400 m",
        priceMin: 7000,
        priceMax: 9000,
        rating: 4.4,
        reviewCount: 22,
        amenities: ["WiFi", "Meals", "Laundry", "AC"],
        gender: "unisex",
        contact: "+91 98765 43218",
        studentsLiving: 25,
    },
];

export default function CollegePGFinderPage() {
    const router = useRouter();
    const [isDetecting, setIsDetecting] = useState(false);
    const [locationEnabled, setLocationEnabled] = useState(false);
    const [sortBy, setSortBy] = useState("distance");
    const [genderFilter, setGenderFilter] = useState("all");
    const [contactDialogOpen, setContactDialogOpen] = useState(false);
    const [selectedPG, setSelectedPG] = useState<PG | null>(null);

    const handleDetectLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation not supported by your browser");
            return;
        }

        setIsDetecting(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setIsDetecting(false);
                setLocationEnabled(true);
                toast.success("Location detected!", {
                    description: "Showing PGs near Ajeenkya DY Patil University",
                });
            },
            (error) => {
                setIsDetecting(false);
                toast.error("Location access denied", {
                    description: "Please allow location access to find nearby PGs",
                });
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    const handleContactClick = (e: React.MouseEvent, pg: PG) => {
        e.stopPropagation();
        setSelectedPG(pg);
        setContactDialogOpen(true);
    };

    const handleCardClick = (pg: PG) => {
        // For now, we'll just show the contact dialog as we don't have a detail page yet
        // router.push(`/collegePGFinder/${pg.id}`);
        setSelectedPG(pg);
        setContactDialogOpen(true);
    };

    const filteredPGs = pgsNearADYPU.filter((pg) => {
        if (genderFilter === "all") return true;
        return pg.gender === genderFilter;
    });

    const sortedPGs = [...filteredPGs].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.priceMin - b.priceMin;
            case "price-high":
                return b.priceMin - a.priceMin;
            case "rating":
                return b.rating - a.rating;
            default:
                return parseFloat(a.distance) - parseFloat(b.distance);
        }
    });

    return (
        <div className="min-h-screen bg-transparent relative">
            <AnimatedBackground />
            <header className="sticky top-0 z-50 border-b border-border/40 bg-background/40 backdrop-blur-xl shadow-sm">
                <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="h-8 w-8 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                            <HomeIcon className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">PG Finder</span>
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-4 py-6 relative z-10">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">PGs Near Ajeenkya DY Patil University</h1>
                    <p className="text-muted-foreground">Find the best PG accommodations near your campus</p>
                </div>

                {!locationEnabled ? (
                    <Card className="mb-6 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border-border/50 shadow-xl">
                        <CardContent className="p-6 text-center">
                            <MapPin className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                            <h2 className="text-lg font-semibold mb-2">Enable Location</h2>
                            <p className="text-muted-foreground mb-4">
                                Allow location access to see PGs sorted by distance from you
                            </p>
                            <Button onClick={handleDetectLocation} disabled={isDetecting} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                                {isDetecting ? (
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                    <Navigation className="h-4 w-4 mr-2" />
                                )}
                                {isDetecting ? "Detecting..." : "Use My Location"}
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary" className="gap-1 bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 border-purple-200">
                            <MapPin className="h-3 w-3" />
                            Location enabled
                        </Badge>
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <Select value={genderFilter} onValueChange={setGenderFilter}>
                        <SelectTrigger className="w-32 bg-background/50 border-border/50 focus:border-purple-500 backdrop-blur-sm">
                            <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="male">Boys</SelectItem>
                            <SelectItem value="female">Girls</SelectItem>
                            <SelectItem value="unisex">Co-ed</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-40 bg-background/50 border-border/50 focus:border-purple-500 backdrop-blur-sm">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="distance">Distance</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                            <SelectItem value="rating">Rating</SelectItem>
                        </SelectContent>
                    </Select>

                    <span className="text-sm text-muted-foreground ml-auto">
                        {sortedPGs.length} PGs found
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedPGs.map((pg) => (
                        <PGCard
                            key={pg.id}
                            pg={pg}
                            onViewDetails={() => handleCardClick(pg)}
                        />
                    ))}
                </div>
            </main>

            <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
                <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-border/50">
                    <DialogHeader>
                        <DialogTitle className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Contact {selectedPG?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 border border-border/50">
                            <Phone className="h-5 w-5 text-purple-500" />
                            <div>
                                <p className="text-sm text-muted-foreground">Phone Number</p>
                                <p className="font-semibold text-lg">{selectedPG?.contact}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 border border-border/50">
                            <MapPin className="h-5 w-5 text-purple-500" />
                            <div>
                                <p className="text-sm text-muted-foreground">Address</p>
                                <p className="font-medium">{selectedPG?.address}</p>
                            </div>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white" asChild>
                            <a href={`tel:${selectedPG?.contact}`}>
                                <Phone className="h-4 w-4 mr-2" />
                                Call Now
                            </a>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

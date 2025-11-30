import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StarRating from "./StarRating";
import { MapPin, Wifi, UtensilsCrossed, Car, WashingMachine } from "lucide-react";

export interface PG {
    id: string;
    name: string;
    address: string;
    distance: string;
    priceMin: number;
    priceMax: number;
    rating: number;
    reviewCount: number;
    amenities: string[];
    imageUrl?: string; // Made optional to handle missing images
    gender?: "male" | "female" | "unisex";
    studentsLiving?: number; // Added to match usage in Home.tsx
    contact?: string;
}

interface PGCardProps {
    pg: PG;
    onViewDetails?: (pg: PG) => void;
}

const amenityIcons: Record<string, typeof Wifi> = {
    wifi: Wifi,
    meals: UtensilsCrossed,
    parking: Car,
    laundry: WashingMachine,
};

export default function PGCard({ pg, onViewDetails }: PGCardProps) {
    return (
        <Card className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl border-border/50">
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={pg.imageUrl || "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
                    alt={pg.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {pg.gender && (
                    <Badge
                        variant="secondary"
                        className="absolute top-3 left-3 capitalize bg-background/80 backdrop-blur-sm"
                    >
                        {pg.gender}
                    </Badge>
                )}
            </div>
            <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-lg leading-tight line-clamp-1">{pg.name}</h3>
                    <StarRating rating={pg.rating} size="sm" showValue reviewCount={pg.reviewCount} />
                </div>

                <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm line-clamp-1">{pg.address}</span>
                </div>

                <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-medium">
                        {pg.distance} from campus
                    </Badge>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    {pg.amenities.slice(0, 4).map((amenity) => {
                        const Icon = amenityIcons[amenity.toLowerCase()] || Wifi;
                        return (
                            <div
                                key={amenity}
                                className="flex items-center gap-1 text-muted-foreground"
                                title={amenity}
                            >
                                <Icon className="h-4 w-4" />
                            </div>
                        );
                    })}
                </div>

                {pg.studentsLiving && (
                    <div className="flex items-center gap-1 text-sm text-purple-600 font-medium py-2">
                        <span className="flex items-center gap-1">
                            👥 {pg.studentsLiving} students from our college live here
                        </span>
                    </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t">
                    <div>
                        <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            ₹{pg.priceMin.toLocaleString()}
                        </span>
                        {pg.priceMax > pg.priceMin && (
                            <span className="text-muted-foreground">
                                {" "}- ₹{pg.priceMax.toLocaleString()}
                            </span>
                        )}
                        <span className="text-sm text-muted-foreground">/month</span>
                    </div>
                    <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all"
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails?.(pg);
                        }}
                    >
                        View Details
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

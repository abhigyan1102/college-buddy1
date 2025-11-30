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
  imageUrl: string;
  gender?: "male" | "female" | "unisex";
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
    <Card className="overflow-hidden hover-elevate cursor-pointer" data-testid={`card-pg-${pg.id}`}>
      <div className="relative aspect-video overflow-hidden">
        <img
          src={pg.imageUrl}
          alt={pg.name}
          className="w-full h-full object-cover"
        />
        {pg.gender && (
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 capitalize"
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

        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <span className="text-lg font-bold">
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
            onClick={() => onViewDetails?.(pg)}
            data-testid={`button-view-details-${pg.id}`}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

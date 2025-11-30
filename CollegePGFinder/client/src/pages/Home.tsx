import { useState } from "react";
import { useLocation, Link } from "wouter";
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
import ThemeToggle from "@/components/ThemeToggle";
import StarRating from "@/components/StarRating";
import { MapPin, Navigation, Loader2, Wifi, UtensilsCrossed, Car, WashingMachine, Users, Phone, Home as HomeIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PG {
  id: string;
  name: string;
  address: string;
  distance: string;
  priceMin: number;
  priceMax: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  gender: "male" | "female" | "unisex";
  contact: string;
  studentsLiving: number;
}

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
    studentsLiving: 12,
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
    studentsLiving: 12,
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
    studentsLiving: 36,
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
    studentsLiving: 8,
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
    studentsLiving: 20,
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
    studentsLiving: 14,
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
    studentsLiving: 6,
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
    studentsLiving: 16,
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
    studentsLiving: 18,
  },
];

const amenityIcons: Record<string, typeof Wifi> = {
  wifi: Wifi,
  meals: UtensilsCrossed,
  parking: Car,
  laundry: WashingMachine,
};

export default function Home() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isDetecting, setIsDetecting] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [sortBy, setSortBy] = useState("distance");
  const [genderFilter, setGenderFilter] = useState("all");
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedPG, setSelectedPG] = useState<PG | null>(null);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast({ title: "Error", description: "Geolocation not supported by your browser" });
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsDetecting(false);
        setLocationEnabled(true);
        toast({
          title: "Location detected!",
          description: "Showing PGs near Ajeenkya DY Patil University",
        });
      },
      (error) => {
        setIsDetecting(false);
        toast({
          title: "Location access denied",
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
    setLocation(`/pg/${pg.id}`);
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
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 hover-elevate rounded-md px-2 py-1" data-testid="link-logo">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <HomeIcon className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">PG Finder</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">PGs Near Ajeenkya DY Patil University</h1>
          <p className="text-muted-foreground">Find the best PG accommodations near your campus</p>
        </div>

        {!locationEnabled ? (
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-lg font-semibold mb-2">Enable Location</h2>
              <p className="text-muted-foreground mb-4">
                Allow location access to see PGs sorted by distance from you
              </p>
              <Button onClick={handleDetectLocation} disabled={isDetecting} data-testid="button-detect-location">
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
            <Badge variant="secondary" className="gap-1">
              <MapPin className="h-3 w-3" />
              Location enabled
            </Badge>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Select value={genderFilter} onValueChange={setGenderFilter}>
            <SelectTrigger className="w-32" data-testid="select-gender">
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
            <SelectTrigger className="w-40" data-testid="select-sort">
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
            <Card 
              key={pg.id} 
              className="overflow-hidden hover-elevate cursor-pointer" 
              data-testid={`card-pg-${pg.id}`}
              onClick={() => handleCardClick(pg)}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-lg leading-tight">{pg.name}</h3>
                  <Badge variant="outline" className="capitalize shrink-0">{pg.gender}</Badge>
                </div>

                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="text-sm line-clamp-1">{pg.address}</span>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{pg.distance} from campus</Badge>
                  <StarRating rating={pg.rating} size="sm" showValue reviewCount={pg.reviewCount} />
                </div>

                <div className="flex items-center gap-1 text-sm text-primary font-medium">
                  <Users className="h-4 w-4" />
                  <span>{pg.studentsLiving} students live here</span>
                </div>

                <div className="flex items-center gap-3">
                  {pg.amenities.slice(0, 4).map((amenity) => {
                    const Icon = amenityIcons[amenity.toLowerCase()] || Wifi;
                    return (
                      <div key={amenity} className="text-muted-foreground" title={amenity}>
                        <Icon className="h-4 w-4" />
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div>
                    <span className="text-lg font-bold">₹{pg.priceMin.toLocaleString()}</span>
                    {pg.priceMax > pg.priceMin && (
                      <span className="text-muted-foreground"> - ₹{pg.priceMax.toLocaleString()}</span>
                    )}
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    data-testid={`button-contact-${pg.id}`}
                    onClick={(e) => handleContactClick(e, pg)}
                  >
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact {selectedPG?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="font-semibold text-lg">{selectedPG?.contact}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{selectedPG?.address}</p>
              </div>
            </div>
            <Button className="w-full" asChild>
              <a href={`tel:${selectedPG?.contact}`} data-testid="button-call">
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

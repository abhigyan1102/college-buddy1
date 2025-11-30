import { useParams, useLocation, Link } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ThemeToggle from "@/components/ThemeToggle";
import StarRating from "@/components/StarRating";
import { 
  MapPin, 
  Phone, 
  ArrowLeft, 
  Wifi, 
  UtensilsCrossed, 
  Car, 
  WashingMachine, 
  Shield, 
  Wind,
  Users,
  Home as HomeIcon,
  Building,
  Clock,
  CheckCircle2
} from "lucide-react";
import { pgsNearADYPU } from "./Home";

const amenityDetails: Record<string, { icon: typeof Wifi; label: string; description: string }> = {
  wifi: { icon: Wifi, label: "WiFi", description: "High-speed internet connectivity" },
  meals: { icon: UtensilsCrossed, label: "Meals", description: "Breakfast, lunch & dinner included" },
  parking: { icon: Car, label: "Parking", description: "Secure parking space available" },
  laundry: { icon: WashingMachine, label: "Laundry", description: "Washing machine access" },
  security: { icon: Shield, label: "Security", description: "24/7 security with CCTV" },
  ac: { icon: Wind, label: "AC", description: "Air-conditioned rooms" },
};

const pgImages: Record<string, string[]> = {
  "1": [
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
  ],
  "2": [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop",
  ],
  "3": [
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop",
  ],
  "4": [
    "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
  ],
  "5": [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
  ],
  "6": [
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
  ],
  "7": [
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop",
  ],
  "8": [
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
  ],
  "9": [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
  ],
};

const additionalInfo = {
  roomTypes: ["Single Occupancy", "Double Sharing", "Triple Sharing"],
  rules: ["No smoking", "Visitors allowed till 8 PM", "Quiet hours after 10 PM"],
  nearbyPlaces: ["ADYPU Campus - 5 min walk", "Local Market - 10 min walk", "Bus Stop - 2 min walk"],
};

export default function PGDetails() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const pg = pgsNearADYPU.find((p) => p.id === id);

  if (!pg) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">PG Not Found</h2>
          <p className="text-muted-foreground mb-4">The PG you're looking for doesn't exist.</p>
          <Button onClick={() => setLocation("/")}>Go Back Home</Button>
        </Card>
      </div>
    );
  }

  const images = pgImages[pg.id] || pgImages["1"];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setLocation("/")} data-testid="button-back">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Link href="/" className="flex items-center gap-2 hover-elevate rounded-md px-2 py-1" data-testid="link-logo">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <HomeIcon className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">PG Finder</span>
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <img
                  src={images[selectedImage]}
                  alt={pg.name}
                  className="w-full h-full object-cover"
                  data-testid="img-main"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`shrink-0 w-24 h-16 rounded-md overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                    data-testid={`button-thumbnail-${index}`}
                  >
                    <img src={img} alt={`${pg.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{pg.name}</h1>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{pg.address}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">{pg.gender}</Badge>
                  <Badge variant="secondary">{pg.distance} from campus</Badge>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <StarRating rating={pg.rating} size="md" showValue reviewCount={pg.reviewCount} />
                <div className="flex items-center gap-1 text-primary font-medium">
                  <Users className="h-4 w-4" />
                  <span>{pg.studentsLiving} students live here</span>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Facilities & Amenities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {pg.amenities.map((amenity) => {
                    const details = amenityDetails[amenity.toLowerCase()];
                    if (!details) return null;
                    const Icon = details.icon;
                    return (
                      <div key={amenity} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                        <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">{details.label}</p>
                          <p className="text-sm text-muted-foreground">{details.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Room Types Available
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {additionalInfo.roomTypes.map((type) => (
                    <Badge key={type} variant="secondary" className="text-sm py-1.5 px-3">
                      {type}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  House Rules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {additionalInfo.rules.map((rule) => (
                    <li key={rule} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Nearby Places
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {additionalInfo.nearbyPlaces.map((place) => (
                    <li key={place} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      {place}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-4">
                <div className="text-center pb-4 border-b">
                  <p className="text-sm text-muted-foreground mb-1">Monthly Rent</p>
                  <div className="text-3xl font-bold text-primary">
                    ₹{pg.priceMin.toLocaleString()}
                    {pg.priceMax > pg.priceMin && (
                      <span className="text-lg text-muted-foreground"> - ₹{pg.priceMax.toLocaleString()}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">per month</p>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => setContactDialogOpen(true)}
                  data-testid="button-contact"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Owner
                </Button>

                <div className="pt-4 border-t space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{pg.studentsLiving} Students</p>
                      <p className="text-sm text-muted-foreground">Currently living here</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{pg.distance}</p>
                      <p className="text-sm text-muted-foreground">From ADYPU campus</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact {pg.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="font-semibold text-lg">{pg.contact}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{pg.address}</p>
              </div>
            </div>
            <Button className="w-full" asChild>
              <a href={`tel:${pg.contact}`} data-testid="button-call">
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

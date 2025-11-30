import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import StarRating from "./StarRating";
import ReviewCard, { type Review } from "./ReviewCard";
import {
  MapPin,
  Phone,
  Mail,
  Wifi,
  UtensilsCrossed,
  Car,
  WashingMachine,
  Snowflake,
  Tv,
  Shield,
  Droplets,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { PG } from "./PGCard";

interface PGDetailModalProps {
  pg: PG | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLoggedIn?: boolean;
  reviews?: Review[];
  onWriteReview?: (rating: number, text: string) => void;
  onSignupClick?: () => void;
}

const amenityDetails: Record<string, { icon: typeof Wifi; label: string }> = {
  wifi: { icon: Wifi, label: "High-Speed WiFi" },
  meals: { icon: UtensilsCrossed, label: "Meals Included" },
  parking: { icon: Car, label: "Parking Available" },
  laundry: { icon: WashingMachine, label: "Laundry Service" },
  ac: { icon: Snowflake, label: "Air Conditioning" },
  tv: { icon: Tv, label: "TV in Room" },
  security: { icon: Shield, label: "24/7 Security" },
  geyser: { icon: Droplets, label: "Hot Water/Geyser" },
};

export default function PGDetailModal({
  pg,
  open,
  onOpenChange,
  isLoggedIn = false,
  reviews = [],
  onWriteReview,
  onSignupClick,
}: PGDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  if (!pg) return null;

  const images = [
    pg.imageUrl,
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleSubmitReview = () => {
    if (reviewRating > 0 && reviewText.trim()) {
      onWriteReview?.(reviewRating, reviewText);
      setReviewRating(0);
      setReviewText("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={images[currentImageIndex]}
            alt={`${pg.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute left-4 top-1/2 -translate-y-1/2"
            onClick={handlePrevImage}
            data-testid="button-prev-image"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={handleNextImage}
            data-testid="button-next-image"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
          {pg.gender && (
            <Badge className="absolute top-4 left-4 capitalize">{pg.gender}</Badge>
          )}
        </div>

        <div className="p-6">
          <DialogHeader className="text-left mb-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <DialogTitle className="text-2xl mb-2">{pg.name}</DialogTitle>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{pg.address}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">
                  ₹{pg.priceMin.toLocaleString()}
                  {pg.priceMax > pg.priceMin && (
                    <span className="text-muted-foreground text-lg">
                      {" "}- ₹{pg.priceMax.toLocaleString()}
                    </span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">per month</span>
              </div>
            </div>
          </DialogHeader>

          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <StarRating rating={pg.rating} size="lg" showValue reviewCount={pg.reviewCount} />
            <Badge variant="outline">{pg.distance} from campus</Badge>
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="details" data-testid="tab-details">Details</TabsTrigger>
              <TabsTrigger value="reviews" data-testid="tab-reviews">
                Reviews ({pg.reviewCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-4 space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {pg.amenities.map((amenity) => {
                    const detail = amenityDetails[amenity.toLowerCase()] || {
                      icon: Wifi,
                      label: amenity,
                    };
                    const Icon = detail.icon;
                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-2 p-3 rounded-md bg-muted"
                      >
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="text-sm">{detail.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Contact Information</h3>
                <Card>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span>+91 98765 43210</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <span>contact@sunrisepg.com</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="font-semibold mb-3">House Rules</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Gate closing time: 10:00 PM</li>
                  <li>Visitors allowed till 8:00 PM</li>
                  <li>No smoking inside the premises</li>
                  <li>Maintain cleanliness in common areas</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4 space-y-4">
              {isLoggedIn && (
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <h3 className="font-semibold">Write a Review</h3>
                    <div className="space-y-2">
                      <Label>Your Rating</Label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setReviewRating(star)}
                            className="p-1"
                            data-testid={`button-star-${star}`}
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= reviewRating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="review-text">Your Review</Label>
                      <Textarea
                        id="review-text"
                        placeholder="Share your experience at this PG..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows={4}
                        data-testid="textarea-review"
                      />
                    </div>
                    <Button
                      onClick={handleSubmitReview}
                      disabled={reviewRating === 0 || !reviewText.trim()}
                      data-testid="button-submit-review"
                    >
                      Submit Review
                    </Button>
                  </CardContent>
                </Card>
              )}

              {reviews.length > 0 ? (
                <div className="space-y-3">
                  {reviews.map((review, index) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      isBlurred={!isLoggedIn && index > 0}
                      onSignupClick={onSignupClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Star className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No reviews yet. Be the first to review!</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import PGDetailModal from "../PGDetailModal";
import { Button } from "@/components/ui/button";
import type { PG } from "../PGCard";
import type { Review } from "../ReviewCard";

const mockPG: PG = {
  id: "1",
  name: "Sunrise PG for Boys",
  address: "123 College Road, Near Main Gate, Vellore",
  distance: "500m",
  priceMin: 6000,
  priceMax: 9000,
  rating: 4.5,
  reviewCount: 42,
  amenities: ["WiFi", "Meals", "Laundry", "Parking", "AC", "Security"],
  imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
  gender: "male",
};

const mockReviews: Review[] = [
  {
    id: "1",
    userName: "Rahul Sharma",
    rating: 5,
    date: "1 week ago",
    text: "Excellent PG! The rooms are spacious and clean. Food quality is great and the owner is very helpful. Highly recommended for students!",
    helpfulCount: 15,
    verified: true,
  },
  {
    id: "2",
    userName: "Priya Patel",
    rating: 4,
    date: "2 weeks ago",
    text: "Good place to stay. WiFi is fast and consistent. Only issue is the water timing in the morning.",
    helpfulCount: 8,
    verified: true,
  },
];

export default function PGDetailModalExample() {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Button onClick={() => setOpen(true)} data-testid="button-open-modal">
        Open PG Details
      </Button>
      <PGDetailModal
        pg={mockPG}
        open={open}
        onOpenChange={setOpen}
        isLoggedIn={true}
        reviews={mockReviews}
        onWriteReview={(rating, text) => console.log("Review submitted:", rating, text)}
        onSignupClick={() => console.log("Signup clicked")}
      />
    </div>
  );
}

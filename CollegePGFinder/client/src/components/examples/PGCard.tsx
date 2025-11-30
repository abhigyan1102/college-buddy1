import PGCard, { type PG } from "../PGCard";

const mockPG: PG = {
  id: "1",
  name: "Sunrise PG for Boys",
  address: "123 College Road, Near Main Gate",
  distance: "500m",
  priceMin: 6000,
  priceMax: 9000,
  rating: 4.5,
  reviewCount: 42,
  amenities: ["WiFi", "Meals", "Laundry", "Parking"],
  imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
  gender: "male",
};

export default function PGCardExample() {
  return (
    <div className="max-w-sm">
      <PGCard pg={mockPG} onViewDetails={(pg) => console.log("View details:", pg.name)} />
    </div>
  );
}

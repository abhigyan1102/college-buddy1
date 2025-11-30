import ReviewCard, { type Review } from "../ReviewCard";

const mockReview: Review = {
  id: "1",
  userName: "Rahul Sharma",
  rating: 4.5,
  date: "2 weeks ago",
  text: "Great PG with excellent facilities. The food is really good and the rooms are clean. The owner is very helpful and responsive. Highly recommend for students!",
  helpfulCount: 12,
  verified: true,
};

export default function ReviewCardExample() {
  return (
    <div className="space-y-4 max-w-md">
      <ReviewCard
        review={mockReview}
        onHelpful={(id) => console.log("Helpful clicked:", id)}
      />
      <ReviewCard
        review={{ ...mockReview, id: "2" }}
        isBlurred
        onSignupClick={() => console.log("Signup clicked")}
      />
    </div>
  );
}

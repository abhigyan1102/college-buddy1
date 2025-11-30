import StarRating from "../StarRating";

export default function StarRatingExample() {
  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Small with value:</p>
        <StarRating rating={4.5} size="sm" showValue reviewCount={128} />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Medium (default):</p>
        <StarRating rating={3.5} size="md" showValue reviewCount={42} />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Large:</p>
        <StarRating rating={5} size="lg" showValue />
      </div>
    </div>
  );
}

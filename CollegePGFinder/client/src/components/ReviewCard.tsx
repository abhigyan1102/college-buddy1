import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StarRating from "./StarRating";
import { ThumbsUp, Lock } from "lucide-react";

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  text: string;
  helpfulCount: number;
  verified?: boolean;
}

interface ReviewCardProps {
  review: Review;
  isBlurred?: boolean;
  onHelpful?: (reviewId: string) => void;
  onSignupClick?: () => void;
}

export default function ReviewCard({
  review,
  isBlurred = false,
  onHelpful,
  onSignupClick,
}: ReviewCardProps) {
  const initials = review.userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (isBlurred) {
    return (
      <Card className="relative overflow-hidden" data-testid={`card-review-blurred-${review.id}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <Avatar className="h-10 w-10 border">
              <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium">{review.userName}</span>
                {review.verified && (
                  <Badge variant="secondary" className="text-xs">Verified Student</Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={review.rating} size="sm" />
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <p className="text-sm text-muted-foreground blur-sm select-none">
              {review.text}
            </p>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-md">
              <Lock className="h-6 w-6 text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-center">Sign up to read reviews</p>
              <Button size="sm" className="mt-2" onClick={onSignupClick} data-testid="button-signup-to-read">
                Sign Up Free
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid={`card-review-${review.id}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="h-10 w-10 border">
            <AvatarFallback className="bg-muted text-muted-foreground text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium">{review.userName}</span>
              {review.verified && (
                <Badge variant="secondary" className="text-xs">Verified Student</Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={review.rating} size="sm" />
              <span className="text-xs text-muted-foreground">{review.date}</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-foreground mb-3">{review.text}</p>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => onHelpful?.(review.id)}
          data-testid={`button-helpful-${review.id}`}
        >
          <ThumbsUp className="h-4 w-4 mr-1" />
          Helpful ({review.helpfulCount})
        </Button>
      </CardContent>
    </Card>
  );
}

import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
    rating: number;
    maxRating?: number;
    size?: "sm" | "md" | "lg";
    showValue?: boolean;
    reviewCount?: number;
}

export default function StarRating({
    rating,
    maxRating = 5,
    size = "md",
    showValue = false,
    reviewCount,
}: StarRatingProps) {
    const sizeClasses = {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
    };

    const textSizeClasses = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
    };

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < maxRating; i++) {
        if (i < fullStars) {
            stars.push(
                <Star
                    key={i}
                    className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`}
                />
            );
        } else if (i === fullStars && hasHalfStar) {
            stars.push(
                <div key={i} className="relative">
                    <Star className={`${sizeClasses[size]} text-muted-foreground/30`} />
                    <div className="absolute inset-0 overflow-hidden w-1/2">
                        <Star className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} />
                    </div>
                </div>
            );
        } else {
            stars.push(
                <Star
                    key={i}
                    className={`${sizeClasses[size]} text-muted-foreground/30`}
                />
            );
        }
    }

    return (
        <div className="flex items-center gap-1">
            <div className="flex items-center">{stars}</div>
            {showValue && (
                <span className={`${textSizeClasses[size]} font-medium text-foreground`}>
                    {rating.toFixed(1)}
                </span>
            )}
            {reviewCount !== undefined && (
                <span className={`${textSizeClasses[size]} text-muted-foreground`}>
                    ({reviewCount})
                </span>
            )}
        </div>
    );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Search, Loader2 } from "lucide-react";
import heroImage from "@assets/generated_images/college_campus_with_student_housing.png";

interface HeroSectionProps {
  onLocationDetect?: (coords: { lat: number; lng: number }) => void;
  onSearch?: (query: string) => void;
}

export default function HeroSection({ onLocationDetect, onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const handleLocationDetect = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setIsDetecting(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsDetecting(false);
        onLocationDetect?.({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        setIsDetecting(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Please allow location access to find nearby PGs");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable");
            break;
          case error.TIMEOUT:
            setLocationError("Location request timed out");
            break;
          default:
            setLocationError("Unable to detect location");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <MapPin className="h-8 w-8 text-white" />
          <span className="text-white/80 text-lg font-medium">College PG Finder</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Find Your Perfect PG Near Campus
        </h1>
        
        <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
          Discover verified PG accommodations with authentic reviews from fellow students
        </p>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by college name or area..."
              className="pl-12 h-12 text-base bg-white/95 border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-hero-search"
            />
          </div>
          <Button type="submit" size="lg" className="h-12 px-8" data-testid="button-search">
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </form>

        <div className="flex flex-col items-center gap-2">
          <Button
            variant="outline"
            size="lg"
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            onClick={handleLocationDetect}
            disabled={isDetecting}
            data-testid="button-detect-location"
          >
            {isDetecting ? (
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            ) : (
              <Navigation className="h-5 w-5 mr-2" />
            )}
            {isDetecting ? "Detecting..." : "Use My Location"}
          </Button>
          
          {locationError && (
            <p className="text-sm text-red-300" data-testid="text-location-error">
              {locationError}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

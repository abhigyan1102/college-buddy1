import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, ZoomIn, ZoomOut } from "lucide-react";

interface MapMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: "college" | "pg";
  price?: number;
}

interface MapPlaceholderProps {
  markers?: MapMarker[];
  selectedMarkerId?: string;
  onMarkerClick?: (marker: MapMarker) => void;
  onRecenter?: () => void;
}

export default function MapPlaceholder({
  markers = [],
  selectedMarkerId,
  onMarkerClick,
  onRecenter,
}: MapPlaceholderProps) {
  return (
    <Card className="relative h-96 overflow-hidden bg-muted" data-testid="map-container">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        {markers.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Enable location to see nearby PGs on map</p>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {markers.map((marker, index) => {
              const isSelected = marker.id === selectedMarkerId;
              const isCollege = marker.type === "college";
              const top = 20 + (index * 15) % 60;
              const left = 20 + (index * 20) % 60;
              
              return (
                <button
                  key={marker.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-full transition-transform ${
                    isSelected ? "scale-125 z-10" : "hover:scale-110"
                  }`}
                  style={{ top: `${top}%`, left: `${left}%` }}
                  onClick={() => onMarkerClick?.(marker)}
                  data-testid={`marker-${marker.id}`}
                >
                  {isCollege ? (
                    <div className="flex flex-col items-center">
                      <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-medium mt-1 bg-white dark:bg-gray-800 px-2 py-0.5 rounded shadow">
                        {marker.name}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className={`px-2 py-1 rounded-md shadow-lg font-medium text-sm ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-white dark:bg-gray-800 text-foreground"
                      }`}>
                        ₹{marker.price?.toLocaleString() || "N/A"}
                      </div>
                      <div className={`w-2 h-2 rotate-45 -mt-1 ${
                        isSelected ? "bg-primary" : "bg-white dark:bg-gray-800"
                      }`} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          size="icon"
          variant="secondary"
          className="shadow-md"
          onClick={() => console.log("Zoom in")}
          data-testid="button-zoom-in"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="shadow-md"
          onClick={() => console.log("Zoom out")}
          data-testid="button-zoom-out"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="shadow-md"
          onClick={onRecenter}
          data-testid="button-recenter"
        >
          <Navigation className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-md px-3 py-2 shadow-md">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Your College</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-white dark:bg-gray-800 border shadow-sm" />
            <span>PG Location</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

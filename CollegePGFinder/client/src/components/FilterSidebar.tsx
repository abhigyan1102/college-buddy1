import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, X } from "lucide-react";

export interface Filters {
  priceRange: [number, number];
  distance: string;
  gender: string;
  amenities: string[];
}

interface FilterSidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onReset: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const amenitiesList = [
  { id: "wifi", label: "WiFi" },
  { id: "meals", label: "Meals Included" },
  { id: "laundry", label: "Laundry" },
  { id: "parking", label: "Parking" },
  { id: "ac", label: "AC" },
  { id: "tv", label: "TV" },
  { id: "geyser", label: "Geyser" },
  { id: "security", label: "24/7 Security" },
];

export default function FilterSidebar({
  filters,
  onFiltersChange,
  onReset,
  isMobile = false,
  onClose,
}: FilterSidebarProps) {
  const handlePriceChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const handleDistanceChange = (value: string) => {
    onFiltersChange({ ...filters, distance: value });
  };

  const handleGenderChange = (value: string) => {
    onFiltersChange({ ...filters, gender: value });
  };

  const handleAmenityToggle = (amenityId: string) => {
    const newAmenities = filters.amenities.includes(amenityId)
      ? filters.amenities.filter((a) => a !== amenityId)
      : [...filters.amenities, amenityId];
    onFiltersChange({ ...filters, amenities: newAmenities });
  };

  const content = (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-sm font-medium">Price Range (₹/month)</Label>
        <Slider
          value={[filters.priceRange[0], filters.priceRange[1]]}
          onValueChange={handlePriceChange}
          min={2000}
          max={20000}
          step={500}
          data-testid="slider-price"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{filters.priceRange[0].toLocaleString()}</span>
          <span>₹{filters.priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Distance from College</Label>
        <Select value={filters.distance} onValueChange={handleDistanceChange}>
          <SelectTrigger data-testid="select-distance">
            <SelectValue placeholder="Select distance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="500m">Within 500m</SelectItem>
            <SelectItem value="1km">Within 1 km</SelectItem>
            <SelectItem value="2km">Within 2 km</SelectItem>
            <SelectItem value="5km">Within 5 km</SelectItem>
            <SelectItem value="any">Any distance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Gender Preference</Label>
        <Select value={filters.gender} onValueChange={handleGenderChange}>
          <SelectTrigger data-testid="select-gender">
            <SelectValue placeholder="Select preference" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">All</SelectItem>
            <SelectItem value="male">Boys Only</SelectItem>
            <SelectItem value="female">Girls Only</SelectItem>
            <SelectItem value="unisex">Co-ed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Amenities</Label>
        <div className="grid grid-cols-2 gap-2">
          {amenitiesList.map((amenity) => (
            <div key={amenity.id} className="flex items-center gap-2">
              <Checkbox
                id={amenity.id}
                checked={filters.amenities.includes(amenity.id)}
                onCheckedChange={() => handleAmenityToggle(amenity.id)}
                data-testid={`checkbox-${amenity.id}`}
              />
              <Label htmlFor={amenity.id} className="text-sm cursor-pointer">
                {amenity.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={onReset} data-testid="button-reset-filters">
        Reset Filters
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <h2 className="font-semibold">Filters</h2>
          </div>
          <Button size="icon" variant="ghost" onClick={onClose} data-testid="button-close-filters">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4 overflow-auto h-[calc(100vh-140px)]">{content}</div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
          <Button className="w-full" onClick={onClose} data-testid="button-apply-filters">
            Apply Filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}

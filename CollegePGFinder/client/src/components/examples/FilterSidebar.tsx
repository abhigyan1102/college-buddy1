import { useState } from "react";
import FilterSidebar, { type Filters } from "../FilterSidebar";

export default function FilterSidebarExample() {
  const [filters, setFilters] = useState<Filters>({
    priceRange: [5000, 12000],
    distance: "2km",
    gender: "any",
    amenities: ["wifi", "meals"],
  });

  const handleReset = () => {
    setFilters({
      priceRange: [2000, 20000],
      distance: "any",
      gender: "any",
      amenities: [],
    });
  };

  return (
    <div className="max-w-xs">
      <FilterSidebar
        filters={filters}
        onFiltersChange={setFilters}
        onReset={handleReset}
      />
    </div>
  );
}

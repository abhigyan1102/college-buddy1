import MapPlaceholder from "../MapPlaceholder";

const mockMarkers = [
  { id: "college", name: "VIT University", lat: 12.9716, lng: 79.1589, type: "college" as const },
  { id: "pg1", name: "Sunrise PG", lat: 12.9720, lng: 79.1600, type: "pg" as const, price: 6000 },
  { id: "pg2", name: "Green Valley PG", lat: 12.9710, lng: 79.1580, type: "pg" as const, price: 8000 },
  { id: "pg3", name: "Student Home", lat: 12.9725, lng: 79.1575, type: "pg" as const, price: 7500 },
];

export default function MapPlaceholderExample() {
  return (
    <MapPlaceholder
      markers={mockMarkers}
      selectedMarkerId="pg1"
      onMarkerClick={(marker) => console.log("Marker clicked:", marker.name)}
      onRecenter={() => console.log("Recenter map")}
    />
  );
}

"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Fix for default marker icon
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const collegeLocation: [number, number] = [28.6139, 77.2090]; // Example: New Delhi (Mock College Location)

const pgs = [
    { id: 1, name: "Stanza Living", lat: 28.6129, lng: 77.2110, price: "₹8,000", distance: "500m" },
    { id: 2, name: "Your Space", lat: 28.6150, lng: 77.2050, price: "₹7,500", distance: "600m" },
    { id: 3, name: "Zolo Stays", lat: 28.6100, lng: 77.2080, price: "₹6,500", distance: "800m" },
    { id: 4, name: "Oxford Caps", lat: 28.6180, lng: 77.2120, price: "₹9,000", distance: "1.2km" },
    { id: 5, name: "CoHo", lat: 28.6090, lng: 77.2150, price: "₹10,000", distance: "1.5km" },
];

export default function PGMap() {
    return (
        <div className="h-full w-full rounded-2xl overflow-hidden border border-white/10 shadow-glow">
            <MapContainer center={collegeLocation} zoom={15} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* College Marker */}
                <Circle center={collegeLocation} radius={500} pathOptions={{ color: 'purple', fillColor: 'purple', fillOpacity: 0.2 }} />
                <Marker position={collegeLocation} icon={icon}>
                    <Popup>
                        <div className="text-center">
                            <h3 className="font-bold text-purple-600">College Campus</h3>
                            <p>Central Hub</p>
                        </div>
                    </Popup>
                </Marker>

                {/* PG Markers */}
                {pgs.map((pg) => (
                    <Marker key={pg.id} position={[pg.lat, pg.lng]} icon={icon}>
                        <Popup>
                            <div className="p-1">
                                <h3 className="font-bold text-gray-800">{pg.name}</h3>
                                <p className="text-sm text-gray-600">Price: <span className="font-semibold">{pg.price}</span></p>
                                <p className="text-xs text-purple-600 font-bold">{pg.distance} from campus</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  type: "bar" | "retail" | "restaurant" | "brewery";
  coordinates: [number, number]; // [lng, lat]
}

const locations: Location[] = [
  {
    id: "gallicus",
    name: "Gallicus — Brasserie Artisanale",
    address: "670 rue Auguste-Mondoux #4",
    city: "Gatineau, QC",
    type: "brewery",
    coordinates: [-75.7134, 45.4765],
  },
  {
    id: "l1",
    name: "Bières & Compagnie",
    address: "135 rue Eddy",
    city: "Gatineau, QC",
    type: "bar",
    coordinates: [-75.7008, 45.4271],
  },
  {
    id: "l2",
    name: "La Barberie",
    address: "310 boul. Saint-Joseph",
    city: "Gatineau, QC",
    type: "retail",
    coordinates: [-75.7215, 45.4420],
  },
  {
    id: "l3",
    name: "Dépanneur Chez Gilles",
    address: "45 rue Laramée",
    city: "Gatineau, QC",
    type: "retail",
    coordinates: [-75.7302, 45.4610],
  },
  {
    id: "l4",
    name: "Le Troquet",
    address: "82 rue Principale",
    city: "Gatineau, QC",
    type: "restaurant",
    coordinates: [-75.6889, 45.4380],
  },
];

const typeColors: Record<Location["type"], string> = {
  brewery: "#0ea5a0",
  bar: "#1a1a1a",
  retail: "#1a1a1a",
  restaurant: "#1a1a1a",
};

interface RetailersMapProps {
  legend: string;
  typeLabels: Record<Location["type"], string>;
}

export default function RetailersMap({ legend, typeLabels }: RetailersMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [-75.7134, 45.4600],
      zoom: 11,
      attributionControl: false,
    });

    map.current.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-right"
    );
    map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

    // Resize after load and after a short delay to handle any layout shifts
    map.current.on("load", () => {
      map.current?.resize();
    });
    const resizeTimer = setTimeout(() => map.current?.resize(), 300);

    locations.forEach((loc) => {
      const isBrewery = loc.type === "brewery";

      const el = document.createElement("div");
      el.style.cssText = `
        width: ${isBrewery ? "18px" : "12px"};
        height: ${isBrewery ? "18px" : "12px"};
        border-radius: 50%;
        background-color: ${typeColors[loc.type]};
        border: ${isBrewery ? "2.5px" : "2px"} solid white;
        box-shadow: ${isBrewery
          ? "0 0 0 4px rgba(14,165,160,0.2), 0 2px 6px rgba(0,0,0,0.25)"
          : "0 1px 4px rgba(0,0,0,0.2)"
        };
        cursor: pointer;
        transition: transform 0.15s ease;
      `;

      el.addEventListener("mouseenter", () => { el.style.transform = "scale(1.3)"; });
      el.addEventListener("mouseleave", () => { el.style.transform = "scale(1)"; });

      const popup = new mapboxgl.Popup({
        offset: isBrewery ? 14 : 10,
        closeButton: false,
        maxWidth: "220px",
      }).setHTML(`
        <div style="padding: 4px 2px; font-family: var(--font-archivo), system-ui, sans-serif;">
          <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #1a1a1a; margin-bottom: 3px; line-height: 1.3;">${loc.name}</div>
          <div style="font-size: 10px; color: #888; margin-bottom: 6px;">${loc.address}<br/>${loc.city}</div>
          <span style="
            display: inline-block;
            font-size: 8px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            padding: 2px 7px;
            background: ${isBrewery ? "rgba(14,165,160,0.12)" : "rgba(26,26,26,0.07)"};
            color: ${isBrewery ? "#0ea5a0" : "#555"};
          ">${typeLabels[loc.type]}</span>
        </div>
      `);

      new mapboxgl.Marker({ element: el })
        .setLngLat(loc.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });

    return () => {
      clearTimeout(resizeTimer);
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div className="relative w-full" style={{ height: "460px" }}>
      <div ref={mapContainer} style={{ position: "absolute", inset: 0 }} />

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: "28px",
          left: "12px",
          zIndex: 10,
          background: "rgba(255,255,255,0.96)",
          padding: "10px 14px",
          boxShadow: "0 1px 6px rgba(0,0,0,0.12)",
        }}
      >
        <p style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#999", marginBottom: "8px", fontFamily: "var(--font-archivo), system-ui, sans-serif" }}>
          {legend}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {(Object.entries(typeLabels) as [Location["type"], string][]).map(([type, label]) => (
            <div key={type} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: type === "brewery" ? 10 : 8,
                height: type === "brewery" ? 10 : 8,
                borderRadius: "50%",
                backgroundColor: typeColors[type],
                flexShrink: 0,
                boxShadow: type === "brewery" ? "0 0 0 2px rgba(14,165,160,0.25)" : "none",
              }} />
              <span style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#555", fontFamily: "var(--font-archivo), system-ui, sans-serif" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
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
  brewery: "#56a899",
  bar: "#1a1a1a",
  retail: "#1a1a1a",
  restaurant: "#1a1a1a",
};

interface RetailersMapProps {
  legend: string;
  filterAll: string;
  typeLabels: Record<Location["type"], string>;
}

type FilterType = Location["type"] | "all";

export default function RetailersMap({ legend, filterAll, typeLabels }: RetailersMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ marker: mapboxgl.Marker; loc: Location }[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  // Initialize map once
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-75.7134, 45.4600],
      zoom: 11,
      attributionControl: false,
      pitchWithRotate: false,
      dragRotate: false,
    });

    map.current.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-right"
    );
    map.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "top-right"
    );

    map.current.on("load", () => {
      map.current?.resize();
    });

    const resizeTimer = setTimeout(() => map.current?.resize(), 300);

    locations.forEach((loc) => {
      const isBrewery = loc.type === "brewery";

      const el = document.createElement("div");
      el.style.cssText = `
        width: ${isBrewery ? "20px" : "13px"};
        height: ${isBrewery ? "20px" : "13px"};
        border-radius: 50%;
        background-color: ${typeColors[loc.type]};
        border: ${isBrewery ? "2.5px" : "2px"} solid white;
        box-shadow: ${
          isBrewery
            ? "0 0 0 5px rgba(86,168,153,0.18), 0 2px 8px rgba(0,0,0,0.2)"
            : "0 1px 4px rgba(0,0,0,0.22)"
        };
        cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
        position: relative;
        z-index: ${isBrewery ? 2 : 1};
      `;

      el.addEventListener("mouseenter", () => {
        el.style.transform = "scale(1.35)";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "scale(1)";
      });

      const popup = new mapboxgl.Popup({
        offset: isBrewery ? 16 : 12,
        closeButton: false,
        maxWidth: "230px",
        className: "gallicus-popup",
      }).setHTML(`
        <div style="padding: 6px 4px; font-family: var(--font-archivo), system-ui, sans-serif;">
          <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #111; margin-bottom: 4px; line-height: 1.35;">${loc.name}</div>
          <div style="font-size: 10px; color: #999; margin-bottom: 8px; line-height: 1.5;">${loc.address}<br/>${loc.city}</div>
          <span style="
            display: inline-block;
            font-size: 8px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            padding: 3px 8px;
            background: ${isBrewery ? "rgba(86,168,153,0.12)" : "rgba(26,26,26,0.06)"};
            color: ${isBrewery ? "#56a899" : "#666"};
          ">${typeLabels[loc.type]}</span>
        </div>
      `);

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat(loc.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      // Click flies to marker and opens popup
      el.addEventListener("click", () => {
        map.current?.flyTo({
          center: loc.coordinates,
          zoom: 14,
          duration: 800,
          essential: true,
        });
        marker.togglePopup();
      });

      markersRef.current.push({ marker, loc });
    });

    return () => {
      clearTimeout(resizeTimer);
      map.current?.remove();
      map.current = null;
      markersRef.current = [];
    };
  }, []);

  // Filter markers by type
  useEffect(() => {
    markersRef.current.forEach(({ marker, loc }) => {
      const el = marker.getElement();
      const visible = activeFilter === "all" || loc.type === activeFilter;
      el.style.display = visible ? "block" : "none";
      if (!visible && marker.getPopup()?.isOpen()) {
        marker.togglePopup();
      }
    });

    // If filtering to a specific type, fly to fit those markers
    if (activeFilter !== "all" && map.current) {
      const filtered = markersRef.current.filter(({ loc }) => loc.type === activeFilter);
      if (filtered.length === 1) {
        map.current.flyTo({
          center: filtered[0].loc.coordinates,
          zoom: 14,
          duration: 700,
          essential: true,
        });
      } else if (filtered.length > 1) {
        const bounds = filtered.reduce(
          (b, { loc }) => b.extend(loc.coordinates as [number, number]),
          new mapboxgl.LngLatBounds(filtered[0].loc.coordinates, filtered[0].loc.coordinates)
        );
        map.current.fitBounds(bounds, { padding: 80, duration: 700, maxZoom: 14 });
      }
    } else if (activeFilter === "all" && map.current) {
      map.current.flyTo({
        center: [-75.7134, 45.4600],
        zoom: 11,
        duration: 700,
        essential: true,
      });
    }
  }, [activeFilter]);

  const filterOptions: { key: FilterType; label: string }[] = [
    { key: "all", label: filterAll },
    { key: "brewery", label: typeLabels.brewery },
    { key: "bar", label: typeLabels.bar },
    { key: "retail", label: typeLabels.retail },
    { key: "restaurant", label: typeLabels.restaurant },
  ];

  return (
    <div className="relative w-full" style={{ height: "clamp(360px, 50vw, 520px)" }}>
      <div ref={mapContainer} style={{ position: "absolute", inset: 0 }} />

      {/* Filter pills — overlaid top-left */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          zIndex: 10,
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
        }}
      >
        {filterOptions.map(({ key, label }) => {
          const isActive = activeFilter === key;
          return (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              style={{
                fontFamily: "var(--font-archivo), system-ui, sans-serif",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "5px 11px",
                border: `1.5px solid ${isActive ? (key === "brewery" ? "#56a899" : "#111") : "rgba(0,0,0,0.12)"}`,
                background: isActive ? (key === "brewery" ? "#56a899" : "#111") : "rgba(255,255,255,0.94)",
                color: isActive ? "#fff" : "#555",
                cursor: "pointer",
                transition: "all 0.18s ease",
                backdropFilter: "blur(4px)",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Legend — bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: "28px",
          left: "12px",
          zIndex: 10,
          background: "rgba(255,255,255,0.95)",
          padding: "10px 14px",
          boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
          backdropFilter: "blur(4px)",
        }}
      >
        <p
          style={{
            fontSize: "8px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#aaa",
            marginBottom: "8px",
            fontFamily: "var(--font-archivo), system-ui, sans-serif",
          }}
        >
          {legend}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {(Object.entries(typeLabels) as [Location["type"], string][]).map(([type, label]) => (
            <div key={type} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: type === "brewery" ? 10 : 8,
                  height: type === "brewery" ? 10 : 8,
                  borderRadius: "50%",
                  backgroundColor: typeColors[type],
                  flexShrink: 0,
                  boxShadow: type === "brewery" ? "0 0 0 2.5px rgba(86,168,153,0.22)" : "none",
                }}
              />
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#666",
                  fontFamily: "var(--font-archivo), system-ui, sans-serif",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

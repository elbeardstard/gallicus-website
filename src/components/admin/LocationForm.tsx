"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DbLocation } from "@/types/db";

interface LocationFormProps {
  location?: DbLocation;
}

const TYPE_OPTIONS = [
  { value: "brewery", label: "Brasserie" },
  { value: "bar", label: "Bar" },
  { value: "retail", label: "Détaillant" },
  { value: "restaurant", label: "Restaurant" },
];

export default function LocationForm({ location }: LocationFormProps) {
  const router = useRouter();
  const isEdit = !!location;

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: location?.name ?? "",
    address: location?.address ?? "",
    city: location?.city ?? "Gatineau, QC",
    lat: location?.lat?.toString() ?? "",
    lng: location?.lng?.toString() ?? "",
    type: location?.type ?? "retail",
    sort_order: location?.sort_order?.toString() ?? "0",
  });

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      lat: parseFloat(form.lat),
      lng: parseFloat(form.lng),
      sort_order: parseInt(form.sort_order, 10),
    };

    try {
      const res = await fetch(
        isEdit ? `/api/admin/locations/${location.id}` : "/api/admin/locations",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Erreur");
      }

      router.push("/admin/locations");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2.5 bg-white/5 border border-white/10 text-white text-sm focus:border-[#56a899] focus:outline-none transition-colors";
  const labelClass = "block text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <div className="bg-[#1a1a1a] border border-white/5 p-6 space-y-5">
        <div>
          <label className={labelClass}>Nom</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Adresse</label>
          <input
            type="text"
            required
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            className={inputClass}
            placeholder="ex. 670 rue Auguste-Mondoux #4"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Ville / Province</label>
            <input
              type="text"
              required
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Type</label>
            <select
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
              className={`${inputClass} bg-[#0f0f0f]`}
            >
              {TYPE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Latitude</label>
            <input
              type="number"
              step="0.0000001"
              required
              value={form.lat}
              onChange={(e) => set("lat", e.target.value)}
              className={inputClass}
              placeholder="ex. 45.4765"
            />
          </div>
          <div>
            <label className={labelClass}>Longitude</label>
            <input
              type="number"
              step="0.0000001"
              required
              value={form.lng}
              onChange={(e) => set("lng", e.target.value)}
              className={inputClass}
              placeholder="ex. -75.7134"
            />
          </div>
        </div>

        <p className="text-white/25 text-xs">
          💡 Pour obtenir les coordonnées : clic droit sur Google Maps → &quot;Plus d&apos;infos sur cet endroit&quot;
        </p>

        <div>
          <label className={labelClass}>Ordre d&apos;affichage</label>
          <input
            type="number"
            min="0"
            value={form.sort_order}
            onChange={(e) => set("sort_order", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {error && <p className="text-red-400 text-sm px-1">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-[#56a899] text-white text-xs uppercase tracking-[0.15em] hover:bg-[#4a9488] disabled:opacity-40 transition-colors"
        >
          {saving ? "Sauvegarde..." : isEdit ? "Mettre à jour" : "Créer le point de vente"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/locations")}
          className="px-6 py-3 bg-white/5 text-white/60 text-xs uppercase tracking-[0.15em] hover:bg-white/10 transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

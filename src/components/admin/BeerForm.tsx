"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { DbBeer } from "@/types/db";

interface BeerFormProps {
  beer?: DbBeer; // undefined = create mode
}

function TagInput({
  values,
  onChange,
  placeholder,
}: {
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setInput("");
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {values.map((v) => (
          <span
            key={v}
            className="admin-tag-accent inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] px-2.5 py-1"
          >
            {v}
            <button
              type="button"
              onClick={() => onChange(values.filter((x) => x !== v))}
              className="text-[#56a899]/60 hover:text-[#56a899] ml-1"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          placeholder={placeholder ?? "Ajouter... (Entrée)"}
          className="admin-input flex-1 px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={add}
          className="admin-btn-secondary px-3 py-2 text-sm"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function BeerForm({ beer }: BeerFormProps) {
  const router = useRouter();
  const isEdit = !!beer;

  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [form, setForm] = useState({
    name: beer?.name ?? "",
    style_fr: beer?.style_fr ?? "",
    style_en: beer?.style_en ?? "",
    abv: beer?.abv?.toString() ?? "",
    description_fr: beer?.description_fr ?? "",
    description_en: beer?.description_en ?? "",
    tasting_notes_fr: beer?.tasting_notes_fr ?? [],
    tasting_notes_en: beer?.tasting_notes_en ?? [],
    image_url: beer?.image_url ?? "",
    is_core: beer?.is_core ?? false,
    is_featured: beer?.is_featured ?? false,
    untappd_url: beer?.untappd_url ?? "",
    sort_order: beer?.sort_order?.toString() ?? "0",
  });

  const set = (key: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!beer?.id) return; // only works in edit mode
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch(`/api/admin/beers/${beer.id}/image`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (data.url) set("image_url", data.url);
    } catch {
      setError("Échec du téléversement de l'image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      abv: parseFloat(form.abv),
      sort_order: parseInt(form.sort_order, 10),
    };

    try {
      const res = await fetch(
        isEdit ? `/api/admin/beers/${beer.id}` : "/api/admin/beers",
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

      router.push("/admin/beers");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "admin-input w-full px-3 py-2.5 text-sm";
  const labelClass = "admin-label block text-[10px] uppercase tracking-[0.15em] mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {/* Universal fields */}
      <div className="admin-card p-6 space-y-5">
        <h2 className="admin-section-heading text-xs uppercase tracking-[0.2em] mb-4">Informations générales</h2>

        <div className="grid grid-cols-2 gap-4">
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
            <label className={labelClass}>ABV (%)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="25"
              required
              value={form.abv}
              onChange={(e) => set("abv", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Untappd URL</label>
            <input
              type="url"
              value={form.untappd_url}
              onChange={(e) => set("untappd_url", e.target.value)}
              className={inputClass}
              placeholder="https://untappd.com/b/..."
            />
          </div>
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

        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_core}
              onChange={(e) => set("is_core", e.target.checked)}
              className="accent-[#56a899]"
            />
            <span className="admin-text-muted text-sm">Classique</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={(e) => set("is_featured", e.target.checked)}
              className="accent-[#56a899]"
            />
            <span className="admin-text-muted text-sm">Vedette</span>
          </label>
        </div>
      </div>

      {/* Image */}
      <div className="admin-card p-6">
        <h2 className="admin-section-heading text-xs uppercase tracking-[0.2em] mb-4">Image</h2>
        {form.image_url && (
          <div className="mb-4">
            <Image
              src={form.image_url}
              alt="Aperçu"
              width={100}
              height={100}
              className="w-24 h-24 object-cover admin-img-border"
            />
          </div>
        )}
        {isEdit ? (
          <div>
            <label className={labelClass}>Téléverser une nouvelle image (JPG, PNG, WebP — max 4 Mo)</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              disabled={uploadingImage}
              className="admin-file-input text-sm cursor-pointer"
            />
            {uploadingImage && <p className="text-[#56a899] text-xs mt-2">Téléversement...</p>}
          </div>
        ) : (
          <div>
            <label className={labelClass}>URL de l&apos;image (optionnel — modifiable après création)</label>
            <input
              type="url"
              value={form.image_url}
              onChange={(e) => set("image_url", e.target.value)}
              className={inputClass}
              placeholder="https://..."
            />
          </div>
        )}
      </div>

      {/* Bilingual fields */}
      <div className="admin-card p-6">
        {/* Language tabs */}
        <div className="flex gap-0 mb-6 admin-divider border-b">
          {(["fr", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.15em] border-b-2 -mb-px transition-colors ${
                lang === l ? "admin-tab-active" : "admin-tab-inactive"
              }`}
            >
              {l === "fr" ? "Français" : "English"}
            </button>
          ))}
        </div>

        <div className="space-y-5">
          <div>
            <label className={labelClass}>Style</label>
            <input
              type="text"
              value={lang === "fr" ? form.style_fr : form.style_en}
              onChange={(e) =>
                set(lang === "fr" ? "style_fr" : "style_en", e.target.value)
              }
              className={inputClass}
              placeholder={lang === "fr" ? "ex. IPA Nord-Américaine" : "ex. North American IPA"}
            />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              rows={4}
              value={lang === "fr" ? form.description_fr : form.description_en}
              onChange={(e) =>
                set(lang === "fr" ? "description_fr" : "description_en", e.target.value)
              }
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label className={labelClass}>Notes de dégustation</label>
            <TagInput
              values={lang === "fr" ? form.tasting_notes_fr : form.tasting_notes_en}
              onChange={(v) =>
                set(lang === "fr" ? "tasting_notes_fr" : "tasting_notes_en", v)
              }
              placeholder={lang === "fr" ? "ex. Tropical (Entrée)" : "ex. Tropical (Enter)"}
            />
          </div>
        </div>
      </div>

      {error && (
        <p className="text-red-400 text-sm px-1">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="admin-btn-primary px-6 py-3 text-xs uppercase tracking-[0.15em]"
        >
          {saving ? "Sauvegarde..." : isEdit ? "Mettre à jour" : "Créer la bière"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/beers")}
          className="admin-btn-secondary px-6 py-3 text-xs uppercase tracking-[0.15em]"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

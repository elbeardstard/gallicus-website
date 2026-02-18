"use client";

import { useState } from "react";

interface ContentEditorProps {
  initialContent: Record<string, string>;
}

type Tab = "about" | "contact";

async function saveKeys(updates: Record<string, string>) {
  const entries = Object.entries(updates).map(([key, value]) => ({ key, value }));
  const res = await fetch("/api/admin/content", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entries),
  });
  return res.ok;
}

export default function ContentEditor({ initialContent }: ContentEditorProps) {
  const [tab, setTab] = useState<Tab>("about");
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (key: string, value: string) =>
    setContent((prev) => ({ ...prev, [key]: value }));

  const handleSave = async (keys: string[]) => {
    setSaving(true);
    setSaved(false);
    const updates: Record<string, string> = {};
    for (const k of keys) updates[k] = content[k] ?? "";
    const ok = await saveKeys(updates);
    setSaving(false);
    if (ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  const inputClass = "admin-input w-full px-3 py-2.5 text-sm";
  const labelClass = "admin-label block text-[10px] uppercase tracking-[0.15em] mb-1.5";

  return (
    <div className="max-w-2xl">
      {/* Tab bar */}
      <div className="flex gap-0 admin-divider border-b mb-6">
        {(["about", "contact"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 text-xs uppercase tracking-[0.15em] border-b-2 -mb-px transition-colors ${
              tab === t ? "admin-tab-active" : "admin-tab-inactive"
            }`}
          >
            {t === "about" ? "À propos" : "Contact & Heures"}
          </button>
        ))}
      </div>

      {tab === "about" && (
        <div className="space-y-6">
          {/* Language tabs */}
          <div className="flex gap-1 mb-2">
            {(["fr", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-4 py-1.5 text-[10px] uppercase tracking-[0.15em] transition-colors ${
                  lang === l ? "admin-btn-ghost" : "admin-text-faint hover:text-current"
                }`}
              >
                {l === "fr" ? "Français" : "English"}
              </button>
            ))}
          </div>

          <div className="admin-card p-6 space-y-5">
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                rows={5}
                value={content[`about.description.${lang}`] ?? ""}
                onChange={(e) => set(`about.description.${lang}`, e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>
            <div>
              <label className={labelClass}>Philosophie</label>
              <textarea
                rows={5}
                value={content[`about.philosophy.${lang}`] ?? ""}
                onChange={(e) => set(`about.philosophy.${lang}`, e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          <SaveBar
            saving={saving}
            saved={saved}
            onSave={() =>
              handleSave([
                "about.description.fr",
                "about.description.en",
                "about.philosophy.fr",
                "about.philosophy.en",
              ])
            }
          />
        </div>
      )}

      {tab === "contact" && (
        <div className="space-y-6">
          <div className="admin-card p-6 space-y-5">
            <h3 className="admin-section-heading text-xs uppercase tracking-[0.15em]">Adresse</h3>
            <div>
              <label className={labelClass}>Ligne 1 (rue)</label>
              <input
                type="text"
                value={content["contact.address.line1"] ?? ""}
                onChange={(e) => set("contact.address.line1", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Ligne 2 (ville / province)</label>
              <input
                type="text"
                value={content["contact.address.line2"] ?? ""}
                onChange={(e) => set("contact.address.line2", e.target.value)}
                className={inputClass}
              />
            </div>

            <h3 className="admin-section-heading text-xs uppercase tracking-[0.15em] pt-2">Contact</h3>
            <div>
              <label className={labelClass}>Courriel</label>
              <input
                type="email"
                value={content["contact.email"] ?? ""}
                onChange={(e) => set("contact.email", e.target.value)}
                className={inputClass}
              />
            </div>

            <h3 className="admin-section-heading text-xs uppercase tracking-[0.15em] pt-2">Heures d&apos;ouverture</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Français</label>
                <input
                  type="text"
                  value={content["findUs.hours.fr"] ?? ""}
                  onChange={(e) => set("findUs.hours.fr", e.target.value)}
                  className={inputClass}
                  placeholder="ex. Jeudi - Dimanche"
                />
              </div>
              <div>
                <label className={labelClass}>English</label>
                <input
                  type="text"
                  value={content["findUs.hours.en"] ?? ""}
                  onChange={(e) => set("findUs.hours.en", e.target.value)}
                  className={inputClass}
                  placeholder="ex. Thursday - Sunday"
                />
              </div>
            </div>

            <h3 className="admin-section-heading text-xs uppercase tracking-[0.15em] pt-2">Réseaux sociaux</h3>
            <div>
              <label className={labelClass}>Instagram URL</label>
              <input
                type="url"
                value={content["social.instagram"] ?? ""}
                onChange={(e) => set("social.instagram", e.target.value)}
                className={inputClass}
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className={labelClass}>Untappd URL</label>
              <input
                type="url"
                value={content["social.untappd"] ?? ""}
                onChange={(e) => set("social.untappd", e.target.value)}
                className={inputClass}
                placeholder="https://untappd.com/..."
              />
            </div>
          </div>

          <SaveBar
            saving={saving}
            saved={saved}
            onSave={() =>
              handleSave([
                "contact.address.line1",
                "contact.address.line2",
                "contact.email",
                "findUs.hours.fr",
                "findUs.hours.en",
                "social.instagram",
                "social.untappd",
              ])
            }
          />
        </div>
      )}
    </div>
  );
}

function SaveBar({
  saving,
  saved,
  onSave,
}: {
  saving: boolean;
  saved: boolean;
  onSave: () => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onSave}
        disabled={saving}
        className="admin-btn-primary px-6 py-3 text-xs uppercase tracking-[0.15em]"
      >
        {saving ? "Sauvegarde..." : "Sauvegarder"}
      </button>
      {saved && (
        <span className="text-[#56a899] text-sm">✓ Sauvegardé</span>
      )}
    </div>
  );
}

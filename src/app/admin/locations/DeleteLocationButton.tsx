"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteLocationButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  const handleDelete = async () => {
    await fetch(`/api/admin/locations/${id}`, { method: "DELETE" });
    router.refresh();
  };

  if (confirming) {
    return (
      <div className="flex gap-1">
        <button
          onClick={handleDelete}
          className="px-3 py-1.5 text-xs text-white bg-red-600 hover:bg-red-700 transition-colors"
        >
          Confirmer
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-3 py-1.5 text-xs text-white/60 bg-white/5 hover:bg-white/10 transition-colors"
        >
          Annuler
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      title={`Supprimer ${name}`}
      className="px-3 py-1.5 text-xs text-red-400/60 hover:text-red-400 bg-white/5 hover:bg-red-500/10 transition-colors"
    >
      ✕
    </button>
  );
}

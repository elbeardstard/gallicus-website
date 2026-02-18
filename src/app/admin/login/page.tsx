"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Mot de passe incorrect");
        setPassword("");
      }
    } catch {
      setError("Erreur de connexion. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center admin-main">
      <div className="w-full max-w-sm px-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <Image
            src="/images/logo/gallicus-solog.png"
            alt="Gallicus"
            width={56}
            height={56}
            className="admin-logo w-14 h-14 mb-4"
          />
          <p className="admin-text-muted text-[10px] uppercase tracking-[0.3em]">
            Administration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="admin-label block text-[10px] uppercase tracking-[0.2em] mb-2"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="admin-input w-full px-4 py-3"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center py-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="admin-btn-primary w-full py-3.5 text-[11px] uppercase tracking-[0.2em] mt-2"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="admin-text-faint text-center text-xs mt-8">
          Gallicus &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

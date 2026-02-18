"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Tableau de bord", icon: "⬜" },
  { href: "/admin/beers", label: "Bières", icon: "🍺" },
  { href: "/admin/locations", label: "Points de vente", icon: "📍" },
  { href: "/admin/content", label: "Contenu", icon: "✏️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-56 shrink-0 bg-[#0a0a0a] border-r border-white/5 flex flex-col min-h-screen">
      {/* Brand */}
      <div className="px-5 py-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo/gallicus-solog.png"
            alt="Gallicus"
            width={32}
            height={32}
            className="w-8 h-8 invert opacity-70"
          />
          <div>
            <p className="text-white text-sm tracking-wider font-bold">GALLICUS</p>
            <p className="text-white/30 text-[9px] uppercase tracking-[0.2em]">Admin</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {NAV.map(({ href, label, icon }) => {
          const isActive =
            href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-[#56a899]/15 text-[#56a899]"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-base">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className="px-3 py-4 border-t border-white/5 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/40 hover:text-white hover:bg-white/5 transition-colors"
        >
          <span>↗</span>
          Voir le site
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/40 hover:text-red-400 hover:bg-white/5 transition-colors text-left"
        >
          <span>↩</span>
          Déconnexion
        </button>
      </div>
    </aside>
  );
}

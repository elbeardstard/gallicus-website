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
    <aside className="admin-sidebar w-56 shrink-0 flex flex-col min-h-screen">
      {/* Brand */}
      <div className="admin-sidebar-header px-5 py-6">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo/gallicus-solog.png"
            alt="Gallicus"
            width={32}
            height={32}
            className="admin-logo w-8 h-8"
          />
          <div>
            <p className="text-sm tracking-wider font-bold">GALLICUS</p>
            <p className="admin-text-faint text-[9px] uppercase tracking-[0.2em]">Admin</p>
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
                isActive ? "admin-nav-item-active" : "admin-nav-item"
              }`}
            >
              <span className="text-base">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className="admin-sidebar-footer px-3 py-4 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-nav-item flex items-center gap-3 px-3 py-2.5 text-sm"
        >
          <span>↗</span>
          Voir le site
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm admin-nav-item hover:!text-red-400 transition-colors text-left"
        >
          <span>↩</span>
          Déconnexion
        </button>
      </div>
    </aside>
  );
}

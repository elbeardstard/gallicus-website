import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAllBeersRaw } from "@/lib/data/beers";
import { getAllLocationsRaw } from "@/lib/data/locations";
import Link from "next/link";

export default async function AdminDashboard() {
  const [beers, locations] = await Promise.all([
    getAllBeersRaw(),
    getAllLocationsRaw(),
  ]);

  const featured = beers.filter((b) => b.is_featured).length;
  const core = beers.filter((b) => b.is_core).length;

  const stats = [
    { label: "Bières totales", value: beers.length, href: "/admin/beers" },
    { label: "Vedettes", value: featured, href: "/admin/beers" },
    { label: "Classiques", value: core, href: "/admin/beers" },
    { label: "Points de vente", value: locations.length, href: "/admin/locations" },
  ];

  const quickActions = [
    { href: "/admin/beers/new", label: "Ajouter une bière", desc: "Nouvelle entrée au catalogue" },
    { href: "/admin/locations/new", label: "Ajouter un point de vente", desc: "Nouveau marqueur sur la carte" },
    { href: "/admin/content", label: "Modifier le contenu", desc: "Textes, heures, coordonnées" },
  ];

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-[#111]">
        <h1 className="text-2xl font-bold mb-1">Tableau de bord</h1>
        <p className="text-white/40 text-sm mb-8">Bienvenue dans l&apos;administration de Gallicus.</p>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map(({ label, value, href }) => (
            <Link
              key={label}
              href={href}
              className="bg-[#1a1a1a] border border-white/5 p-5 hover:border-[#56a899]/30 transition-colors"
            >
              <p className="text-3xl font-bold text-[#56a899]">{value}</p>
              <p className="text-white/40 text-xs uppercase tracking-[0.12em] mt-1">{label}</p>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <h2 className="text-sm uppercase tracking-[0.15em] text-white/30 mb-4">Actions rapides</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map(({ href, label, desc }) => (
            <Link
              key={href}
              href={href}
              className="bg-[#1a1a1a] border border-white/5 p-6 hover:border-[#56a899]/30 hover:bg-[#1e1e1e] transition-all group"
            >
              <p className="font-bold mb-1 group-hover:text-[#56a899] transition-colors">
                {label}
              </p>
              <p className="text-white/40 text-sm">{desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

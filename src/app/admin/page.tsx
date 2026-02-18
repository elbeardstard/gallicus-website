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
      <main className="admin-main flex-1 p-8">
        <h1 className="text-2xl font-bold mb-1">Tableau de bord</h1>
        <p className="admin-text-muted text-sm mb-8">Bienvenue dans l&apos;administration de Gallicus.</p>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map(({ label, value, href }) => (
            <Link
              key={label}
              href={href}
              className="admin-card admin-card-accent p-5 transition-colors"
            >
              <p className="admin-stat-value text-3xl font-bold">{value}</p>
              <p className="admin-text-muted text-xs uppercase tracking-[0.12em] mt-1">{label}</p>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <h2 className="admin-section-heading text-sm uppercase tracking-[0.15em] mb-4">Actions rapides</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map(({ href, label, desc }) => (
            <Link
              key={href}
              href={href}
              className="admin-card admin-card-accent p-6 transition-all group"
            >
              <p className="font-bold mb-1 group-hover:text-[#56a899] transition-colors">
                {label}
              </p>
              <p className="admin-text-muted text-sm">{desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAllLocationsRaw } from "@/lib/data/locations";
import Link from "next/link";
import DeleteLocationButton from "./DeleteLocationButton";

const TYPE_LABELS: Record<string, string> = {
  brewery: "Brasserie",
  bar: "Bar",
  retail: "Détaillant",
  restaurant: "Restaurant",
};

export default async function AdminLocationsPage() {
  const locations = await getAllLocationsRaw();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="admin-main flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Points de vente</h1>
            <p className="admin-text-muted text-sm">{locations.length} emplacement{locations.length !== 1 ? "s" : ""} sur la carte</p>
          </div>
          <Link
            href="/admin/locations/new"
            className="admin-btn-primary px-5 py-2.5 text-xs uppercase tracking-[0.15em]"
          >
            + Ajouter
          </Link>
        </div>

        <div className="space-y-2">
          {locations.length === 0 ? (
            <div className="admin-empty p-10 text-center text-sm">
              Aucun emplacement. <Link href="/admin/locations/new" className="text-[#56a899] underline">Ajouter le premier</Link>
            </div>
          ) : (
            locations.map((loc) => (
              <div
                key={loc.id}
                className="admin-card flex items-center gap-4 px-4 py-3 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm">{loc.name}</p>
                  <p className="admin-text-muted text-xs truncate">
                    {loc.address}, {loc.city} · {Number(loc.lat).toFixed(4)}, {Number(loc.lng).toFixed(4)}
                  </p>
                </div>

                <span className="admin-tag-neutral shrink-0 text-[9px] uppercase tracking-[0.1em] px-2 py-0.5">
                  {TYPE_LABELS[loc.type] ?? loc.type}
                </span>

                <div className="flex gap-2 shrink-0">
                  <Link
                    href={`/admin/locations/${loc.id}`}
                    className="admin-btn-ghost px-3 py-1.5 text-xs transition-colors"
                  >
                    Modifier
                  </Link>
                  <DeleteLocationButton id={loc.id} name={loc.name} />
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

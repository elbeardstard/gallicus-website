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
      <main className="flex-1 p-8 bg-[#111]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Points de vente</h1>
            <p className="text-white/40 text-sm">{locations.length} emplacement{locations.length !== 1 ? "s" : ""} sur la carte</p>
          </div>
          <Link
            href="/admin/locations/new"
            className="px-5 py-2.5 bg-[#56a899] text-white text-xs uppercase tracking-[0.15em] hover:bg-[#4a9488] transition-colors"
          >
            + Ajouter
          </Link>
        </div>

        <div className="space-y-2">
          {locations.length === 0 ? (
            <div className="bg-[#1a1a1a] border border-white/5 p-10 text-center text-white/30 text-sm">
              Aucun emplacement. <Link href="/admin/locations/new" className="text-[#56a899] underline">Ajouter le premier</Link>
            </div>
          ) : (
            locations.map((loc) => (
              <div
                key={loc.id}
                className="flex items-center gap-4 bg-[#1a1a1a] border border-white/5 px-4 py-3 hover:border-white/10 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm">{loc.name}</p>
                  <p className="text-white/40 text-xs truncate">
                    {loc.address}, {loc.city} · {Number(loc.lat).toFixed(4)}, {Number(loc.lng).toFixed(4)}
                  </p>
                </div>

                <span className="shrink-0 text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 bg-white/5 text-white/50 border border-white/10">
                  {TYPE_LABELS[loc.type] ?? loc.type}
                </span>

                <div className="flex gap-2 shrink-0">
                  <Link
                    href={`/admin/locations/${loc.id}`}
                    className="px-3 py-1.5 text-xs text-white/60 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
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

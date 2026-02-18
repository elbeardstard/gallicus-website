import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAllBeersRaw } from "@/lib/data/beers";
import Link from "next/link";
import Image from "next/image";
import DeleteBeerButton from "./DeleteBeerButton";

export default async function AdminBeersPage() {
  const beers = await getAllBeersRaw();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="admin-main flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Bières</h1>
            <p className="admin-text-muted text-sm">{beers.length} bière{beers.length !== 1 ? "s" : ""} dans le catalogue</p>
          </div>
          <Link
            href="/admin/beers/new"
            className="admin-btn-primary px-5 py-2.5 text-xs uppercase tracking-[0.15em]"
          >
            + Ajouter
          </Link>
        </div>

        <div className="space-y-2">
          {beers.length === 0 ? (
            <div className="admin-empty p-10 text-center text-sm">
              Aucune bière. <Link href="/admin/beers/new" className="text-[#56a899] underline">Ajouter la première</Link>
            </div>
          ) : (
            beers.map((beer) => (
              <div
                key={beer.id}
                className="admin-card flex items-center gap-4 px-4 py-3 transition-colors"
              >
                {/* Image */}
                <div className="w-12 h-12 admin-bg-subtle flex items-center justify-center shrink-0 overflow-hidden">
                  {beer.image_url ? (
                    <Image
                      src={beer.image_url}
                      alt={beer.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-cover"
                    />
                  ) : (
                    <span className="admin-text-faint text-lg">{beer.name[0]}</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm">{beer.name}</p>
                  <p className="admin-text-muted text-xs truncate">{beer.style_fr} · {beer.abv}%</p>
                </div>

                {/* Badges */}
                <div className="flex gap-2 shrink-0">
                  {beer.is_featured && (
                    <span className="admin-tag-accent text-[9px] uppercase tracking-[0.1em] px-2 py-0.5">
                      Vedette
                    </span>
                  )}
                  {beer.is_core && (
                    <span className="admin-tag-neutral text-[9px] uppercase tracking-[0.1em] px-2 py-0.5">
                      Classique
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 shrink-0">
                  <Link
                    href={`/admin/beers/${beer.id}`}
                    className="admin-btn-ghost px-3 py-1.5 text-xs transition-colors"
                  >
                    Modifier
                  </Link>
                  <DeleteBeerButton id={beer.id} name={beer.name} />
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

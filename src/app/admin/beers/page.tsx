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
      <main className="flex-1 p-8 bg-[#111]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Bières</h1>
            <p className="text-white/40 text-sm">{beers.length} bière{beers.length !== 1 ? "s" : ""} dans le catalogue</p>
          </div>
          <Link
            href="/admin/beers/new"
            className="px-5 py-2.5 bg-[#56a899] text-white text-xs uppercase tracking-[0.15em] hover:bg-[#4a9488] transition-colors"
          >
            + Ajouter
          </Link>
        </div>

        <div className="space-y-2">
          {beers.length === 0 ? (
            <div className="bg-[#1a1a1a] border border-white/5 p-10 text-center text-white/30 text-sm">
              Aucune bière. <Link href="/admin/beers/new" className="text-[#56a899] underline">Ajouter la première</Link>
            </div>
          ) : (
            beers.map((beer) => (
              <div
                key={beer.id}
                className="flex items-center gap-4 bg-[#1a1a1a] border border-white/5 px-4 py-3 hover:border-white/10 transition-colors"
              >
                {/* Image */}
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center shrink-0">
                  {beer.image_url ? (
                    <Image
                      src={beer.image_url}
                      alt={beer.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-cover"
                    />
                  ) : (
                    <span className="text-white/20 text-lg">{beer.name[0]}</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm">{beer.name}</p>
                  <p className="text-white/40 text-xs truncate">{beer.style_fr} · {beer.abv}%</p>
                </div>

                {/* Badges */}
                <div className="flex gap-2 shrink-0">
                  {beer.is_featured && (
                    <span className="text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 bg-[#56a899]/15 text-[#56a899] border border-[#56a899]/20">
                      Vedette
                    </span>
                  )}
                  {beer.is_core && (
                    <span className="text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 bg-white/5 text-white/50 border border-white/10">
                      Classique
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 shrink-0">
                  <Link
                    href={`/admin/beers/${beer.id}`}
                    className="px-3 py-1.5 text-xs text-white/60 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
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

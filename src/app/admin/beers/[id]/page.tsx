import AdminSidebar from "@/components/admin/AdminSidebar";
import BeerForm from "@/components/admin/BeerForm";
import { getBeerByIdRaw } from "@/lib/data/beers";
import { notFound } from "next/navigation";

export default async function EditBeerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const beer = await getBeerByIdRaw(id);
  if (!beer) notFound();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-[#111]">
        <h1 className="text-2xl font-bold mb-1">Modifier {beer.name}</h1>
        <p className="text-white/40 text-sm mb-8">Mettre à jour les informations de cette bière.</p>
        <BeerForm beer={beer} />
      </main>
    </div>
  );
}

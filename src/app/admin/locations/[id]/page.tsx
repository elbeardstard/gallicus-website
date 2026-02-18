import AdminSidebar from "@/components/admin/AdminSidebar";
import LocationForm from "@/components/admin/LocationForm";
import { getLocationByIdRaw } from "@/lib/data/locations";
import { notFound } from "next/navigation";

export default async function EditLocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const location = await getLocationByIdRaw(id);
  if (!location) notFound();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-[#111]">
        <h1 className="text-2xl font-bold mb-1">Modifier {location.name}</h1>
        <p className="text-white/40 text-sm mb-8">Mettre à jour les informations de cet emplacement.</p>
        <LocationForm location={location} />
      </main>
    </div>
  );
}
